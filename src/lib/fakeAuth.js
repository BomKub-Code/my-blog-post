// This assignment's scope has no real auth backend — this mocks user
// registration/login with localStorage so duplicate-email checks and the
// login flow have something to validate against.
const STORAGE_KEY = 'blog-post-app:users'

// อ่านรายชื่อ user ทั้งหมดจาก localStorage; ถ้ายังไม่เคยมี หรือ parse ไม่ได้ ให้คืน array ว่าง
function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

// เช็คว่ามี email นี้ลงทะเบียนไว้แล้วหรือยัง (ใช้ตอน validate ฟอร์มสมัครสมาชิก)
export function emailExists(email) {
  const normalized = email.trim().toLowerCase()
  return readUsers().some((user) => user.email === normalized)
}

// บันทึก user ใหม่ต่อท้ายรายชื่อเดิมใน localStorage (ไม่ได้เข้ารหัสรหัสผ่าน เพราะเป็นแค่ mock)
export function registerUser({ name, username, email, password }) {
  const users = readUsers()
  users.push({
    name,
    username,
    email: email.trim().toLowerCase(),
    password,
  })
  writeUsers(users)
}

// ตรวจสอบ email/password ตอน login แล้วบอกสาเหตุที่ล้มเหลว (not_found หรือ wrong_password)
// เพื่อให้หน้า LogInPage แสดง error message ให้ตรงจุดได้
export function verifyCredentials(email, password) {
  const normalized = email.trim().toLowerCase()
  const user = readUsers().find((candidate) => candidate.email === normalized)

  if (!user) return { success: false, reason: 'not_found' }
  if (user.password !== password) return { success: false, reason: 'wrong_password' }
  return { success: true, user }
}
