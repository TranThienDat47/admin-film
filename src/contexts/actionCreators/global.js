//product
const fetchProductCurrentRequest = () => ({
   type: 'FETCH_PRODUCT_CURRENT_REQUEST',
   payload: {},
});

const fetchProductCurrentSuccess = ({ productCurrent, ableLoadingMoreProduct, pageProductCurrent }) => ({
   type: 'FETCH_PRODUCT_CURRENT_SUCCESS',
   payload: { productCurrent, ableLoadingMoreProduct, pageProductCurrent },
});

const fetchProductCurrentFailure = ({ error }) => ({
   type: 'FETCH_PRODUCT_CURRENT_FAILURE',
   payload: { error },
});

//product detail
const fetchProductDetailCurrentRequest = () => ({
   type: 'FETCH_PRODUCT_DETAIL_CURRENT_REQUEST',
   payload: {},
});

const fetchProductDetailCurrentSuccess = ({ productDetailCurrent, ableLoadingMoreProductDetail, pageProductDetailCurrent }) => ({
   type: 'FETCH_PRODUCT_DETAIL_CURRENT_SUCCESS',
   payload: { productDetailCurrent, ableLoadingMoreProductDetail, pageProductDetailCurrent },
});

const fetchProductDetailCurrentFailure = ({ error }) => ({
   type: 'FETCH_PRODUCT_DETAIL_CURRENT_FAILURE',
   payload: { error },
});

//create
const setShowCreateEpisodesCreator = (showCreateEpisodesState) => ({
   type: 'SET_SHOW_CREATE_EPISODES',
   payload: {
      showCreateEpisodesState,
   },
});

//task add video
const setQueueTaskAddVideoCreator = (queueTaskAddVideoState) => ({
   type: 'PUSH_QUEUE_TASK_ADD_VIDEO',
   payload: {
      queueTaskAddVideoState,
   },
});

//createEpisodes
const setShowTempCreateEpisodesCreator = (showTempCreateEpisodesState) => ({
   type: 'SET_SHOW_TEMP_CREATE_EPISODES',
   payload: {
      showTempCreateEpisodesState,
   },
});

const setDataTempCreateEpisodesCreator = (dataTempCreateEpisodesState) => ({
   type: 'SET_DATA_TEMP_CREATE_EPISODES',
   payload: {
      dataTempCreateEpisodesState,
   },
});

export {
   fetchProductCurrentRequest,
   fetchProductCurrentSuccess,
   fetchProductCurrentFailure,
   setShowCreateEpisodesCreator,
   setQueueTaskAddVideoCreator,
   fetchProductDetailCurrentRequest,
   fetchProductDetailCurrentSuccess,
   fetchProductDetailCurrentFailure,
   setShowTempCreateEpisodesCreator,
   setDataTempCreateEpisodesCreator,
};
