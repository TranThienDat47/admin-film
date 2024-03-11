import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Header from '../compoments/Header';
import styles from './ProductDetailLayout.module.scss';
import SidebarProductDetail from '../compoments/SidebarProductDetail';

const cx = classNames.bind(styles);

function ProductDetailLayout({ children }) {
   return (
      <div className={cx('wrapper')}>
         <Header />
         <SidebarProductDetail />
         <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

ProductDetailLayout.propTypes = {
   children: PropTypes.node.isRequired,
};

export default ProductDetailLayout;
