import { createContext, useReducer, useEffect, useState } from 'react';

import ProductServices from '~/services/ProductServices';
import { globalReducer, initialState } from '~/reducers/globalReducer';

import {
   fetchProductCurrentRequest,
   fetchProductCurrentSuccess,
   fetchProductCurrentFailure,
   setShowCreateEpisodesCreator,
   setQueueTaskAddVideoCreator,
   fetchProductDetailCurrentSuccess,
   fetchProductDetailCurrentFailure,
   fetchProductDetailCurrentRequest,
   setShowTempCreateEpisodesCreator,
   setDataTempCreateEpisodesCreator,
} from '../actionCreators/global';
import ProductDetailServices from '~/services/ProductDetailServices';

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
            if (data.success) {
               dispatch(
                  fetchProductCurrentSuccess({
                     productCurrent: data.products,
                     ableLoadingMoreProduct: false,
                     pageProductCurrent: globalState.pageProductCurrent + 1,
                  }),
               );
            } else {
               dispatch(fetchProductCurrentFailure(data.message));
            }
         })
         .catch((error) => {
            dispatch(fetchProductCurrentFailure(error.message));
         });
   };

   const getProductDetail = async (productID = -1) => {
      dispatch(fetchProductDetailCurrentRequest());

      await ProductDetailServices.get({ product_id: '6603db4674ce368028f6974f' })
         .then((data) => {
            if (data.success) {
               console.log(data);
               dispatch(
                  fetchProductDetailCurrentSuccess({
                     productDetailCurrent: data.product_details,
                     ableLoadingMoreProductDetail: false,
                     pageProductDetailCurrent: globalState.pageProductDetailCurrent + 1,
                  }),
               );
            } else {
               dispatch(fetchProductDetailCurrentFailure(data.message));
            }
         })
         .catch((error) => {
            dispatch(fetchProductDetailCurrentFailure(error.message));
         });
   };

   const setShowCreateEpisodes = (showCreateEpisodesState) => {
      dispatch(setShowCreateEpisodesCreator(showCreateEpisodesState));
   };

   const setShowTempCreateEpisodes = (showTempCreateEpisodesState) => {
      dispatch(setShowTempCreateEpisodesCreator(showTempCreateEpisodesState));
   };

   const setDataTempCreateEpisodes = (dataTempCreateEpisodesState) => {
      dispatch(setDataTempCreateEpisodesCreator(dataTempCreateEpisodesState));
   };

   const setQueueTaskAddVideo = (queueTaskAddVideoState) => {
      dispatch(setQueueTaskAddVideoCreator(queueTaskAddVideoState));
   };

   const globalContextData = {
      globalState,
      loadProduct,
      setShowCreateEpisodes,
      setShowTempCreateEpisodes,
      setDataTempCreateEpisodes,
      setQueueTaskAddVideo,
      getProductDetail,
   };

   return <GlobalContext.Provider value={globalContextData}> {children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
