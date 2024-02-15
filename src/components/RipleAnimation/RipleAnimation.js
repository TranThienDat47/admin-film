import classNames from 'classnames/bind';
import styles from './RipleAmination.module.scss';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function RipleAnimation({ children, className, light = false, disable = false, ...props }) {
   const wrapperRef = useRef(null);
   const [elementState, setElementState] = useState([]);
   const [isAnimating, setIsAnimating] = useState(false);

   const [isClickState, setIsClickState] = useState(false);

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
   };

   useEffect(() => {
      const clickHandler = (e) => {
         handleRipleAnimation(e);
         setIsClickState(true);
      };

      wrapperRef.current.onmousedown = clickHandler;
   }, []);

   useEffect(() => {
      window.onmouseup = () => {
         if (isClickState) {
            setTimeout(() => {
               setElementState((prev) => prev.slice(1));
               setIsAnimating(false);
            }, 200);
            setTimeout(() => {
               setIsAnimating(false);
            }, 160);
            setIsClickState(false);
         }
      };
   }, [isClickState]);

   return (
      <div
         ref={wrapperRef}
         className={cx('wrapper', { [className]: className, disable, light })}
         {...props}
      >
         {children}
         {elementState}
      </div>
   );
}

export default RipleAnimation;
