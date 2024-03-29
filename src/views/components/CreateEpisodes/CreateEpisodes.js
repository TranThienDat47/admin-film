import classNames from 'classnames/bind';
import styles from './CreateEpisodes.module.scss';

import { apiUrl } from '~/config/constants';

import { HiOutlineXMark } from 'react-icons/hi2';
import { BiSolidArrowFromBottom } from 'react-icons/bi';

import Button from '~/components/Button';
import RipleAnimation from '~/components/RipleAnimation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import DetailTab from './DetailTab';
import VideoComponentTab from './VideoComponentTab';
import DisplayModeTab from './DisplayModeTab';
import ProductServices from '~/services/ProductServices';
import LoadingFetch from '~/components/LoadingFetch';
import { GlobalContext } from '~/contexts/global';

const cx = classNames.bind(styles);

const normalTab_SVG = (
   <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="8" fill="#ccc" />
      <circle cx="15" cy="15" r="4" fill="white" />
   </svg>
);

const prevValidTab_SVG = (
   <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="8" fill="#065fd4" />
      <circle cx="15" cy="15" r="4" fill="white" />
   </svg>
);

const currentTab_SVG = (
   <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="10" fill="#065fd4" />
      <circle cx="15" cy="15" r="6" fill="white" />
   </svg>
);

