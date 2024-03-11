import classNames from 'classnames/bind';
import styles from './Selection.module.scss';
import RipleAnimation from '../RipleAnimation';

import { MdArrowDropDown } from 'react-icons/md';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Option from './Option';

const cx = classNames.bind(styles);

const Selection = forwardRef(
   (
      {
         defaultValue = 'value',
         listOptions = [{ value: 'value', checked: false }],
         className,
         searchable = false,
         onChangeOption = () => {},
         ...props
      },
      ref,
   ) => {
      const wrapperRef = useRef();
      const optionsRef = useRef();
      const [listOptionsState, setListOptionsState] = useState(listOptions);

      const isChecked = listOptionsState.find((element) => element.checked === true);
      const isCheckValue = listOptionsState.find(
         (element) =>
            element.value.trim().toLocaleLowerCase() === defaultValue.trim().toLocaleLowerCase(),
      );

      const [valueState, setValueState] = useState(
         isChecked && isChecked.checked ? isChecked.value : defaultValue,
      );

      const handleShowOptions = (e) => {
         optionsRef.current.style.visibility = 'visible';
         wrapperRef.current.style.zIndex = +wrapperRef.current.style.zIndex + 10;
      };

      const handleChooseOptions = (e, data) => {
         e.preventDefault();
         e.stopPropagation();
         optionsRef.current.style.visibility = 'hidden';
         if (+wrapperRef.current.style.zIndex >= 10)
            wrapperRef.current.style.zIndex = +wrapperRef.current.style.zIndex - 10;

         setValueState(data.value);

         setListOptionsState((prevListOptionsState) =>
            prevListOptionsState.map((option) => ({
               ...option,
               checked: option.value === data.value,
            })),
         );
      };

      useEffect(() => {
         function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
               optionsRef.current.style.visibility = 'hidden';
               if (+wrapperRef.current.style.zIndex >= 10)
                  wrapperRef.current.style.zIndex = +wrapperRef.current.style.zIndex - 10;
            }
         }

         document.addEventListener('mousedown', handleClickOutside);
         document.addEventListener('touchstart', handleClickOutside);

         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
         };
      }, [wrapperRef]);

      useEffect(() => {
         onChangeOption();
      }, [listOptionsState]);

      useImperativeHandle(ref, () => ({
         getOptionChoose: () => {
            return listOptionsState.find((element) => element.checked === true);
         },
      }));

      return (
         <div ref={ref}>
            <div
               ref={wrapperRef}
               onClick={handleShowOptions}
               className={cx('wrapper', { [className]: className })}
               {...props}
            >
               <RipleAnimation
                  style={{
                     borderRadius: '9px',
                  }}
               >
                  <div className={cx('inner')}>
                     <div className={cx('combobox-left')}>{valueState}</div>
                     <div className={cx('combobox-right')}>
                        <MdArrowDropDown></MdArrowDropDown>
                     </div>
                  </div>
               </RipleAnimation>
               <div ref={optionsRef} className={cx('select')}>
                  {listOptionsState.map((element, index) => (
                     <Option
                        key={`${element.value}` + `${index}`}
                        handleChooseOptions={(e) => {
                           handleChooseOptions(e, element);
                        }}
                        checked={element.checked}
                        value={element.value}
                     ></Option>
                  ))}
               </div>
            </div>
         </div>
      );
   },
);

export default Selection;
