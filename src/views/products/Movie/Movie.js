import classNames from 'classnames/bind';
import style from './Movie.module.scss';

import { MdFilterList, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';

import { MdArrowDropDown } from 'react-icons/md';

import { CgChevronLeft, CgChevronRight, CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RowMovie from './RowMovie';
import RipleAnimation from '~/components/RipleAnimation';
import { GlobalContext } from '~/contexts/global';

const cx = classNames.bind(style);

function Movie() {
   const {
      globalState: { productCurrent, pageProductCurrent, ableLoadingMoreProduct },
      loadProduct,
   } = useContext(GlobalContext);

   const searchInputRef = useRef(null);
   const checkBoxRef = useRef(null);

   const [listMoviesState, setListMoviesState] = useState([]);

   const [isAllChecked, setAllChecked] = useState(false);

   const handleAllCheckboxChange = () => {
      setAllChecked(!isAllChecked);
   };

   useEffect(() => {
      if (productCurrent.length <= 0) {
         loadProduct().then(() => {});
      }
   }, []);

   useEffect(() => {
      setListMoviesState(productCurrent);
   }, [productCurrent]);

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
                  <div className={cx('filter-item-title')} nametooltip={'Tiêu đề có chứa "a"'}>
                     Tiêu đề: "ok la"
                  </div>
                  <div className={cx('filter-item-icon')} nametooltip={'Loại bỏ'}>
                     <FaRegCircleXmark></FaRegCircleXmark>
                  </div>
               </div>
            </div>

            <div className={cx('filter-main')}>
               <input ref={searchInputRef} type="text" className={cx('txt_filter')} placeholder="Lọc" />
            </div>
         </div>
         <div className={cx('main-content')}>
            <div className={cx('table')}>
               <div className={cx('table-header')}>
                  <div
                     className={cx('table-col')}
                     style={{
                        flex: '0 0 var(--first-col)',
                        minWidth: 'var(--first-col)',
                        cursor: 'pointer',
                     }}
                     onClick={() => {
                        handleAllCheckboxChange();
                     }}
                  >
                     <input
                        ref={checkBoxRef}
                        type="checkbox"
                        style={{
                           cursor: 'pointer',
                        }}
                        checked={isAllChecked}
                        onChange={() => {}}
                     />
                  </div>
                  <div className={cx('table-col')} style={{ flex: '3 0 var(--second-col)', minWidth: 'var(--second-col)' }}>
                     Phim
                  </div>
                  <div className={cx('table-col')} style={{ flex: '2 0 var(--third-col)', minWidth: 'var(--third-col)' }}>
                     Thể loại
                  </div>
                  <div className={cx('table-col')} style={{ flex: '0.5 0 var(--fourth-col)', minWidth: 'var(--fourth-col)' }}>
                     Trạng thái
                  </div>
                  <div
                     className={cx('table-col')}
                     style={{
                        flex: '1 0 var(--fifth-col)',
                        minWidth: 'var(--fifth-col)',
                        color: 'var(--text-color)',
                        cursor: 'pointer',
                        userSelect: 'none',
                     }}
                  >
                     Sửa đổi gần nhất
                     <div className={cx('table-col-icon')}>
                        <MdArrowUpward></MdArrowUpward>
                     </div>
                  </div>
                  <div className={cx('table-col')} style={{ flex: '0.5 0 var(--sixth-col)', minWidth: 'var(--sixth-col)' }}>
                     Số tập hiện tại
                  </div>
               </div>
               <div className={cx('table-content')}>
                  {listMoviesState.map((element, index) => (
                     <RowMovie dataRow={element} key={index} isChecked={isAllChecked} onCheckboxChange={handleAllCheckboxChange} />
                  ))}
               </div>
            </div>

            <div className={cx('footer-pagination')}>
               <div className={cx('pagination-inner')}>
                  <span>Số hàng của mỗi trang</span>
                  <div className={cx('wrapper-combobox')}>
                     <RipleAnimation
                        style={{
                           borderRadius: '9px',
                        }}
                     >
                        <div className={cx('inner-combobox')}>
                           <div className={cx('combobox-left')}>3</div>
                           <div className={cx('combobox-right')}>
                              <MdArrowDropDown></MdArrowDropDown>
                           </div>
                        </div>
                     </RipleAnimation>
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
