import axios from 'axios'
import {browserHistory} from 'react-router'

const http = axios.create({
  baseURL: '/api/v1/',
})

// Intercept http to redirect to login on unauthorized response
http.interceptors.response.use(res => res, err => {
  const location = browserHistory.getCurrentLocation()
  if (err.response && err.response.status === 403) {
    return browserHistory.push(`/login?redirect=${encodeURIComponent(location.pathname+location.search+location.hash)}`)
  }

  return Promise.reject(err)
})

export default http
