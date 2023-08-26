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

export default axios
