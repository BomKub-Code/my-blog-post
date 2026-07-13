// This assignment's scope has no real auth backend — this mocks user
// registration/login with localStorage so duplicate-email checks and the
// login flow have something to validate against.
const STORAGE_KEY = 'blog-post-app:users'

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

export function emailExists(email) {
  const normalized = email.trim().toLowerCase()
  return readUsers().some((user) => user.email === normalized)
}

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

export function verifyCredentials(email, password) {
  const normalized = email.trim().toLowerCase()
  const user = readUsers().find((candidate) => candidate.email === normalized)

  if (!user) return { success: false, reason: 'not_found' }
  if (user.password !== password) return { success: false, reason: 'wrong_password' }
  return { success: true, user }
}
