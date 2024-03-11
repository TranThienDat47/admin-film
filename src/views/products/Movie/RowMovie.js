import classNames from 'classnames/bind';
import style from './Movie.module.scss';

import { MdPlaylistPlay } from 'react-icons/md';

import { LiaPencilAltSolid } from 'react-icons/lia';
import { RiFolderVideoLine } from 'react-icons/ri';
import { AiOutlineBarChart } from 'react-icons/ai';

import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function RowMovie({ dataRow = {}, isChecked = false, onCheckboxChange = () => {} }) {
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

   const formatTime = (inputTime) => {
      const date = new Date(inputTime);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
   };

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
                        <img src={dataRow.img} alt="" />

                        <div className={cx('layer')}>
                           <span>
                              {dataRow.currentEpisodes === '??' ? '0' : dataRow.currentEpisodes}
                           </span>
                           <div className={cx('layer-icon')}>
                              <MdPlaylistPlay></MdPlaylistPlay>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={cx('movie-right')}>
                     <div className={cx('movie-right_name')}>
                        <Link to="#" nametooltip={'Chi tiết'}>
                           {dataRow._name}
                        </Link>
                     </div>

                     <div className={cx('movie-right_description')} ref={movieDescriptionRef}>
                        {dataRow.description}
                     </div>
                     <div className={cx('movie-right_controls')} ref={movieControlRef}>
                        <Link
                           to="/product/details"
                           className={cx('controls-icon')}
                           nametooltip={'Chi tiết'}
                        >
                           <div>
                              <LiaPencilAltSolid />
                           </div>
                        </Link>
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
                  {dataRow.categories &&
                     dataRow.categories.map((element, index) =>
                        index === 0 ? `[${element.title}]` : ` / [${element.title}]`,
                     )}
               </div>
            </div>
            <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
               <div className={cx('status')}>{dataRow._status}</div>
            </div>
            <div className={cx('table-col')} style={{ flex: '1 0 90px', minWidth: '90px' }}>
               <div className={cx('recent')}>{formatTime(dataRow.releaseDate)}</div>
            </div>
            <div className={cx('table-col')} style={{ flex: '0.5 0 69px', minWidth: '100px' }}>
               <div className={cx('count_episodes')}>{dataRow.episodes}</div>
            </div>
         </div>
      </>
   );
}

export default memo(RowMovie);
