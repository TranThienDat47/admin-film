import classNames from 'classnames/bind';

import styles from './LoadingFetch.module.scss';

const cx = classNames.bind(styles);

function LoadingFetch({ className, isLoading = false, ...props }) {
   return (
      <>
         {isLoading && (
            <div className={cx('wrapper', { [className]: className })} {...props}>
               <div className={cx('inner')}>
                  <div className={cx('main')}></div>
               </div>
            </div>
         )}
      </>
   );
}

export default LoadingFetch;
