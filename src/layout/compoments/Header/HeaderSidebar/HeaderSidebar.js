import classNames from 'classnames/bind';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import imgs from '~/assets/img';
import config from '~/config';
import styles from './HeaderSidebar.module.scss';
import { AiOutlineBarChart, AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineVideoSettings } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi';
import { PiNotificationThin } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import { GoReport } from 'react-icons/go';
import { TbCategoryPlus } from 'react-icons/tb';

import routes from '~/config/routes';

import { BiCategory } from 'react-icons/bi';

const cx = classNames.bind(styles);

const HeaderSidebar = forwardRef((prop, ref) => {
   const navRef = useRef();
   const pseudoRef = useRef();
   const moveNavRef = useRef(false);
   const listRefCenter = useRef(null);
   const listRefBottom = useRef(null);

   const currentPath = window.location.pathname;

   var tempDataItnitState = [
      {
         id: 1,
         icon: BiCategory,
         title: 'Trang tổng quan',
         active: false,
         href:
            routes.home !== null && typeof routes.home === 'object'
               ? Object.values(routes.home)
               : [routes.home],
      },
      {
         id: 2,
         icon: MdOutlineVideoSettings,
         title: 'Nội dung',
         active: true,
         href:
            routes.product !== null && typeof routes.product === 'object'
               ? Object.values(routes.product)
               : [routes.product],
      },
      {
         id: 3,
         icon: BiCommentDetail,
         title: 'Bình luận',
         active: false,
         href:
            routes.comment !== null && typeof routes.comment === 'object'
               ? Object.values(routes.comment)
               : [routes.comment],
      },
      {
         id: 4,
         icon: TbCategoryPlus,
         title: 'Thể loại',
         active: false,
         href:
            routes.category !== null && typeof routes.category === 'object'
               ? Object.values(routes.category)
               : [routes.category],
      },
      {
         id: 5,
         icon: AiOutlineBarChart,
         title: 'Số liệu phân tích',
         active: false,
         href:
            routes.analyst !== null && typeof routes.analyst === 'object'
               ? Object.values(routes.analyst)
               : [routes.analyst],
      },
      {
         id: 6,
         icon: PiNotificationThin,
         title: 'Gửi thông báo',
         active: false,
         href:
            routes.notify !== null && typeof routes.notify === 'object'
               ? Object.values(routes.notify)
               : [routes.notify],
      },
   ];

   tempDataItnitState = tempDataItnitState.map((element) => {
      if (element.href.length === 1) {
         if (
            element.href &&
            element.href.includes(currentPath) &&
            currentPath.length === element.href[0].length
         ) {
            element.active = true;
         } else {
            element.active = false;
         }
      } else {
         if (element.href && element.href.includes(currentPath)) {
            element.active = true;
         } else {
            element.active = false;
         }
      }
      return element;
   });

   const [dataInitState, setDataInitState] = useState(tempDataItnitState);

   const [dataInitBottomState, setDataInitBottomState] = useState([
      { id: 1, icon: IoSettingsOutline, title: 'Cài đặt', href: '' },
      { id: 2, icon: GoReport, title: 'Báo cáo vấn đề', href: '' },
   ]);

   const [showNav, setShowNav] = useState(false);

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

   const handleClickItemBottomSideBar = (dataTemp) => {};

   const handleResize = () => {
      if (listRefCenter.current && listRefBottom.current) {
         const lastElement = listRefCenter.current.lastChild;
         const boundingBox = lastElement.getBoundingClientRect();

         const lastElementBottom = listRefBottom.current;
         const boundingBoxBottom = lastElementBottom.getBoundingClientRect();

         if (boundingBox.bottom >= boundingBoxBottom.top) {
            listRefBottom.current.style.borderTop = '1px solid var(--border-color)';
         } else {
            listRefBottom.current.style.borderTop = 'none';
         }
      }
   };

   useEffect(() => {
      handleResize();

      window.onresize = () => {
         handleResize();
      };
   }, [dataInitState]);

   useImperativeHandle(ref, () => ({
      showAndHide() {},
   }));

   return (
      <>
         <div className={cx('nav')} ref={navRef}>
            <div className={cx('header')}>
               <div className={cx('avata')}>
                  <img src={imgs.noImage} alt="avt" />
               </div>
               <div className={cx('name')}>Nam Văn</div>
               <div className={cx('role')}>Admin</div>
            </div>
            <div className={cx('list', 'list-center')} ref={listRefCenter}>
               {dataInitState.map((elment, index) => (
                  <Link key={elment.href[0]} to={elment.href[0]}>
                     <div
                        className={cx('item', `${elment.active ? 'active' : ''}`)}
                        onClick={() => {
                           handleClickItemSideBar(elment);
                        }}
                     >
                        <elment.icon className={cx('icon')} />
                        <div>{elment.title}</div>
                     </div>
                  </Link>
               ))}
            </div>
            <div className={cx('list', 'list-bottom')} ref={listRefBottom}>
               {dataInitBottomState.map((elment, index) => (
                  <div
                     key={index}
                     className={cx('item')}
                     onClick={() => {
                        handleClickItemBottomSideBar(elment);
                     }}
                  >
                     <elment.icon className={cx('icon')} />
                     <div>{elment.title}</div>
                  </div>
               ))}
            </div>
         </div>
         <div
            className={cx('pseudo')}
            ref={pseudoRef}
            onClick={() => {
               setShowNav((prev) => !prev);
            }}
         ></div>
      </>
   );
});

export default HeaderSidebar;
