import { createContext, useReducer, useEffect, useState } from 'react';

import ProductServices from '~/services/ProductServices';
import { globalReducer, initialState } from '~/reducers/globalReducer';

import {
   fetchProductCurrentRequest,
   fetchProductCurrentSuccess,
   fetchProductCurrentFailure,
} from '../actionCreators/global';

const GlobalContext = createContext();

export { GlobalContext };

const GlobalContextProvider = ({ children }) => {
   const [globalState, dispatch] = useReducer(globalReducer, initialState);

   const loadProduct = async (recently = 1) => {
      dispatch(fetchProductCurrentRequest());

      await ProductServices.get({
         skip: globalState.maxLengthOfPageProduct * globalState.pageProductCurrent,
         limit: globalState.maxLengthOfPageProduct,
         key: '',
         recently,
      })
         .then((data) => {
            console.log(data);
            if (data.success) {
               dispatch({
                  type: 'FETCH_PRODUCT_CURRENT_SUCCESS',
                  payload: {
                     productCurrent: data.products,
                     ableLoadingMoreProduct: false,
                     pageProductCurrent: globalState.pageProductCurrent + 1,
                  },
               });
            } else {
               dispatch(fetchProductCurrentFailure(data.message));
            }
         })
         .catch((error) => {
            dispatch(fetchProductCurrentFailure(error.message));
         });
   };

   const globalContextData = { globalState, loadProduct };

   return <GlobalContext.Provider value={globalContextData}> {children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
