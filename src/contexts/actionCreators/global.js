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

const setShowCreateEpisodesCreator = (showCreateEpisodesState) => ({
   type: 'SET_SHOW_CREATE_EPISODES',
   payload: {
      showCreateEpisodesState,
   },
});

const setQueueTaskAddVideoCreator = (queueTaskAddVideoState) => ({
   type: 'PUSH_QUEUE_TASK_ADD_VIDEO',
   payload: {
      queueTaskAddVideoState,
   },
});

export { fetchProductCurrentRequest, fetchProductCurrentSuccess, fetchProductCurrentFailure, setShowCreateEpisodesCreator, setQueueTaskAddVideoCreator };
