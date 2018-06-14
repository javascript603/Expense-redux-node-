// ./react-redux-client/src/reducers/productsReducer.js
const INITIAL_STATE = {
    products:[],
    isFetching: false,
    error: null,
    status:400,
    message:null,
  }
  
  export  const productReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'PRODUCT_GET_REQUEST':
            return {
              ...currentState,
              products:[],
              isFetching: true,
              error: null,
              status:0,
              message:null,
            }
  
      case 'PRODUCT_GET_REQUEST_SUCCESS':
            return {
              ...currentState,
              products: action.products,
              isFetching: false,
              error: null,
              status:action.status,            
              message:action.message,
            }
  
      case 'PRODUCT_GET_REQUEST_FAILD':
            return {
              ...currentState,
              products:[],
              isFetching: false,
              status:0,
              error: action.error,
              message:null,
            }
  
      default:
         return currentState;
  
    }
  }
  