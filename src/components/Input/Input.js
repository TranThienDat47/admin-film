import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const cx = classNames.bind(styles);

const MAX_LENTH_INPUT = 120000;

const Input = forwardRef(
   (
      {
         className,
         title = '',
         maxRow = 1,
         row = 1,
         placeholder = '',
         value = '',
         downTheLine = true,
         maxLength = -1,
         required = false,
         onSubmit = () => {},
         onInput = () => {},
         onFocus = () => {},
         ...props
      },
      ref,
   ) => {
      const [valueState, setValueState] = useState(value);

      const [statusState, setStatusState] = useState(0);
      const inputRef = useRef();
      const prevStatusRef = useRef(0);

      const handleTypingInput = (e) => {
         if (inputRef.current.textContent.length <= MAX_LENTH_INPUT) {
            setValueState(e.target.textContent);
         } else {
            if (valueState.length === MAX_LENTH_INPUT) {
               e.target.textContent = valueState;
               setFocusAtEnd();
            } else {
               setValueState(e.target.textContent.substring(0, MAX_LENTH_INPUT));

               e.target.textContent = valueState;
            }
         }
      };

      useEffect(() => {
         if (maxLength >= 0 && valueState.length > parseInt(maxLength)) setStatusState(2);
         else setStatusState(prevStatusRef.current);
      }, [valueState]);

      useEffect(() => {
         if (inputRef.current.textContent.length <= MAX_LENTH_INPUT) {
            inputRef.current.textContent = value;
         } else inputRef.current.textContent = value.substring(0, MAX_LENTH_INPUT - 1);
      }, [value]);

      useImperativeHandle(ref, () => ({
         setDefaultInput: () => {
            setFocusAtEnd();
            inputRef.current.textContent = '';
         },
      }));

      const setFocusAtEnd = () => {
         const range = document.createRange();
         const selection = window.getSelection();

         range.selectNodeContents(inputRef.current);
         range.collapse(false);
         selection.removeAllRanges();
         selection.addRange(range);

         inputRef.current.focus();
      };

      return (
         <div
            onClick={() => {
               inputRef.current.focus();
            }}
            className={cx('wrapper', { [className]: className }, statusState === 1 ? 'is_focus' : statusState === 2 ? 'invalid' : '')}
            {...props}
            ref={ref}
         >
            <div className={cx('inner')}>
               <div className={cx('title')}>
                  {title} {required && '(bắt buộc)'}
               </div>
               <div
                  ref={inputRef}
                  className={cx('input')}
                  placeholder={placeholder}
                  onKeyDown={(event) => {
                     if (!downTheLine && (event.key === 'Enter' || event.keyCode === 13)) {
                        event.preventDefault();
                        onSubmit();
                     }
                  }}
                  onFocus={() => {
                     if (statusState !== 2) {
                        prevStatusRef.current = 1;
                        setStatusState(1);
                     }
                  }}
                  onBlur={() => {
                     prevStatusRef.current = 0;
                     if (statusState !== 2) setStatusState(0);
                  }}
                  contentEditable="true"
                  onInput={(e) => {
                     handleTypingInput(e);
                     onInput(e);
                  }}
                  style={{ maxHeight: `${maxRow * 23}px`, height: `${row * 23}px` }}
               />
               {maxLength > 0 && (
                  <div className={cx('footer')}>
                     <div className={cx('max-length')}>
                        {valueState ? valueState.length : 0} / {maxLength}
                     </div>
                  </div>
               )}
            </div>
         </div>
      );
   },
);

export default React.memo(Input);
