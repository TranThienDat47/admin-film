import classNames from 'classnames/bind';
import styles from './Selection.module.scss';

import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Option({ handleChooseOptions = () => {}, value = '', checked = false }) {
   return (
      <>
         <div onClick={handleChooseOptions} className={cx('option', checked ? 'checked' : '')}>
            {value}
         </div>
      </>
   );
}

export default Option;
