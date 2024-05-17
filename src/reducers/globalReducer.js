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

   showCreateMovieState: false,

   showCreateEpisodesState: false,

   showTempCreateEpisodesState: false,
   dataTempCreateEpisodesState: {},

   queueTaskAddVideoState: [{}], //{videoID, name, description, episodes, processingPercent: {curStep, maxStep, percent}}

   theme: {},
   language: null,
   error: null,
};

const cases = [
   //product
   {
      type: 'FETCH_PRODUCT_CURRENT_REQUEST',
      returnData: (state, { keyProductCurrent }) => ({
         ...state,
         loadingProduct: true,
         keyProductCurrent,
      }),
   },
   {
      type: 'FETCH_PRODUCT_CURRENT_SUCCESS',
      returnData: (state, { productCurrent, ableLoadingMoreProduct, pageProductCurrent }) => ({
         ...state,
         loadingProduct: false,
         productCurrent,
         ableLoadingMoreProduct,
         pageProductCurrent,
      }),
   },
   {
      type: 'FETCH_PRODUCT_CURRENT_FAILURE',
      returnData: (state, { error }) => ({
         ...state,
         loadingProduct: false,
         error,
      }),
   },

   //product detail
   {
      type: 'FETCH_PRODUCT_DETAIL_CURRENT_REQUEST',
      returnData: (state, { keyProductDetailCurrent }) => ({
         ...state,
         loadingProductDetail: true,
         keyProductDetailCurrent,
      }),
   },
   {
      type: 'FETCH_PRODUCT_DETAIL_CURRENT_SUCCESS',
      returnData: (state, { productDetailCurrent, ableLoadingMoreProductDetail, pageProductDetailCurrent }) => ({
         ...state,
         loadingProductDetail: false,
         productDetailCurrent,
         ableLoadingMoreProductDetail,
         pageProductDetailCurrent,
      }),
   },
   {
      type: 'FETCH_PRODUCT_DETAIL_CURRENT_FAILURE',
      returnData: (state, { error }) => ({
         ...state,
         loadingProductDetail: false,
         error,
      }),
   },

   //show create movie state
   {
      type: 'SET_SHOW_CREATE_MOVIE',
      returnData: (state, { showCreateMovieState }) => ({
         ...state,
         showCreateMovieState,
      }),
   },

   //show create episodes state
   {
      type: 'SET_SHOW_CREATE_EPISODES',
      returnData: (state, { showCreateEpisodesState }) => ({
         ...state,
         showCreateEpisodesState,
      }),
   },

   //show temp create episodes state
   {
      type: 'SET_SHOW_TEMP_CREATE_EPISODES',
      returnData: (state, { showTempCreateEpisodesState }) => ({
         ...state,
         showTempCreateEpisodesState,
      }),
   },

   //data temp create episodes state
   {
      type: 'SET_DATA_TEMP_CREATE_EPISODES',
      returnData: (state, { dataTempCreateEpisodesState }) => ({
         ...state,
         dataTempCreateEpisodesState,
      }),
   },

   //queue task add video state
   {
      type: 'PUSH_QUEUE_TASK_ADD_VIDEO',
      returnData: (state, { queueTaskAddVideoState }) => ({
         ...state,
         queueTaskAddVideoState,
      }),
   },
];

export const globalReducer = (state, action) => {
   const selectedCase = cases.find((item) => item.type === action.type);

   if (selectedCase) {
      return selectedCase.returnData(state, action.payload);
   } else {
      return state;
   }
};
