const fetchProductCurrentRequest = () => ({
   type: 'FETCH_PRODUCT_CURRENT_REQUEST',
   payload: {},
});

const fetchProductCurrentSuccess = ({
   productCurrent,
   ableLoadingMoreProduct,
   pageProductCurrent,
}) => ({
   type: 'FETCH_PRODUCT_CURRENT_SUCCESS',
   payload: { productCurrent, ableLoadingMoreProduct, pageProductCurrent },
});

const fetchProductCurrentFailure = ({ error }) => ({
   type: 'FETCH_PRODUCT_CURRENT_FAILURE',
   payload: { error },
});

export { fetchProductCurrentRequest, fetchProductCurrentSuccess, fetchProductCurrentFailure };
