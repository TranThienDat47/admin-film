import classNames from 'classnames/bind';
import style from './Movie.module.scss';

import { MdFilterList } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';

import { MdPlaylistPlay } from 'react-icons/md';

import { useRef } from 'react';

const cx = classNames.bind(style);

function Movie() {
   const searchInputRef = useRef(null);
   return (
      <>
         <div className={cx('filter')}>
            <div
               className={cx('filter-icon')}
               onClick={() => {
                  searchInputRef.current.focus();
               }}
            >
               <MdFilterList></MdFilterList>
            </div>

            <div className={cx('filter-list')}>
               <div className={cx('filter-item')}>
                  <div className={cx('filter-item-title')} name-tooltip={'Tiêu đề có chứa "a"'}>
                     Tiêu đề: "ok la"
                  </div>
                  <div className={cx('filter-item-icon')} name-tooltip={'Loại bỏ'}>
                     <FaRegCircleXmark></FaRegCircleXmark>
                  </div>
               </div>
            </div>

            <div className={cx('filter-main')}>
               <input
                  ref={searchInputRef}
                  type="text"
                  className={cx('txt_filter')}
                  placeholder="Lọc"
               />
            </div>
         </div>
         <div className={cx('main-content')}>
            <div className={cx('table')}>
               <div className={cx('table-header')}>
                  <div
                     style={{
                        flex: '0 0 43px',
                        minWidth: '33px',
                        cursor: 'pointer',
                     }}
                  >
                     <input
                        type="checkbox"
                        style={{
                           cursor: 'pointer',
                        }}
                     />
                  </div>
                  <div style={{ flex: '3 0 390px' }}>Phim</div>
                  <div style={{ flex: '1 0 90px' }}>Thể loại</div>
                  <div style={{ flex: '1 0 90px' }}>Trạng thái</div>
                  <div style={{ flex: '1 0 90px' }}>Sửa đổi gần nhất</div>
                  <div style={{ flex: '1 0 60px' }}>Số tập</div>
               </div>
               <div className={cx('table-content')}>
                  <div className={cx('table-row')}>
                     <div
                        style={{
                           flex: '0 0 43px',
                           minWidth: '33px',
                           cursor: 'pointer',
                        }}
                     >
                        <input
                           type="checkbox"
                           style={{
                              cursor: 'pointer',
                           }}
                        />
                     </div>
                     <div className={cx('movie')} style={{ flex: '3 0 390px' }}>
                        <div className={cx('movie-left')}>
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
                        <div className={cx('movie-right')}>
                           <div className={cx('movie-right_name')}>Kim Bình Mai</div>
                           <div className={cx('movie-right_description')}>
                              Phim hay nhất thế giới
                           </div>
                           <div className={cx('movie-right_controls')}></div>
                        </div>
                     </div>
                     <div style={{ flex: '1 0 90px' }}>Thể loại</div>
                     <div style={{ flex: '1 0 90px' }}>Trạng thái</div>
                     <div style={{ flex: '1 0 90px' }}>Sửa đổi gần nhất</div>
                     <div style={{ flex: '1 0 60px' }}>Số tập</div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Movie;
