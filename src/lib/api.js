import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://blog-post-project-api.vercel.app',
})
