
const apiUrl = "/api/";


export const getList = () => {
  return (dispatch) => {
    dispatch(productGetRequest());
    return fetch(apiUrl+"getList", {
      method:'post',
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(productGetRequestSuccess(data.products, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(productGetRequestFaild(error))
        })
      }
    })
  }
}

export const productGetRequest = (products) => {
  return {
    type: 'PRODUCT_GET_REQUEST',
    products
  }
}

export const productGetRequestSuccess = (products,message,status) => {
  return {
    type:'PRODUCT_GET_REQUEST_SUCCESS',
    products:products,
    message:message,
    status:status
  }
}

export const productGetRequestFaild = (error) => {
  return {
    type: 'PRODUCT_GET_REQUEST_FAILD',
    error
  }
}





export const createExpense = (param) => {
  return (dispatch) => {
    dispatch(productCreateRequest());
    return fetch(apiUrl+"createExpense", {
      method:'post',
      body: param
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(productCreateRequestSuccess(data.products, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(productCreateRequestFaild(error))
        })
      }
    })
  }
}

export const productCreateRequest = (products) => {
  return {
    type: 'PRODUCT_GET_REQUEST',
    products
  }
}

export const productCreateRequestSuccess = (products,message,status) => {
  return {
    type:'PRODUCT_GET_REQUEST_SUCCESS',
    products:products,
    message:message,
    status:status
  }
}

export const productCreateRequestFaild = (error) => {
  return {
    type: 'PRODUCT_GET_REQUEST_FAILD',
    error
  }
}





export const deleteExpense = (param) => {
  return (dispatch) => {
    dispatch(productDeleteRequest());
    return fetch(apiUrl+"deleteExpense", {
      method:'post',
      body: param
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(productDeleteRequestSuccess(data.products, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(productDeleteRequestFaild(error))
        })
      }
    })
  }
}

export const productDeleteRequest = (products) => {
  return {
    type: 'PRODUCT_GET_REQUEST',
    products
  }
}

export const productDeleteRequestSuccess = (products,message,status) => {
  return {
    type:'PRODUCT_GET_REQUEST_SUCCESS',
    products:products,
    message:message,
    status:status
  }
}

export const productDeleteRequestFaild = (error) => {
  return {
    type: 'PRODUCT_GET_REQUEST_FAILD',
    error
  }
}

  
export const getFilterList = (params) => { 
  return (dispatch) => {
    dispatch(productGetRequest());
    return fetch(apiUrl+"getFilerList", {
      method: 'POST',
      body:params
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(productGetRequestSuccess(data.products, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(productGetRequestFaild(error))
        })
      }
    })
  }
}
