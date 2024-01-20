import classNames from 'classnames/bind';
import style from './ProductLayout.module.scss';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';

import { BiCategory } from 'react-icons/bi';
import { MdOutlineVideoSettings } from 'react-icons/md';
import DefaultLayout from '~/layout/DefaultLayout';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import RipleAnimation from '~/components/RipleAnimation';

const cx = classNames.bind(style);

function ProductLayout({ children }) {
   const currentPath = window.location.pathname;

   var tempDataItnitState = [
      {
         id: 1,
         icon: BiCategory,
         title: 'Phim',
         active: true,
         href:
            routes.product.movie !== null && typeof routes.product.movie === 'object'
               ? Object.values(routes.product.movie)
               : [routes.product.movie],
      },
      {
         id: 2,
         icon: MdOutlineVideoSettings,
         title: 'Video ngắn',
         active: false,
         href:
            routes.product.short !== null && typeof routes.product.short === 'object'
               ? Object.values(routes.product.short)
               : [routes.product.short],
      },
   ];

   // tempDataItnitState = tempDataItnitState.map((element) => {
   //    if (element.href.length === 1) {
   //       if (
   //          element.href &&
   //          element.href.includes(currentPath) &&
   //          currentPath.length === element.href.length
   //       ) {
   //          element.active = true;
   //       } else {
   //          element.active = false;
   //       }
   //    } else {
   //       if (element.href && element.href.includes(currentPath)) {
   //          element.active = true;
   //       } else {
   //          element.active = false;
   //       }
   //    }
   //    return element;
   // });

   const [dataInitState, setDataInitState] = useState(tempDataItnitState);

   const handleClickItemSideBar = (dataTemp) => {
      setDataInitState((prev) =>
         prev.map((element, i) => {
            parseInt(element.id) === parseInt(dataTemp.id)
               ? (element.active = true)
               : (element.active = false);

            return element;
         }),
      );
   };

   const wrapperRef = useRef(null);

   useEffect(() => {
      wrapperRef.current.onscroll = () => {};
   }, []);

   return (
      <DefaultLayout>
         <div ref={wrapperRef} key="oahjsasd" className={cx('wrapper')}>
            <div className={cx('inner')}>
               <h2 className={cx('header-title')}>Trang nội dung quản lý</h2>

               <div className={cx('main')}>
                  <div className={cx('navigation-tab-list')}>
                     {dataInitState.map((elment, index) => (
                        <Link
                           key={elment.href[0]}
                           to={elment.href[0]}
                           onClick={() => {
                              handleClickItemSideBar(elment);
                           }}
                        >
                           <RipleAnimation className={cx('wrapper-riple-animation')}>
                              <div
                                 className={cx(
                                    'navigation-tab-item',
                                    `${elment.active ? 'active' : ''}`,
                                 )}
                              >
                                 {elment.title}
                              </div>
                           </RipleAnimation>
                        </Link>
                     ))}
                  </div>
                  <div className={cx('main-content')}>{children}</div>
               </div>
            </div>
         </div>
      </DefaultLayout>
   );
}

export default ProductLayout;
