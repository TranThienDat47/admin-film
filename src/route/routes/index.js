import config from '~/config';

import Home from '~/views/Home';

import { Fragment } from 'react';
import ProductLayout from '~/layout/ProductLayout/ProductLayout';
import Movie from '~/views/products/Movie';
import Short from '~/views/products/Short';
import ProductDetail from '~/views/product_details/ProductDetail';
import ProductDetailLayout from '~/layout/ProductDetailLayout';

const publicRoutes = [
   { path: config.routes.home, component: Home },
   {
      path: config.routes.product.movie,
      component: Movie,
      layout: ProductLayout,
   },
   { path: config.routes.product.short, component: Short, layout: ProductLayout },
   {
      path: config.routes.product_detail.detail,
      component: ProductDetail,
      layout: ProductDetailLayout,
   },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
