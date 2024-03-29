import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { memo, useRef, useState } from 'react';

const cx = classNames.bind(styles);
const defaultFn = () => {};

// {
//    title: <div className={cx('title')}>Giao diện: Giao diện sáng</div>,
//    left_icon: <AiOutlineThunderbolt className={cx('icon')} />,
//    right_icon: <AiOutlineRight className={cx('icon')} />,
//    children: {
//       title: <div className={cx('title')}>Giao diện</div>,
//       data: [
//          {
//             title: <div className={cx('title')}>Giao diện sáng</div>,
//             left_icon: <AiOutlineCheck className={cx('icon')} />,
//          },
//          {
//             title: <div className={cx('title')}>Giao diện tối</div>,
//             left_icon: <div className={cx('icon')}></div>,
//          },
//       ],
//    },
//    separate: true,
// },
function Menu({ children, items = [], hideOnClick = false, className }) {
   const [history, setHistory] = useState([{ data: items }]);
   const [visibleState, setVisibleState] = useState(false);

   const wrapperRef = useRef();
   const current = history[history.length - 1];

   const renderItem = () => {
      return current.data.map((item, index) => {
         const isParent = !!item.children;
         return (
            <MenuItem
               key={index}
               data={item}
               onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (isParent) {
                     setHistory((prev) => [...prev, item.children]);
                  } else {
                     if (item.onChange) item.onChange();

                     if (history.length === 1) {
                        setVisibleState(false);
                     } else {
                        setHistory((prev) => prev.slice(0, prev.length - 1));
                     }
                  }
               }}
            />
         );
      });
   };

   const renderResult = (attrs) => (
      <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
         <PopperWrapper className={cx('menu-wrapper', className)}>
            {history.length > 1 && (
               <Header
                  title={current.title}
                  onBack={() => {
                     setHistory((prev) => prev.slice(0, prev.length - 1));
                  }}
               />
            )}
            <div className={cx('menu-body')}> {renderItem()}</div>
         </PopperWrapper>
      </div>
   );

   const handleResetMenu = () => {
      setHistory((prev) => prev.slice(0, 1));
   };

   return (
      <div
         onClick={() => {
            setVisibleState(true);
         }}
      >
         <Tippy
            ref={wrapperRef}
            interactive
            visible={visibleState}
            offset={[12, 8]}
            placement="bottom-end"
            onClickOutside={() => {
               setVisibleState(false);
            }}
            onHide={handleResetMenu}
            render={renderResult}
         >
            {children}
         </Tippy>
      </div>
   );
}

Menu.propTypes = {
   children: PropTypes.node.isRequired,
   onChange: PropTypes.func,
   hideOnClick: PropTypes.bool,
   items: PropTypes.array,
   className: PropTypes.string,
};

export default memo(Menu);
