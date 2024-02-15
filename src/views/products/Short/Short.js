import classNames from 'classnames/bind';
import style from './Short.module.scss';

import { MdFilterList } from 'react-icons/md';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useRef } from 'react';

const cx = classNames.bind(style);

function Short() {
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
                  <div className={cx('filter-item-title')} nametooltip={'Tiêu đề có chứa "a"'}>
                     Tiêu đề: "ok la"
                  </div>
                  <div className={cx('filter-item-icon')} nametooltip={'Loại bỏ'}>
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
      </>
   );
}

export default Short;
