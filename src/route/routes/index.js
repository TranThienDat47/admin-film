import config from '~/config';

import Home from '~/views/Home';

import { Fragment } from 'react';
import NoSidebarLayout from '~/layout/NoSidebarLayout';
import ProductLayout from '~/layout/ProductLayout/ProductLayout';
import Movie from '~/views/products/Movie';
import Short from '~/views/products/Short';

const publicRoutes = [
   { path: config.routes.home, component: Home },
   {
      path: config.routes.product.movie,
      component: Movie,
      layout: ProductLayout,
   },
   { path: config.routes.product.short, component: Short, layout: ProductLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
