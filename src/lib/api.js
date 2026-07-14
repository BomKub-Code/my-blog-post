import axios from 'axios'

// axios instance กลางของแอป ตั้ง baseURL ไว้ล่วงหน้า
// ที่อื่นในโปรเจกต์เรียกใช้ผ่าน api.get('/posts') แทนที่จะพิมพ์ URL เต็มซ้ำทุกที่
export const api = axios.create({
  baseURL: 'https://blog-post-project-api.vercel.app',
})