function CreateEpisodes({ firstStep = 0, hidden = false, handleClose = () => {} }) {
   const [currentProcessingState, setCurrentProcessingState] = useState('');

   const {
      globalState: { queueTaskAddVideoState },
      setQueueTaskAddVideo,
   } = useContext(GlobalContext);

   const [stepState, setStepState] = useState(firstStep); //-1: choose movie; 0: choose file; 1: checkout file; ...
   const detailTabChildRef = useRef(null);
   const videoComponentTabChildRef = useRef(null);
   const displayModeTabChildRef = useRef(null);

   const chooseFileRef = useRef(null);
   const percentRef = useRef(null);

   const initListTab = [
      {
         id: 0,
         title: 'Chi tiết',
         checked: true,
         prev_valid: true,
         contentTab: <DetailTab ref={detailTabChildRef} />,
      },
      {
         id: 1,
         title: 'Các thành phần của video',
         checked: false,
         prev_valid: false,
         contentTab: <VideoComponentTab ref={videoComponentTabChildRef} />,
      },
      {
         id: 2,
         title: 'Chế độ hiển thị',
         checked: false,
         prev_valid: false,
         contentTab: <DisplayModeTab ref={displayModeTabChildRef} />,
      },
   ];

   const [listTabState, setListTabState] = useState(initListTab);
   const [ableCreateState, setAbleCreateStateState] = useState(false);
   const [hiddenState, setHiddenState] = useState(hidden);
   const [loadingState, setLoadingState] = useState(false);

   const processingPercentRef = useRef();

   useEffect(() => {
      setHiddenState(hidden);
   }, [hidden]);

   useEffect(() => {
      if (chooseFileRef.current) {
         chooseFileRef.current.onchange = (e) => {
            handleFileChange(e.target.files);
         };
      }
   }, []);

   const handleFileChange = async (files) => {
      if (files.length > 0) {
         const selectedFile = files[0];

         const formData = new FormData();
         formData.append('video', selectedFile);

         setLoadingState(true);

         setTimeout(() => {
            setLoadingState(false);
            setStepState(1);
         }, 1693);

         function Decodeuint8arr(uint8array) {
            return new TextDecoder('utf-8').decode(uint8array);
         }
         try {
            const response = await fetch(`${apiUrl}/video/convert`, {
               method: 'POST',
               body: formData,
            }).then(async (response) => {
               const reader = response.body.getReader();
               while (true) {
                  const { value, done } = await reader.read();
                  if (done) break;
                  const processingTemp = JSON.parse(Decodeuint8arr(value));

                  if (!processingTemp.hasOwnProperty('success')) {
                     processingPercentRef.current = {
                        processingPercent: {
                           ...processingTemp,
                           percent: Math.floor(processingTemp.percent * 100),
                        },
                     };

                     setCurrentProcessingState(
                        'Đang xử lý - ' +
                           `${processingPercentRef.current.processingPercent.percent >= 100 ? 100 : processingPercentRef.current.processingPercent.percent}` +
                           '% (' +
                           `${processingPercentRef.current.processingPercent.curStep}` +
                           '/' +
                           `${processingPercentRef.current.processingPercent.maxStep})`,
                     );
                  } else {
                     if (processingTemp.success) {
                        setCurrentProcessingState('Đã hoàn thành (3/3)');
                     }
                  }
               }
            });
         } catch (error) {
            console.log('loi');
         }
      }
   };

   const handleSubmit = async () => {};

   return (
      <>
         <input ref={chooseFileRef} style={{ visibility: 'hidden' }} type="file" accept="video/mp4, video/mpeg, video/quicktime" />

         {hiddenState || (
            <div className={cx('wrapper')}>
               <div className={cx('inner')}>
                  <div className={cx('header')}>
                     <div className={cx('header-top')}>
                        <div className={cx('header-top-left')}>
                           {stepState === -1 ? <>Thêm tập phim</> : stepState === 0 ? <>Tải video lên</> : <>Kim Bình bông</>}
                        </div>
                        <div className={cx('header-top-right')}>
                           <div className={cx('')}></div>
                           <div className={cx('header-top-right-icon')} onClick={handleClose}>
                              <HiOutlineXMark></HiOutlineXMark>
                           </div>
                        </div>
                     </div>
                     <div className={cx('header-bottom')}>
                        {stepState === -1 ? (
                           <></>
                        ) : stepState === 0 ? (
                           <></>
                        ) : (
                           <>
                              <div className={cx('header-bottom-tab-list')}>
                                 {listTabState.map((element, index) => (
                                    <div key={index} className={cx('header-bottom-tab-item')}>
                                       <div className={cx('header-bottom-tab-item-main')}>
                                          <button className={cx('tab-item-main-btn')}>
                                             <div className={cx('tab-item-main-btn-title')}>{element.title}</div>
                                             <div className={cx('tab-item-main-btn-icon')}>{element.checked ? currentTab_SVG : normalTab_SVG}</div>
                                          </button>
                                       </div>
                                       <div
                                          className={cx(
                                             'header-bottom-tab-item-sperator',
                                             index === 0 ? 'tab-item-sperator__first' : index === listTabState.length - 1 ? 'tab-item-sperator__last' : '',
                                          )}
                                       ></div>
                                    </div>
                                 ))}
                              </div>
                           </>
                        )}
                        <LoadingFetch isLoading={loadingState} />
                     </div>
                  </div>

                  <div className={cx('content')}>
                     {stepState === -1 ? (
                        <></>
                     ) : stepState === 0 ? (
                        <>
                           <div className={cx('wrapper-image')}>
                              <input
                                 className={cx('choose-file')}
                                 onClick={() => {
                                    chooseFileRef.current.click();
                                 }}
                              />
                              <div className={cx('upload-image')}>
                                 <div
                                    className={cx('upload-drag-icon')}
                                    onClick={() => {
                                       chooseFileRef.current.click();
                                    }}
                                 >
                                    <BiSolidArrowFromBottom></BiSolidArrowFromBottom>
                                 </div>
                                 <div className={cx('upload-drag-content')}>
                                    <h4>Kéo và thả tệp video để tải lên</h4>
                                    <div>Các video sẽ ở chế độ riêng tư cho đến khi hoàn tất quá trình phát hành</div>
                                 </div>
                                 <div className={cx('wrapper-upload-drag-btn')}>
                                    <Button
                                       ripleAnimation
                                       ripleAnimationLight
                                       primary
                                       className={cx('upload-drag-btn')}
                                       onClick={() => {
                                          chooseFileRef.current.click();
                                       }}
                                    >
                                       Chọn tệp
                                    </Button>
                                 </div>
                              </div>
                           </div>

                           <div className={cx('copyright')}>
                              <div className={cx('copyright-top')}>Bản quyền thuộc về</div>
                              <div className={cx('copyright-bottom')}>MANLED</div>
                           </div>
                        </>
                     ) : (
                        <>{listTabState.find((element, index) => element.checked).contentTab}</>
                     )}
                  </div>

                  {stepState === -1 ? (
                     <></>
                  ) : stepState === 0 ? (
                     <></>
                  ) : (
                     <>
                        <div className={cx('footer')}>
                           <div className={cx('footer-left')}>
                              <div className={cx('processing-task')}>{currentProcessingState}</div>
                           </div>
                           <div className={cx('footer-right')}>
                              <div
                                 style={{
                                    borderRadius: '13px',
                                    overflow: 'hidden',
                                 }}
                              >
                                 <RipleAnimation onClick={handleClose}>
                                    <Button>
                                       <span
                                          style={{
                                             color: 'var(--link-color)',
                                          }}
                                       >
                                          Hủy
                                       </span>
                                    </Button>
                                 </RipleAnimation>
                              </div>
                              <div
                                 style={{
                                    borderRadius: '13px',
                                    overflow: 'hidden',
                                    marginLeft: '9px',
                                 }}
                              >
                                 <Button onClick={handleSubmit} ripleAnimation {...(ableCreateState ? { primary: true } : { disable: true })}>
                                    Tạo
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </>
                  )}
                  {loadingState && <div className={cx('modal-loading')}></div>}
               </div>
               <div className={cx('modal')}></div>
            </div>
         )}
      </>
   );
}

export default CreateEpisodes;
