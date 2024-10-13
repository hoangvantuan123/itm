import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HOST_API_SERVER_P } from '../../../services'
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    try {
      const response = await fetch(`http://localhost:3000/u/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await response.json()
    } catch (error) {
      throw new Error('Đăng nhập thất bại: ' + error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
