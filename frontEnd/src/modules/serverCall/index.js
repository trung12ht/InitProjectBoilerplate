import Auth from '../Auth'
import jumpTo from '../Navigation'
import axios from 'axios'
import qs from 'qs'
import paypalConfig from '../../configs/paypalConfig'

// const URL = 'https://zack-ecommerce-nodejs.herokuapp.com'
// const URL = 'https://virtserver.swaggerhub.com/levelopers2/Ecommerce/1.0.0'
// const URL = 'http://localhost:4000'

const URL = 'http://localhost:8080/api/v1'

export const http = axios.create({
  baseURL: URL,
  headers: {
    "Content-type": "application/json"
  }
});

export const postForm = ({ data, url }) => {
  let formData = new FormData();

  for (var key in data) {
    if (key!="documents")
      formData.append(key, data[key]);
    else if (key=="documents") {
      var index = 0;
      for (var pair of data[key]) {
        formData.append("documents[" + index + "].name", pair.name);
        formData.append("documents[" + index + "].content", pair.content);
        index++;
      }
    }
  }

  return http.post(URL + url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "authorization": Auth.getToken()
    },
  });
}

const serverCall = (config) => {
  //header authorization
  if (Auth.user_token) {
    const token = Auth.getToken()
    config.headers = {
      "authorization": token
    }
  }
  //interceptors handle network error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: 'net work error',
          status: 500
        }
      }
      if (error.response.status === 401) {
        Auth.logout()
        jumpTo('/login')
        throw error
      }
      return Promise.reject(error);
    });
  config.baseURL = URL
  return axios(config)
}
export default serverCall

export const login = (email, password) => {
  const body =
  {
    "credential": {
      "email": email,
      "password": password
    }
  }
  return serverCall({
    method: 'POST',
    url: '/users/login',
    data: body
  })
    .then(res => {
      Auth.setUserToken(res.data.user_token)
      return res
    })
}

export const getPaypalToken = () => {
  return axios({
    method: 'POST',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    auth: {
      username: paypalConfig.username,
      password: paypalConfig.password
    },
    data: qs.stringify({ "grant_type": "client_credentials" })
  })
}