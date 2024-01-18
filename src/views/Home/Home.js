import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
   const wrapperRef = useRef();

   return (
      <div ref={wrapperRef} className={cx('wrapper')}>
         <div className={cx('inner')}>
            <h2 className={cx('header-title')}>Trang tổng quan</h2>
            <div className={cx('main')}>
               <div className={cx('wrapper_of_block', 'border', 'block-overview')}>
                  <div className={cx('header-inner')}>Số liệu phân tích tổng quan</div>
                  <div className={cx('row-overview')}>
                     <div className={cx('row-overview-left')}>Số người truy cập hiện tại</div>
                  </div>
                  <div className={cx('count-visitor')}>0</div>

                  <div className={cx('separator')}></div>

                  <div className={cx('header-title-small')}>Tóm tắt</div>
                  <div className={cx('row-overview', 'bland', 'overview-time')}>
                     <div className={cx('row-overview-left')}>30 ngày qua</div>
                  </div>
                  <div className={cx('row-overview')}>
                     <div className={cx('row-overview-left')}>Số lượt xem</div>
                     <div className={cx('row-overview-right')}>
                        <div className={cx('value')}>0</div>
                        <div className={cx('cross')}>-</div>
                     </div>
                  </div>
                  <div className={cx('row-overview')}>
                     <div className={cx('row-overview-left')}>Thời gian xem (giờ)</div>
                     <div className={cx('row-overview-right')}>
                        <div className={cx('value')}>0,0</div>
                        <div className={cx('cross')}>-</div>
                     </div>
                  </div>

                  <div className={cx('separator')}></div>
                  <div className={cx('header-title-small')}>Phim thịnh hành</div>
                  <div className={cx('row-overview', 'bland', 'overview-time')}>
                     <div className={cx('row-overview-left')}>48 giờ qua</div>
                  </div>
                  <div className={cx('row-overview')}>
                     <div className={cx('row-overview-left')}>Phim tây du ký</div>
                     <div className={cx('row-overview-right')}>
                        <div className={cx('value')}>999k</div>
                     </div>
                  </div>
                  <div className={cx('row-overview')}>
                     <div className={cx('row-overview-left')}>Kim bình bông</div>
                     <div className={cx('row-overview-right')}>
                        <div className={cx('value')}>369k</div>
                     </div>
                  </div>

                  <Link to="#">
                     <div className={cx('footer-overview')}>Xem phân tích chi tiết</div>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default React.memo(Home);
