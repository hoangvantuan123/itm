import { HOST_API_SERVER_P } from '../../../services'

export const registerUser = async ({ login, password, nameUser, language }) => {
  try {
    const response = await fetch(`${HOST_API_SERVER_P}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password, nameUser, language }),
      credentials: 'same-origin',
    })

    if (!response.ok) {
      throw new Error('Invalid credentials')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Đăng ký thất bại: ' + error.message)
  }
}
