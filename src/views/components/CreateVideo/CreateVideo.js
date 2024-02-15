import classNames from 'classnames/bind';
import styles from './CreateVideo.module.scss';

import { HiOutlineXMark } from 'react-icons/hi2';
import Button from '~/components/Button';
import RipleAnimation from '~/components/RipleAnimation';

const cx = classNames.bind(styles);

function CreateVideo() {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <div className={cx('header')}>
                  <div className={cx('header-left')}>Phim hay qua</div>
                  <div className={cx('header-right')}>
                     <div className={cx('')}></div>
                     <div className={cx('header-right-icon')}>
                        <HiOutlineXMark></HiOutlineXMark>
                     </div>
                  </div>
               </div>
               <div className={cx('content')}>
                  <div className={cx('content-top')}></div>
                  <div className={cx('content-bottom')}></div>
               </div>

               <div className={cx('footer')}>
                  <div className={cx('footer-left')}></div>
                  <div className={cx('footer-right')}>
                     <div
                        style={{
                           borderRadius: '13px',
                           overflow: 'hidden',
                        }}
                     >
                        <RipleAnimation>
                           <Button>
                              <span style={{ color: 'var(--text-bland)' }}>Quay lại</span>
                           </Button>
                        </RipleAnimation>
                     </div>
                     <div style={{ borderRadius: '13px', overflow: 'hidden', marginLeft: '9px' }}>
                        <Button ripleAnimation ripleAnimationLight primary>
                           Tiếp
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('modal')}></div>
         </div>
      </>
   );
}

export default CreateVideo;
