import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: 'https://hayeongyou.shop',
    timeout: 2000,
    withCredentials: true,
})
axiosClient.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            req.headers['Authorization'] = `Bearer ${token}`
        }
        return req
    },
    (error) => {
        return Promise.reject(error)
    },
)
axiosClient.interceptors.response.use((res) => {
    return res.data
})
