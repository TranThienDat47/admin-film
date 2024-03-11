import classNames from 'classnames/bind';

import styles from './AlertStatusBottom.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function AlertStatusBottom({ className, message = '', visible = false, ...props }) {
   const [beforeShowState, setBeforeShowState] = useState(visible);
   const [showState, setShowState] = useState(visible);

   const wrapperRef = useRef();

   useEffect(() => {
      if (!beforeShowState) {
         if (wrapperRef.current) {
            let tempTranslateY = 0,
               tempInterval = null;
            const maxTranslate = wrapperRef.current.offsetHeight;

            tempInterval = setInterval(() => {
               tempTranslateY += 3;

               wrapperRef.current.style.transform = `translateY(${tempTranslateY}px)`;

               if (tempTranslateY >= maxTranslate + 6) {
                  clearInterval(tempInterval);

                  setShowState(false);
                  // wrapperRef.current.style.display = `none`;
               }
            }, 10);
         }
      } else {
         setShowState(true);

         setTimeout(() => {
            setBeforeShowState(false);
         }, 3000);
      }
   }, [beforeShowState]);

   useEffect(() => {
      setBeforeShowState(visible);
   }, [visible]);

   return (
      <>
         {showState && (
            <div ref={wrapperRef} className={cx('wrapper', { [className]: className })} {...props}>
               <div className={cx('message')}>{message}</div>
            </div>
         )}
      </>
   );
}

export default AlertStatusBottom;
