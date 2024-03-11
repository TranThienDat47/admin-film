import { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './CreateMovie.module.scss';

import imgs from '~/assets/img';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Selection from '~/components/Selection';
import RipleAnimation from '~/components/RipleAnimation';
import InputSearchSelection from '~/components/InputSearchSelection';

import { HiOutlineXMark } from 'react-icons/hi2';
import { BiSolidArrowFromBottom } from 'react-icons/bi';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import KeySeo from './KeySeo';
import uploadImagebb from '~/utils/uploadImagebb';
import ProductService from '~/services/ProductServices';
import LoadingFetch from '~/components/LoadingFetch';
import AlertStatusBottom from '~/components/AlertStatusBottom';

const cx = classNames.bind(styles);

function CreateMovie({ hidden = false, handleClose = () => {} }) {
   const [ableCreateState, setAbleCreateStateState] = useState(false);
   const [loadingState, setLoadingState] = useState(false);
   const [hiddenState, setHiddenState] = useState(hidden);
   const [chooseFileState, setChooseFileState] = useState(null);
   const [infoImageState, setInfoImageState] = useState({ scale: '1', objectPosition: '0 0' });

   const [visibleMessageState, setVisibleMessageState] = useState(false);

   const categoryChildRef = useRef(null);
   const keySeoChildRef = useRef(null);
   const statusChildRef = useRef(null);
   const countryChildRef = useRef(null);

   const chooseFileRef = useRef();
   const ballRef = useRef();
   const mainProgressRef = useRef();
   const imageRef = useRef();
   const wrapperImgRef = useRef();
   const isDragBallRef = useRef(false);
   const isDragImageRef = useRef(false);

   const clientMouseDownImageRef = useRef({ x: 0, y: 0 });
   const prevClientMouseDownImageRef = useRef({ x: 0, y: 0 });

   const tempScaleRef = useRef(1);

   const tempTranslateBallRef = useRef(0);

   const tempDataUpload = useRef(null);

   const [dataSubmitState, setDataSubmitState] = useState({
      _name: '',
      description: '',
      anotherName: '',
      _status: '',
      img: '',
      episodes: '',
      view: 0,
      releaseDate: '',
      news: true,
      reacts: 0,
      categories: [],
      country_Of_Origin: '',
      background: '',
      keySearch: '',
   });

   const handleFileChange = (files) => {
      if (files.length > 0) {
         const selectedFile = files[0];

         if (selectedFile.type.startsWith('image/')) {
            setChooseFileState(selectedFile);
         } else {
            console.error('Selected file is not an image.');
         }
      }
   };

   const handleMouseUpBall = () => {
      isDragBallRef.current = true;
   };

   const handleMouseMoveBall = useCallback(
      (e) => {
         if (isDragBallRef.current) {
            const x = e.clientX - mainProgressRef.current.getBoundingClientRect().left;

            tempTranslateBallRef.current = x;
            const maxWidth = 100;
            const maxZoom = 4;

            if (+x > maxWidth) {
               tempTranslateBallRef.current = maxWidth;
            } else if (+x < 0) {
               tempTranslateBallRef.current = 0;
            }

            ballRef.current.style.transform = `translateY(-50%) translateX(${tempTranslateBallRef.current}px)`;
            const tempScale = (1 + (tempTranslateBallRef.current * maxZoom) / 100).toFixed(1);

            setInfoImageState({ ...infoImageState, scale: tempScale });
            tempScaleRef.current = tempScale;

            imageRef.current.style.backgroundSize = `${100 * tempScale}%`;

            imageRef.current.style.backgroundPosition = 'calc(50% + 0px) calc(50% + 0px)';
            prevClientMouseDownImageRef.current = { x: 0, y: 0 };
         }
      },
      [infoImageState],
   );

   const handleMouseDownBall = () => {
      if (isDragBallRef.current) {
         isDragBallRef.current = false;

         prevClientMouseDownImageRef.current = {
            x: 0,
            y: 0,
         };
      }
   };

   const handleMouseUpImage = (e) => {
      isDragImageRef.current = true;

      clientMouseDownImageRef.current = {
         x: e.clientX - +prevClientMouseDownImageRef.current.x,
         y: e.clientY - +prevClientMouseDownImageRef.current.y,
      };
   };

   const handleMouseMoveImage = useCallback((e) => {
      if (isDragImageRef.current) {
         const x = e.clientX;
         const y = e.clientY;

         const widthOfImage = imageRef.current.offsetWidth;
         const heightOfImage = imageRef.current.offsetHeight;

         var positionX = (x - clientMouseDownImageRef.current.x).toFixed(0),
            positionY = (y - clientMouseDownImageRef.current.y).toFixed(0);

         var realTranslationX = positionX,
            realTranslationY = positionY;

         if (tempScaleRef.current > 1) {
            const maxXTranslation = (widthOfImage * (tempScaleRef.current - 1)) / 2;

            if (realTranslationX > maxXTranslation) {
               realTranslationX = maxXTranslation;
            } else if (realTranslationX < -maxXTranslation) {
               realTranslationX = -maxXTranslation;
            }

            const maxYTranslation = (heightOfImage * (tempScaleRef.current - 1)) / 2;
            if (realTranslationY > maxYTranslation) {
               realTranslationY = maxYTranslation;
            } else if (realTranslationY < -maxYTranslation) {
               realTranslationY = -maxYTranslation;
            }

            imageRef.current.style.backgroundPositionX = `calc(50% + ${realTranslationX}px)`;
            imageRef.current.style.backgroundPositionY = `calc(50% + ${realTranslationY}px)`;

            prevClientMouseDownImageRef.current = {
               x: realTranslationX,
               y: realTranslationY,
            };
         }
      }
      return true;
   }, []);

   const handleMouseDownImage = (e) => {
      if (isDragImageRef.current) {
         isDragImageRef.current = false;
      }
   };

   const handleMinusScale = () => {
      if (tempTranslateBallRef.current - 2.5 < 0) {
         tempTranslateBallRef.current = 0;
      } else {
         tempTranslateBallRef.current = tempTranslateBallRef.current - 2.5;
      }

      const maxZoom = 4;

      ballRef.current.style.transform = `translateY(-50%) translateX(${tempTranslateBallRef.current}px)`;
      const tempScale = (1 + (tempTranslateBallRef.current * maxZoom) / 100).toFixed(1);

      setInfoImageState({ ...infoImageState, scale: tempScale });
      tempScaleRef.current = tempScale;

      imageRef.current.style.backgroundSize = `${100 * tempScale}%`;

      imageRef.current.style.backgroundPosition = 'calc(50% + 0px) calc(50% + 0px)';
      prevClientMouseDownImageRef.current = { x: 0, y: 0 };
   };

   const handlePlusScale = () => {
      if (tempTranslateBallRef.current + 2.5 > mainProgressRef.current.offsetWidth) {
         tempTranslateBallRef.current = mainProgressRef.current.offsetWidth;
      } else {
         tempTranslateBallRef.current = tempTranslateBallRef.current + 2.5;
      }

      const maxZoom = 4;

      ballRef.current.style.transform = `translateY(-50%) translateX(${tempTranslateBallRef.current}px)`;
      const tempScale = (1 + (tempTranslateBallRef.current * maxZoom) / 100).toFixed(1);

      setInfoImageState({ ...infoImageState, scale: tempScale });
      tempScaleRef.current = tempScale;

      imageRef.current.style.backgroundSize = `${100 * tempScale}%`;

      imageRef.current.style.backgroundPosition = 'calc(50% + 0px) calc(50% + 0px)';
      prevClientMouseDownImageRef.current = { x: 0, y: 0 };
   };

   const handleCloseImageChoice = () => {
      setChooseFileState(null);
   };

   const validateValue = () => {
      return new Promise((resolve, reject) => {
         const { _name, description, _status, img, episodes, releaseDate, categories } =
            dataSubmitState;

         if (
            !_name ||
            !description ||
            !_status ||
            !img ||
            !episodes ||
            !releaseDate ||
            categories.length === 0
         ) {
            resolve(false);
         } else {
            resolve(true);
         }
      });
   };

   const handleSubmit = async () => {
      validateValue().then((data) => {
         if (data) {
            setLoadingState(true);
            uploadImagebb(dataSubmitState.img)
               .then((result) => {
                  if (result.success) {
                     tempDataUpload.current = dataSubmitState;

                     tempDataUpload.current.img = result.data.display_url;
                  }
               })
               .then(async () => {
                  await ProductService.add(tempDataUpload.current).then(() => {
                     setHiddenState(true);
                     setVisibleMessageState(true);
                  });
               })
               .catch(() => {});
         }
      });
   };

   useEffect(() => {
      setHiddenState(hidden);
   }, [hidden]);

   useEffect(() => {
      validateValue().then((data) => {
         if (data) setAbleCreateStateState(true);
         else setAbleCreateStateState(false);
      });
   }, [dataSubmitState]);

   useEffect(() => {
      if (chooseFileState != null) {
         if (mainProgressRef.current) {
            mainProgressRef.current.onmousedown = (e) => {
               handleMouseUpBall(e);
            };
         }

         if (imageRef.current) {
            imageRef.current.onmousedown = (e) => {
               handleMouseUpImage(e);
            };

            imageRef.current.style.backgroundImage = `url("${imageRef.current.getAttribute(
               'srcimage',
            )}")`;
         }

         window.onmousemove = (e) => {
            handleMouseMoveBall(e);
            handleMouseMoveImage(e);
         };

         window.onmouseup = (e) => {
            handleMouseDownBall(e);
            handleMouseDownImage(e);
         };

         if (dataSubmitState) {
            setDataSubmitState((prev) => ({
               ...prev,
               img: URL.createObjectURL(chooseFileState),
            }));
         }
      }

      // eslint-disable-next-line
   }, [chooseFileState]);

   return (
      <>
         {hiddenState || (
            <>
               <div className={cx('wrapper')}>
                  <div className={cx('inner')}>
                     <div className={cx('header')}>
                        <div className={cx('header-top')}>
                           <div className={cx('header-left')}>Phim hay qua</div>
                           <div className={cx('header-right')}>
                              <div className={cx('')}></div>
                              <div className={cx('header-right-icon')} onClick={handleClose}>
                                 <HiOutlineXMark></HiOutlineXMark>
                              </div>
                           </div>
                        </div>
                        <div className={cx('header-bottom')}>
                           <LoadingFetch isLoading={loadingState} />
                        </div>
                     </div>
                     <div className={cx('content')}>
                        <div className={cx('content-bottom')}>
                           <div className={cx('content-bottom-left')}>
                              <div className={cx('wrapper-content-row')}>
                                 <div className={cx('inner-content-name')}>
                                    <Input
                                       required
                                       maxRow={2}
                                       row={2}
                                       downTheLine={false}
                                       title="Tên phim"
                                       placeholder="Tên phim"
                                       maxLength={155}
                                       onInput={(e) => {
                                          setDataSubmitState((prev) => ({
                                             ...prev,
                                             _name: e.target.textContent,
                                          }));
                                       }}
                                    />
                                 </div>
                                 <div className={cx('inner-content-other_name')}>
                                    <Input
                                       maxRow={2}
                                       row={2}
                                       downTheLine={false}
                                       title="Tên gọi khác"
                                       placeholder="Tên gọi khác"
                                       maxLength={155}
                                       onInput={(e) => {
                                          setDataSubmitState((prev) => ({
                                             ...prev,
                                             anotherName: e.target.textContent,
                                          }));
                                       }}
                                    />
                                 </div>
                                 <div className={cx('inner-content-description')}>
                                    <Input
                                       maxRow={5}
                                       row={5}
                                       title="Mô tả"
                                       placeholder="Mô tả"
                                       maxLength={1225}
                                       onInput={(e) => {
                                          setDataSubmitState((prev) => ({
                                             ...prev,
                                             description: e.target.textContent,
                                          }));
                                       }}
                                    />
                                 </div>
                                 <div className={cx('inner-content-key_seo')}>
                                    <KeySeo
                                       ref={keySeoChildRef}
                                       maxNumOfKey={19}
                                       onChangeValue={() => {
                                          setDataSubmitState((prev) => ({
                                             ...prev,
                                             keySearch: keySeoChildRef.current.getListKeySeo(),
                                          }));
                                       }}
                                    />
                                 </div>
                                 <div className={cx('inner-content-category')}>
                                    <div className={cx('inner-content-category-selected')}>
                                       <InputSearchSelection
                                          ref={categoryChildRef}
                                          title="Thể loại"
                                          placeholder="Từ khóa liên quan"
                                          nameItem="Thể loại"
                                          showRecommend={false}
                                          onChangeValue={() => {
                                             setDataSubmitState((prev) => ({
                                                ...prev,
                                                categories:
                                                   categoryChildRef.current.getChooseList(),
                                             }));
                                          }}
                                          dataRecommend={[
                                             { title: 'Ac quy', id: 0 },
                                             { title: 'huhu', id: 1 },
                                             { title: 'huhu', id: 2 },
                                             { title: 'huhu', id: 3 },
                                             { title: 'huhu', id: 4 },
                                             { title: 'huhu', id: 5 },
                                          ]}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('content-bottom-right')}>
                              <div className={cx('wrapper-content-image')}>
                                 <div ref={wrapperImgRef} className={cx('wrapper-image')}>
                                    {!!!chooseFileState ? (
                                       <>
                                          <input
                                             ref={chooseFileRef}
                                             className={cx('choose-file')}
                                             type="file"
                                             onChange={(e) => handleFileChange(e.target.files)}
                                             accept="image/png, image/gif, image/jpeg"
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
                                                <h4>Kéo và thả tệp hình ảnh để tải lên</h4>
                                                <div>Chỉ được sử dụng ảnh tĩnh</div>
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
                                       </>
                                    ) : (
                                       <>
                                          <div
                                             ref={imageRef}
                                             srcimage={
                                                chooseFileState
                                                   ? URL.createObjectURL(chooseFileState)
                                                   : imgs.noImage
                                             }
                                             className={cx('main-image')}
                                          ></div>
                                          <div
                                             onClick={() => {
                                                handleCloseImageChoice();
                                             }}
                                             className={cx('control-setup-button-close')}
                                          >
                                             <HiOutlineXMark></HiOutlineXMark>
                                          </div>
                                          <div className={cx('control-setup-transfrom-wrapper')}>
                                             <div
                                                onClick={() => {
                                                   handleMinusScale();
                                                }}
                                                className={cx('control-setup-transfrom-btn-minus')}
                                             >
                                                <FiMinusCircle />
                                             </div>
                                             <div className={cx('control-setup-transfrom-inner')}>
                                                <div
                                                   ref={mainProgressRef}
                                                   className={cx('control-setup-transfrom-main')}
                                                >
                                                   <div
                                                      className={cx(
                                                         'control-setup-transfrom-middle',
                                                      )}
                                                   ></div>
                                                   <div
                                                      ref={ballRef}
                                                      scalevalue={infoImageState.scale + 'x'}
                                                      className={cx('control-setup-transfrom-ball')}
                                                   ></div>
                                                </div>
                                             </div>
                                             <div
                                                onClick={() => {
                                                   handlePlusScale();
                                                }}
                                                className={cx('control-setup-transfrom-btn-plus')}
                                             >
                                                <FiPlusCircle />
                                             </div>
                                          </div>
                                       </>
                                    )}
                                 </div>
                              </div>
                              <div className={cx('wrapper-content-right')}>
                                 <div className={cx('wrapper-content-row')}>
                                    <div className={cx('inner-content-release_date')}>
                                       <span>Ngày phát hành:</span>
                                       <input
                                          type="date"
                                          onChange={(e) => {
                                             setDataSubmitState((prev) => ({
                                                ...prev,
                                                releaseDate: e.target.value,
                                             }));
                                          }}
                                       />
                                    </div>
                                    <div className={cx('inner-content-status')}>
                                       <span>Trạng thái:</span>
                                       <Selection
                                          ref={statusChildRef}
                                          defaultValue="Chờ công khai"
                                          listOptions={[
                                             { value: 'Chờ công khai', checked: true },
                                             { value: 'Lên lịch', checked: false },
                                             { value: 'Công khai', checked: false },
                                          ]}
                                          onChangeOption={() => {
                                             setDataSubmitState((prev) => ({
                                                ...prev,
                                                _status:
                                                   statusChildRef.current.getOptionChoose().value,
                                             }));
                                          }}
                                       />
                                    </div>
                                    <div className={cx('inner-content-country_of_origin')}>
                                       <span>Quốc gia:</span>
                                       <Selection
                                          ref={countryChildRef}
                                          className={cx('inner-content-country_of_origin-selected')}
                                          defaultValue="Việt Nam"
                                          listOptions={[
                                             { value: 'Việt Nam', checked: true },
                                             { value: 'Trung Quốc', checked: false },
                                             { value: 'Nhật Bản', checked: false },
                                             { value: 'Hàn Quốc', checked: false },
                                          ]}
                                          onChangeOption={() => {
                                             setDataSubmitState((prev) => ({
                                                ...prev,
                                                country_Of_Origin:
                                                   countryChildRef.current.getOptionChoose().value,
                                             }));
                                          }}
                                       />
                                    </div>
                                    <div className={cx('inner-content-episodes')}>
                                       <span>Số tập:</span>
                                       <input
                                          type="number"
                                          onChange={(e) => {
                                             setDataSubmitState((prev) => ({
                                                ...prev,
                                                episodes: e.target.value,
                                             }));
                                          }}
                                          placeholder="Số tập"
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className={cx('footer')}>
                        <div className={cx('footer-left')}></div>
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
                              <Button
                                 onClick={handleSubmit}
                                 ripleAnimation
                                 {...(ableCreateState ? { primary: true } : { disable: true })}
                              >
                                 Tạo
                              </Button>
                           </div>
                        </div>
                     </div>
                     {loadingState && <div className={cx('modal-loading')}></div>}
                  </div>
                  <div className={cx('modal')}></div>
               </div>
            </>
         )}
         <AlertStatusBottom visible={visibleMessageState} message="Thêm thành công" />
      </>
   );
}

export default CreateMovie;
