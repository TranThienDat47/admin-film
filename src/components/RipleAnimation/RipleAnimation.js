import classNames from 'classnames/bind';
import styles from './RipleAmination.module.scss';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function RipleAnimation({ children, className, ...props }) {
   const wrapperRef = useRef(null);
   const [elementState, setElementState] = useState([]);
   const [isAnimating, setIsAnimating] = useState(false);

   const handleRipleAnimation = (e) => {
      if (isAnimating) {
         return;
      }

      const x = e.clientX - wrapperRef.current.getBoundingClientRect().left;
      const y = e.clientY - wrapperRef.current.getBoundingClientRect().top;

      const ripleElement = React.createElement('div', {
         key: Date.now(),
         className: cx('riple-animation'),
         style: { left: `${x}px`, top: `${y}px` },
      });

      setElementState((prev) => [...prev, ripleElement]);
      setIsAnimating(true);

      setTimeout(() => {
         setElementState((prev) => prev.slice(1));
         setIsAnimating(false);
      }, 400);
   };

   useEffect(() => {
      const clickHandler = (e) => {
         handleRipleAnimation(e);
         setTimeout(() => {
            setIsAnimating(false);
         }, 160);
      };

      wrapperRef.current.onmousedown = clickHandler;
   }, []);

   return (
      <div ref={wrapperRef} className={cx('wrapper', { [className]: className })} {...props}>
         {children}
         {elementState}
      </div>
   );
}

export default RipleAnimation;
