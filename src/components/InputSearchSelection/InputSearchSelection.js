import classNames from 'classnames/bind';
import styles from './InputSearchSelection.module.scss';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const InputSearchSelection = forwardRef(
   (
      {
         dataRecommend = [], //{title: "", id: 0}
         maxNumChoose = -1,
         placeholder = '',
         title = '',
         showRecommend = false,
         nameItem = '',
         onChangeValue = () => {},
         ...props
      },
      ref,
   ) => {
      const [dataChooseState, setDataChooseState] = useState([]); //{title: "", id: 0}
      const [dataRecommendState, setDataRecommendState] = useState(dataRecommend);
      const [showRecommendState, setShowRecommendState] = useState(showRecommend);

      const wrapperRecommendRef = useRef();
      const inputRef = useRef();

      useEffect(() => {
         function handleClickOutside(event) {
            if (
               wrapperRecommendRef.current &&
               !wrapperRecommendRef.current.contains(event.target)
            ) {
               setShowRecommendState(false);
            }
         }

         document.addEventListener('mousedown', handleClickOutside);
         document.addEventListener('touchstart', handleClickOutside);

         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
         };
      }, [wrapperRecommendRef]);

      useEffect(() => {
         onChangeValue();
         // eslint-disable-next-line
      }, [dataChooseState]);

      useImperativeHandle(ref, () => ({
         getChooseList: () => {
            return dataChooseState;
         },
      }));

      return (
         <div ref={ref} className={cx('wrapper')} {...props}>
            <div className={cx('inner')}>
               <div
                  onClick={() => {
                     inputRef.current.focus();
                  }}
                  className={cx('title')}
               >
                  <div>{title}</div>
               </div>
               <div className={cx('main')}>
                  {dataChooseState.map((element, index) => (
                     <div key={element.id} className={cx('item-choose')}>
                        <span
                           {...(nameItem.length >= 0
                              ? { nametooltip: `${nameItem} "${element.title}"` }
                              : {})}
                        >
                           {element.title}
                        </span>
                        <div
                           className={cx('item-icon')}
                           onClick={() => {
                              setDataChooseState((prev) => prev.filter((item) => item !== element));
                              setDataRecommendState((prev) => [...prev, element]);
                           }}
                           nametooltip={'Loại bỏ'}
                        >
                           <FaRegCircleXmark></FaRegCircleXmark>
                        </div>
                     </div>
                  ))}
                  <div ref={wrapperRecommendRef} className={cx('wrapper-input')}>
                     <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        onFocus={() => {
                           setShowRecommendState(true);
                        }}
                     />
                     {showRecommendState &&
                        (maxNumChoose >= 0 ? (
                           dataRecommendState.length > 0 &&
                           dataChooseState.length < +maxNumChoose ? (
                              <>
                                 <div className={cx('wrapper-recommend')}>
                                    <div className={cx('recommend-list')}>
                                       {dataRecommendState.map((element, index) => (
                                          <div
                                             key={element.id}
                                             onClick={() => {
                                                setDataChooseState((prev) => [...prev, element]);
                                                setDataRecommendState((prev) =>
                                                   prev.filter((item) => item !== element),
                                                );

                                                inputRef.current.focus();
                                             }}
                                             className={cx('recommend-item')}
                                          >
                                             {element.title}
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <div className={cx('wrapper-recommend')}>
                                    <div className={cx('recommend-list')}>
                                       <div className={cx('recommend-item', 'unable')}>
                                          Tối đa {maxNumChoose} lựa chọn
                                       </div>
                                    </div>
                                 </div>
                              </>
                           )
                        ) : dataRecommendState.length > 0 ? (
                           <>
                              <div className={cx('wrapper-recommend')}>
                                 <div className={cx('recommend-list')}>
                                    {dataRecommendState.map((element, index) => (
                                       <div
                                          key={element.id}
                                          onClick={() => {
                                             setDataChooseState((prev) => [...prev, element]);
                                             setDataRecommendState((prev) =>
                                                prev.filter((item) => item !== element),
                                             );

                                             inputRef.current.focus();
                                          }}
                                          className={cx('recommend-item')}
                                       >
                                          {element.title}
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </>
                        ) : (
                           <>
                              <div className={cx('wrapper-recommend')}>
                                 <div className={cx('recommend-list')}>
                                    <div className={cx('recommend-item', 'unable')}>
                                       Không có lựa chọn phù hợp nào
                                    </div>
                                 </div>
                              </div>
                           </>
                        ))}
                  </div>
               </div>
            </div>
         </div>
      );
   },
);

export default memo(InputSearchSelection);
