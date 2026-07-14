import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// จุดเริ่มต้นของแอป: หา element id="root" ใน index.html แล้ว mount <App /> ลงไป
// StrictMode ช่วยเตือน pattern ที่ไม่ปลอดภัยตอน dev (จะ render ซ้ำ 2 รอบ แต่ไม่กระทบ production build)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
