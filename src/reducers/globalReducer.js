export const initialState = {
   productCurrent: [],
   pageProductCurrent: 0,
   infoSearchProduct: { key: '', recently: 0 },
   maxLengthOfPageProduct: 10,
   ableLoadingMoreProduct: true,
   loadingProduct: true,

   productDetailCurrent: [],
   pageProductDetailCurrent: 0,
   infoSearchProductDetail: { key: '', recently: 0 },
   maxLengthOfPageProductDetail: 10,
   ableLoadingMoreProductDetail: true,
   loadingProductDetail: true,

   showCreateEpisodesState: false,

   showTempCreateEpisodesState: false,
   dataTempCreateEpisodesState: {},

   queueTaskAddVideoState: [{}], //{videoID, name, description, episodes, processingPercent: {curStep, maxStep, percent}}

   theme: {},
   language: null,
   error: null,
};

export const globalReducer = (state, action) => {
   const {
      type,
      payload: {
         theme,
         language,
         error,
         infoSearch,

         productCurrent,
         keyProductCurrent,
         pageProductCurrent,
         ableLoadingMoreProduct,
         maxLengthOfPageProduct,

         productDetailCurrent,
         keyProductDetailCurrent,
         pageProductDetailCurrent,
         ableLoadingMoreProductDetail,
         maxLengthOfPageProductDetail,

         showCreateEpisodesState,

         showTempCreateEpisodesState,
         dataTempCreateEpisodesState,

         queueTaskAddVideoState,
      },
   } = action;

   switch (type) {
      //product
      case 'FETCH_PRODUCT_CURRENT_REQUEST':
         return {
            ...state,
            loadingProduct: true,
            keyProductCurrent,
         };
      case 'FETCH_PRODUCT_CURRENT_SUCCESS':
         return {
            ...state,
            loadingProduct: false,
            productCurrent,
            ableLoadingMoreProduct,
            pageProductCurrent,
         };
      case 'FETCH_PRODUCT_CURRENT_FAILURE':
         return {
            ...state,
            loadingProduct: false,
            error,
         };

      //product detai;
      case 'FETCH_PRODUCT_DETAIL_CURRENT_REQUEST':
         return {
            ...state,
            loadingProductDetail: true,
            keyProductDetailCurrent,
         };
      case 'FETCH_PRODUCT_DETAIL_CURRENT_SUCCESS':
         return {
            ...state,
            loadingProductDetail: false,
            productDetailCurrent,
            ableLoadingMoreProductDetail,
            pageProductDetailCurrent,
         };
      case 'FETCH_PRODUCT_DETAIL_CURRENT_FAILURE':
         return {
            ...state,
            loadingProductDetail: false,
            error,
         };

      case 'SET_SHOW_CREATE_EPISODES':
         return {
            ...state,
            showCreateEpisodesState,
         };

      case 'SET_SHOW_TEMP_CREATE_EPISODES':
         return {
            ...state,
            showTempCreateEpisodesState,
         };

      case 'SET_DATA_TEMP_CREATE_EPISODES':
         return {
            ...state,
            dataTempCreateEpisodesState,
         };

      case 'PUSH_QUEUE_TASK_ADD_VIDEO':
         return {
            ...state,
            queueTaskAddVideoState,
         };
      default:
         return state;
   }
};
