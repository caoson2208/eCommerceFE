import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

// Các URL
export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
export const URL_GOOGLE_LOGIN = 'auth/google'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  googleLogin(body: { id_token: string }) {
    return http.post<AuthResponse>(URL_GOOGLE_LOGIN, body)
  },
  logout() {
    const token = localStorage.getItem('token')
    return http.post(
      URL_LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}

export default authApi
