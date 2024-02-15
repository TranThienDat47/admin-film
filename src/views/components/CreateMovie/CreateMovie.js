import classNames from 'classnames/bind';
import styles from './CreateMovie.module.scss';

import { HiOutlineXMark } from 'react-icons/hi2';
import { FaRegCircleXmark } from 'react-icons/fa6';

import Button from '~/components/Button';
import RipleAnimation from '~/components/RipleAnimation';
import { BiSolidArrowFromBottom } from 'react-icons/bi';

import imgs from '~/assets/img';
import Selection from '~/components/Selection';
import Input from '~/components/Input';
import InputSearchSelection from '~/components/InputSearchSelection';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function CreateMovie({ handleClose = () => {} }) {
   const [ableCreateState, setAbleCreateState] = useState(false);
   const [chooseFileState, setChooseFileState] = useState(null);

   const chooseFileRef = useRef();

   const handleFileChange = (files) => {
      if (files.length > 0) {
         const selectedFile = files[0];

         if (selectedFile.type.startsWith('image/')) {
            setChooseFileState(selectedFile);

            console.log(URL.createObjectURL(selectedFile));
         } else {
            console.error('Selected file is not an image.');
         }
      }
   };

   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('header')}>
                  <div className={cx('header-left')}>Phim hay qua</div>
                  <div className={cx('header-right')}>
                     <div className={cx('')}></div>
                     <div className={cx('header-right-icon')} onClick={handleClose}>
                        <HiOutlineXMark></HiOutlineXMark>
                     </div>
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
                              />
                           </div>
                           <div className={cx('inner-content-description')}>
                              <Input
                                 maxRow={5}
                                 row={5}
                                 title="Mô tả"
                                 placeholder="Mô tả"
                                 maxLength={1225}
                              />
                           </div>
                           <div className={cx('inner-content-key_seo')}>
                              <div className={cx('inner-content-key_seo-create')}>
                                 <Input
                                    className={cx('inner-content-key_seo-input')}
                                    maxRow={1}
                                    row={1}
                                    downTheLine={false}
                                    title="Từ khóa tìm kiếm (tối đa 19 từ khóa)"
                                    placeholder="Từ khóa tìm kiếm"
                                    maxLength={25}
                                 />
                                 <div style={{ overflow: 'hidden', borderRadius: '9px' }}>
                                    <Button
                                       ripleAnimation
                                       outline
                                       medium
                                       borderColor="var(--link-color)"
                                       borderRadius="9px"
                                    >
                                       <span
                                          style={{ color: 'var(--link-color)', fontSize: '1.4' }}
                                       >
                                          Tạo
                                       </span>
                                    </Button>
                                 </div>
                              </div>
                              <div className={cx('inner-content-key_seo-list')}>
                                 <div className={cx('inner-content-key_seo-item')}>
                                    <span>#kim binh bong</span>
                                    <div
                                       className={cx('inner-content-key_seo-item-icon')}
                                       nametooltip={'Loại bỏ'}
                                    >
                                       <FaRegCircleXmark></FaRegCircleXmark>
                                    </div>
                                 </div>
                                 <div className={cx('inner-content-key_seo-item')}>
                                    <span>#kim binh bong</span>
                                    <div
                                       className={cx('inner-content-key_seo-item-icon')}
                                       nametooltip={'Loại bỏ'}
                                    >
                                       <FaRegCircleXmark></FaRegCircleXmark>
                                    </div>
                                 </div>
                                 <div className={cx('inner-content-key_seo-item')}>
                                    <span>#kim binh bong</span>
                                    <div
                                       className={cx('inner-content-key_seo-item-icon')}
                                       nametooltip={'Loại bỏ'}
                                    >
                                       <FaRegCircleXmark></FaRegCircleXmark>
                                    </div>
                                 </div>
                                 <div className={cx('inner-content-key_seo-item')}>
                                    <span>#kim binh bong</span>
                                    <div
                                       className={cx('inner-content-key_seo-item-icon')}
                                       nametooltip={'Loại bỏ'}
                                    >
                                       <FaRegCircleXmark></FaRegCircleXmark>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className={cx('inner-content-category')}>
                              <div className={cx('inner-content-category-selected')}>
                                 <InputSearchSelection
                                    title="Danh mục"
                                    placeholder="Từ khóa liên quan"
                                    nameItem="Danh mục"
                                    showRecommend={false}
                                    dataRecommend={[
                                       { title: 'haha', id: 0 },
                                       { title: 'huhu', id: 1 },
                                       { title: 'huhu', id: 2 },
                                       { title: 'huhu', id: 3 },
                                       { title: 'huhu', id: 4 },
                                       { title: 'huhu', id: 5 },
                                    ]}
                                 ></InputSearchSelection>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className={cx('content-bottom-right')}>
                        <div className={cx('wrapper-content-image')}>
                           <div className={cx('wrapper-image')}>
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
                                 <img
                                    src={
                                       chooseFileState
                                          ? URL.createObjectURL(chooseFileState)
                                          : imgs.noImage
                                    }
                                    alt=""
                                 />
                              )}
                           </div>
                        </div>
                        <div className={cx('wrapper-content-right')}>
                           <div className={cx('wrapper-content-row')}>
                              <div className={cx('inner-content-release_date')}>
                                 <span>Ngày phát hành:</span>
                                 <input type="date" />
                              </div>
                              <div className={cx('inner-content-status')}>
                                 <span>Trạng thái:</span>
                                 <Selection
                                    defaultValue="Chờ công khai"
                                    listOptions={[
                                       { value: 'Chờ công khai', checked: false },
                                       { value: 'Lên lịch', checked: false },
                                       { value: 'Công khai', checked: false },
                                    ]}
                                 ></Selection>
                              </div>
                              <div className={cx('inner-content-country_of_origin')}>
                                 <span>Quốc gia:</span>
                                 <Selection
                                    className={cx('inner-content-country_of_origin-selected')}
                                    defaultValue="Việt Nam"
                                    listOptions={[
                                       { value: 'Trung Quốc', checked: false },
                                       { value: 'Nhật Bản', checked: false },
                                       { value: 'Hàn Quốc', checked: false },
                                    ]}
                                 ></Selection>
                              </div>
                              <div className={cx('inner-content-episodes')}>
                                 <span>Số tập:</span>
                                 <input
                                    type="number"
                                    onChange={() => {}}
                                    placeholder="Số tập"
                                    value={2}
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
                           ripleAnimation
                           {...(ableCreateState ? { primary: true } : { disable: true })}
                        >
                           Tạo
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('modal')}></div>
         </div>
      </>
   );
}

export default CreateMovie;
