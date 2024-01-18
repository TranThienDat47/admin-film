import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Header from '../compoments/Header';
import styles from './Default.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
   return (
      <div className={cx('wrapper')}>
         <Header />
         <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

DefaultLayout.propTypes = {
   children: PropTypes.node.isRequired,
};

export default DefaultLayout;
