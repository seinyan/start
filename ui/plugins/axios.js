export default function ({ $axios, redirect, store }) {

  if(store.state.auth){
    if (store.state.auth.accessToken) {
      $axios.setToken(store.state.auth.accessToken, 'Bearer')
    }
  }

  $axios.onRequest(config => { })
  $axios.onResponse(response => {
    return {
      status: response.status,
      data: response.data
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);

    if (code === 404) {
      // redirect('/404')
    }else if(code === 500) {
      // redirect('/404')
    }
    else {
      return {
        statusCode: code,
        data: error.response.data
      }
    }

  })

}
