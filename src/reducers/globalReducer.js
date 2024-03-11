export const initialState = {
   productCurrent: [],
   pageProductCurrent: 0,
   infoSearchProduct: { key: '', recently: 0 },
   maxLengthOfPageProduct: 10,
   ableLoadingMoreProduct: true,
   loadingProduct: true,

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
      },
   } = action;

   switch (type) {
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
      default:
         return state;
   }
};
