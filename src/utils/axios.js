import axiosInstance from 'axios'

const axios = axiosInstance.create({
  baseURL: 'http://localhost:4000/'
})

// Interceptor to add the access token header if available
axios.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Delete localStorage data here
      localStorage.removeItem('accessToken')
    }
    return Promise.reject(error)
  }
)

export default axios
