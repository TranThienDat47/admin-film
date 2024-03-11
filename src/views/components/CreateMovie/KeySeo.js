import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './CreateMovie.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FaRegCircleXmark } from 'react-icons/fa6';

const cx = classNames.bind(styles);

const KeySeo = forwardRef(
   ({ onCreateKey = () => {}, maxNumOfKey = 0, onChangeValue = () => {} }, ref) => {
      const [listKeyState, setListKeyState] = useState([]); //{id:1, value: "haha"}

      const valueRef = useRef();

      const childRef = useRef(null);

      const handleSubmitValue = (e) => {
         setListKeyState((prev) => [...prev, { id: prev.length, value: valueRef.current }]);
         childRef.current.setDefaultInput();
      };

      useEffect(() => {
         onChangeValue();
      }, [listKeyState]);

      useImperativeHandle(ref, () => ({
         getListKeySeo: () => {
            var result = '';

            listKeyState.forEach((element) => {
               result += `#${element.value}`;
            });

            return result;
         },
      }));

      return (
         <>
            <div ref={ref} className={cx('inner-content-key_seo-create')}>
               <Input
                  className={cx('inner-content-key_seo-input')}
                  maxRow={1}
                  row={1}
                  downTheLine={false}
                  title={`Từ khóa tìm kiếm (tối đa ${maxNumOfKey} từ khóa)`}
                  placeholder="Từ khóa tìm kiếm"
                  maxLength={45}
                  onInput={(e) => {
                     valueRef.current = e.target.textContent;
                  }}
                  onSubmit={(e) => {
                     handleSubmitValue(e);
                  }}
                  ref={childRef}
               />
               <div style={{ overflow: 'hidden', borderRadius: '9px' }}>
                  <Button
                     ripleAnimation
                     outline
                     medium
                     borderColor="var(--link-color)"
                     borderRadius="9px"
                     onClick={handleSubmitValue}
                     disable={
                        maxNumOfKey >= 0
                           ? listKeyState && +listKeyState.length < +maxNumOfKey
                              ? false
                              : true
                           : true
                     }
                  >
                     <span style={{ color: 'var(--link-color)', fontSize: '1.4' }}>Tạo</span>
                  </Button>
               </div>
            </div>
            <div className={cx('inner-content-key_seo-list')}>
               {listKeyState &&
                  listKeyState.map((element, index) => (
                     <div key={index} className={cx('inner-content-key_seo-item')}>
                        <span>#{element.value}</span>
                        <div
                           onClick={() => {
                              setListKeyState((prev) => prev.filter((item) => item !== element));
                           }}
                           className={cx('inner-content-key_seo-item-icon')}
                           nametooltip={'Loại bỏ'}
                        >
                           <FaRegCircleXmark></FaRegCircleXmark>
                        </div>
                     </div>
                  ))}
            </div>
         </>
      );
   },
);

export default KeySeo;
