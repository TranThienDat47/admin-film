import classNames from 'classnames/bind';
import style from './Movie.module.scss';

import { MdPlaylistPlay } from 'react-icons/md';

import { LiaPencilAltSolid } from 'react-icons/lia';
import { RiFolderVideoLine } from 'react-icons/ri';
import { AiOutlineBarChart } from 'react-icons/ai';

import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function RowMovie({ dataRow, isChecked = false, onCheckboxChange = () => {} }) {
   const [showControlMovie, setShowControlMovie] = useState(false);
   const [isCheckedState, setIsCheckedState] = useState(isChecked);
   const rowRef = useRef(null);
   const movieDescriptionRef = useRef(null);
   const movieControlRef = useRef(null);
   const checkBoxRef = useRef(null);

   const handleShowControlMovie = () => {
      if (!showControlMovie) {
         movieControlRef.current.style.display = 'flex';
         movieDescriptionRef.current.style.display = 'none';
         setShowControlMovie(true);
      }
   };

   const handleHideControlMovie = () => {
      if (showControlMovie) {
         movieControlRef.current.style.display = 'none';
         movieDescriptionRef.current.style.display = 'block';
         setShowControlMovie(false);
      }
   };

   useEffect(() => {
      rowRef.current.onmouseenter = () => {
         handleShowControlMovie();
      };

      rowRef.current.onmouseleave = () => {
         handleHideControlMovie();
      };

      // eslint-disable-next-line
   }, [showControlMovie]);

   useEffect(() => {
      setIsCheckedState(isChecked);
   }, [isChecked]);

   return (
      <>
         <div ref={rowRef} className={cx('table-row')}>
            <div
               className={cx('table-col')}
               style={{
                  flex: '0 0 43px',
                  minWidth: '33px',
                  cursor: 'pointer',
               }}
               onClick={() => {
                  setIsCheckedState((prev) => !prev);
               }}
            >
               <input
                  ref={checkBoxRef}
                  type="checkbox"
                  style={{
                     cursor: 'pointer',
                  }}
                  checked={isCheckedState}
                  onChange={() => {}}
               />
            </div>
            <div className={cx('table-col')} style={{ flex: '3 0 390px', minWidth: '390px' }}>
               <div className={cx('movie')}>
                  <div className={cx('movie-left')}>
                     <div className={cx('wrapper-image-movie')}>
                        <img
                           src="https://vcdn1-vnexpress.vnecdn.net/2019/07/30/anh-thien-nhien-dep-thang-7-1564483719.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Nl3znv-VRtPyhJYhLwwRfA"
                           alt=""
                        />

                        <div className={cx('layer')}>
                           <span>0</span>
                           <div className={cx('layer-icon')}>
                              <MdPlaylistPlay></MdPlaylistPlay>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={cx('movie-right')}>
                     <div className={cx('movie-right_name')}>
                        <Link to="#" nametooltip={'Chi tiết'}>
                           Kim Bình Bông Kim Bình BôngKim Bình BôngKim Bình BôngKim Bình BôngKim
                           Bình BôngKim Bình BôngKim Bình BôngKim Bình Bông
                        </Link>
                     </div>

                     <div className={cx('movie-right_description')} ref={movieDescriptionRef}>
                        Phim hay nhất thế giới
                     </div>
                     <div className={cx('movie-right_controls')} ref={movieControlRef}>
                        <div className={cx('controls-icon')} nametooltip={'Chi tiết'}>
                           <LiaPencilAltSolid />
                        </div>
                        <div className={cx('controls-icon')} nametooltip={'Video'}>
                           <RiFolderVideoLine />
                        </div>
                        <div className={cx('controls-icon')} nametooltip={'Số liệu phân tích'}>
                           <AiOutlineBarChart />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('table-col')} style={{ flex: '2 0 90px', minWidth: '90px' }}>
               <div className={cx('category')}>
                  [Hoạt hình trung quốc] / [Tu tiên] / [Siêu nhiên] / [Giả tưởng] / [Hoạt hình trung
                  quốc] / [Tu tiên] / [Siêu nhiên] / [Giả tưởng] / [Hoạt hình trung quốc] / [Tu
                  tiên] / [Siêu nhiên] / [Giả tưởng]
               </div>
            </div>
            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('status')}>Đang hiển thị</div>
            </div>
            <div className={cx('table-col')} style={{ flex: '1 0 90px', minWidth: '90px' }}>
               <div className={cx('recent')}>10/01/2002 00:00:00</div>
            </div>
            <div className={cx('table-col')} style={{ flex: '0 0 60px', minWidth: '100px' }}>
               <div className={cx('count_episodes')}>12</div>
            </div>
         </div>
      </>
   );
}

export default memo(RowMovie);
