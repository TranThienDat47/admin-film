import classNames from 'classnames/bind';
import style from './Movie.module.scss';

import { MdFilterList } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';

import { MdArrowDropDown } from 'react-icons/md';

import {
   CgChevronLeft,
   CgChevronRight,
   CgPushChevronLeft,
   CgPushChevronRight,
} from 'react-icons/cg';

import { LiaPencilAltSolid } from 'react-icons/lia';
import { RiFolderVideoLine } from 'react-icons/ri';
import { AiOutlineBarChart } from 'react-icons/ai';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RowMovie from './RowMovie';

const cx = classNames.bind(style);

function Movie() {
   const searchInputRef = useRef(null);

   const [listMoviesState, setListMoviesState] = useState(Array(12).fill(0));

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
                     className={cx('table-col')}
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
                  <div className={cx('table-col')} style={{ flex: '3 0 390px', minWidth: '390px' }}>
                     Phim
                  </div>
                  <div className={cx('table-col')} style={{ flex: '2 0 90px', minWidth: '90px' }}>
                     Thể loại
                  </div>
                  <div className={cx('table-col')} style={{ flex: '0.5 0 90px', minWidth: '90px' }}>
                     Trạng thái
                  </div>
                  <div className={cx('table-col')} style={{ flex: '1 0 90px', minWidth: '90px' }}>
                     Sửa đổi gần nhất
                  </div>
                  <div className={cx('table-col')} style={{ flex: '0 0 60px', minWidth: '100px' }}>
                     Số tập hiện tại
                  </div>
               </div>
               <div className={cx('table-content')}>
                  {listMoviesState.map((element, index) => (
                     <RowMovie key={index} />
                  ))}
               </div>
            </div>

            <div className={cx('footer-pagination')}>
               <div className={cx('pagination-inner')}>
                  <span>Số hàng của mỗi trang</span>
                  <div className={cx('wrapper-combobox')}>
                     <div className={cx('inner-combobox')}>
                        <div className={cx('combobox-left')}>3</div>
                        <div className={cx('combobox-right')}>
                           <MdArrowDropDown></MdArrowDropDown>
                        </div>
                     </div>
                     <div className={cx('select-combobox')}>
                        <div className={cx('select-combobox-item')}>10</div>
                        <div className={cx('select-combobox-item')}>30</div>
                        <div className={cx('select-combobox-item')}>50</div>
                     </div>
                  </div>

                  <div className={cx('current-page')}>1 [4/4]</div>
                  <div className={cx('page-icon', 'first-page')}>
                     <CgPushChevronLeft></CgPushChevronLeft>
                  </div>
                  <div className={cx('page-icon', 'prev-page')}>
                     <CgChevronLeft></CgChevronLeft>
                  </div>
                  <div className={cx('page-icon', 'next-page')}>
                     <CgChevronRight></CgChevronRight>
                  </div>
                  <div className={cx('page-icon', 'last-page')}>
                     <CgPushChevronRight></CgPushChevronRight>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Movie;
