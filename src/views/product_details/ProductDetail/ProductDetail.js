import classNames from 'classnames/bind';
import style from './ProductDetail.module.scss';

import { MdFilterList } from 'react-icons/md';
import { HiOutlineXMark } from 'react-icons/hi2';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { BiSolidArrowFromBottom } from 'react-icons/bi';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import imgs from '~/assets/img';
import Input from '~/components/Input';
import Button from '~/components/Button';
import uploadImagebb from '~/utils/uploadImagebb';
import InputSearchSelection from '~/components/InputSearchSelection';

import ProductService from '~/services/ProductServices';
import Selection from '~/components/Selection';
import KeySeo from './KeySeo';

const cx = classNames.bind(style);

function ProductDetail() {
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

   const [visibleMessageState, setVisibleMessageState] = useState(false);

   const [ableCreateState, setAbleCreateStateState] = useState(false);
   const [loadingState, setLoadingState] = useState(false);
   const [chooseFileState, setChooseFileState] = useState(null);
   const [infoImageState, setInfoImageState] = useState({ scale: '1', objectPosition: '0 0' });

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

   const wrapperRef = useRef(null);
   const searchInputRef = useRef(null);

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
                     setVisibleMessageState(true);
                  });
               })
               .catch(() => {});
         }
      });
   };

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
      <div ref={wrapperRef} className={cx('wrapper')}>
         <div className={cx('inner')}>
            <div className={cx('main-content')}>
               <div className={cx('main-content-top')}>
                  <div className={cx('main-content-top-left')}>
                     <h2 className={cx('header-title')}>Thông tin chi tiết về phim</h2>
                  </div>
                  <div className={cx('main-content-top-right')}>
                     <Button key="cancle1" onlyText disable>
                        Hủy thay đổi
                     </Button>

                     <Button
                        key="save1"
                        disable
                        primary
                        ripleAnimation
                        ripleAnimationLight
                        style={{ marginLeft: '9px' }}
                     >
                        Lưu
                     </Button>

                     <Button
                        key="option1"
                        transparent
                        fullWidth
                        style={{ width: `39px`, marginLeft: '9px' }}
                     >
                        <HiOutlineDotsVertical />
                     </Button>
                  </div>
               </div>
               <div className={cx('main-content-bottom')}>
                  <div className={cx('main-content-bottom-start')}>
                     <div className={cx('main-content-bottom-start-left')}>
                        <div className={cx('wrapper-content-row')}>
                           <div className={cx('inner-content-name')}>
                              <Input
                                 key="_name1"
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
                                 key="another_name1"
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
                                 key="description1"
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
                                          categories: categoryChildRef.current.getChooseList(),
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
                     <div className={cx('main-content-bottom-start-right')}>
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
                                                className={cx('control-setup-transfrom-middle')}
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
                                          _status: statusChildRef.current.getOptionChoose().value,
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
                  <div className={cx('main-content-bottom-end')}>
                     <div className={cx('wrapper-background')}>
                        <div className={cx('background-main')}>
                           <img
                              src="data:image/jpeg;base64,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"
                              alt=""
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetail;
