import { useEffect, useRef, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import { AuthContext } from '~/contexts/auth';

import config from '~/config';
import imgs from '~/assets/img';
import Search from '~/components/Search';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import { RiVideoAddLine } from 'react-icons/ri';

import { BiUserCircle } from 'react-icons/bi';
import {
   AiOutlineLogout,
   AiOutlineExclamationCircle,
   AiOutlineQuestionCircle,
   AiOutlineThunderbolt,
   AiOutlineRight,
   AiOutlineCheck,
   AiOutlineMenu,
} from 'react-icons/ai';
import { ImFilm } from 'react-icons/im';

import { IoLanguageOutline } from 'react-icons/io5';
import { RiSettingsLine } from 'react-icons/ri';

import { RiVideoUploadLine } from 'react-icons/ri';
import { MdOutlineVideoSettings } from 'react-icons/md';
import CreateMovie from '~/views/components/CreateMovie';
import CreateEpisodes from '~/views/components/CreateEpisodes';
import { GlobalContext } from '~/contexts/global';
import StackAddVideo from '../../WrapperLayout/StackAddVideo/StackAddVideo';

const cx = classNames.bind(styles);

function Header() {
   const {
      authState: { isAuthenticated, isVerify, user },
   } = useContext(AuthContext);

   const {
      globalState: { showCreateEpisodesState },
      setShowCreateEpisodes,
   } = useContext(GlobalContext);

   const [showCreateState, setShowCreateState] = useState(0);
   const [showNotification, setShowNotification] = useState(false);
   const [dataInit, setDataInit] = useState([
      {
         title: <div className={cx('title')}>Cài đặt</div>,
         left_icon: <RiSettingsLine className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
      },
      {
         title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
         left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
         children: {
            title: <div className={cx('title')}>Giao diện</div>,
            data: [
               {
                  title: <div className={cx('title')}>Giao diện sáng</div>,
                  left_icon: <AiOutlineCheck className={cx('icon')} />,
               },
               {
                  title: <div className={cx('title')}>Giao diện tối</div>,
                  left_icon: <div className={cx('icon')}></div>,
               },
            ],
         },
         separate: true,
      },
      {
         title: <div className={cx('title')}>Ngôn ngữ: Tiếng Việt (VN)</div>,
         left_icon: <IoLanguageOutline className={cx('icon')} />,
         right_icon: <AiOutlineRight className={cx('icon')} />,
         children: {
            title: <div className={cx('title')}>Ngôn ngữ</div>,
            data: [
               {
                  title: <div className={cx('title')}>Tiếng Việt (VN)</div>,
                  left_icon: <AiOutlineCheck className={cx('icon')} />,
               },
            ],
         },
      },
      {
         title: <div className={cx('title')}>Trợ giúp</div>,
         left_icon: <AiOutlineQuestionCircle className={cx('icon')} />,
         separate: true,
      },
      {
         title: <div className={cx('title')}>Đóng góp ý kiến</div>,
         left_icon: <AiOutlineExclamationCircle className={cx('icon')} />,
      },
   ]);

   const [dataInitCreate, setDataInitCreate] = useState([
      {
         title: <div className={cx('title')}>Tạo phim mới</div>,
         left_icon: <RiVideoUploadLine className={cx('icon')} />,
         onChange: () => {
            setShowCreateState(1);
         },
      },

      {
         title: <div className={cx('title')}>Tải video ngắn lên</div>,
         left_icon: <MdOutlineVideoSettings className={cx('icon')} />,
         onChange: () => {
            setShowCreateState(2);
         },
      },
   ]);

   // {
   //    title: <div className={cx('title')}>Thêm tập phim</div>,
   //    left_icon: <ImFilm className={cx('icon')} />,
   //    onChange: () => {
   //       setShowCreateState(3);
   //    },
   // },

   const notificationResultRef = useRef();

   useEffect(() => {
      if (user) {
         setDataInit([
            {
               title: (
                  <div className={cx('title')}>
                     <p className={cx('account-name')}>{user._name}</p>
                     <p className={cx('account-email')}>{user.username}</p>
                  </div>
               ),
               left_icon: (
                  <img
                     className={cx('avt', 'account-avt')}
                     src={user.img || imgs.noImage}
                     onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imgs.noImage;
                     }}
                     alt=""
                  />
               ),
            },
            {
               title: <div className={cx('title')}>Tài khoản của bạn</div>,
               left_icon: <BiUserCircle className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Cài đặt</div>,
               left_icon: <RiSettingsLine className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
            },
            {
               title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
               left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
               children: {
                  title: <div className={cx('title')}>Giao diện</div>,
                  data: [
                     {
                        title: <div className={cx('title')}>Giao diện sáng</div>,
                        left_icon: <AiOutlineCheck className={cx('icon')} />,
                     },
                     {
                        title: <div className={cx('title')}>Giao diện tối</div>,
                        left_icon: <div className={cx('icon')}></div>,
                     },
                  ],
               },
               separate: true,
            },
            {
               title: <div className={cx('title')}>Ngôn ngữ: Tiếng Việt (VN)</div>,
               left_icon: <IoLanguageOutline className={cx('icon')} />,
               right_icon: <AiOutlineRight className={cx('icon')} />,
               children: {
                  title: <div className={cx('title')}>Ngôn ngữ</div>,
                  data: [
                     {
                        title: <div className={cx('title')}>Tiếng Việt (VN)</div>,
                        left_icon: <AiOutlineCheck className={cx('icon')} />,
                     },
                  ],
               },
            },
            {
               to: '/logout',
               title: <div className={cx('title')}>Đăng xuất</div>,
               left_icon: <AiOutlineLogout className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Trợ giúp</div>,
               left_icon: <AiOutlineQuestionCircle className={cx('icon')} />,
               separate: true,
            },
            {
               title: <div className={cx('title')}>Đóng góp ý kiến</div>,
               left_icon: <AiOutlineExclamationCircle className={cx('icon')} />,
            },
         ]);
      }
   }, [user]);

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (notificationResultRef.current && !notificationResultRef.current.parentNode.contains(e.target)) {
            setShowNotification(false);
         }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, [notificationResultRef]);

   const handleTemp = () => {};

   return (
      <>
         <header className={cx('wrapper')}>
            <div className={cx('nav')}>
               <AiOutlineMenu className={cx('nav-icon')} />
               <a href={config.routes.home} className={cx('logo-link')}>
                  <img src={imgs.logo} alt="Blog" />
               </a>
            </div>

            <div className={cx('search')}>
               <Search />
            </div>

            <div className={cx('infor')}>
               <div className={cx('infor-icon')}>
                  <Menu items={dataInitCreate} key={'000'} hideOnClick={true} className={cx('wrapper-create')}>
                     <div>
                        <Button className={cx('infor-icon-inner')} ripleAnimation medium leftIcon={<RiVideoAddLine className={cx('icon-create')} />} outline>
                           Tạo
                        </Button>
                     </div>
                  </Menu>
               </div>
               <div className={cx('infor-icon')}>
                  <Menu items={dataInit} key={dataInit} hideOnClick={true} className={cx('wrapper-account')}>
                     <button className={cx('user')}>
                        <img
                           src=""
                           onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = imgs.noImage;
                           }}
                           alt="Logo"
                           className={cx('avt')}
                        />
                     </button>
                  </Menu>
               </div>
            </div>
         </header>
         {/* <HeaderSidebar ref={childRef} /> */}
         <CreateMovie
            handleClose={() => {
               setShowCreateState(0);
            }}
            hidden={showCreateState !== 1}
         />
      </>
   );
}

export default Header;
