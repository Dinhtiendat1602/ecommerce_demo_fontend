import axios from 'axios'

// Instance axios dùng chung cho toàn bộ project
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
})

export default api
