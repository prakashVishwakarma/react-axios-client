import axios from 'axios'
import { appEnv } from 'src/app/config'
import { localStorageTokenName, refreshTokenCount, refreshTokenName } from 'src/utils/constants'
import useAppToast from 'src/hooks/useAppToast'
import { logout } from './slices/authSlice'
import { refreshTokenAsync } from './actions/authActions'

const getTokenSync = () => localStorage.getItem(localStorageTokenName)
const refreshToken = localStorage.getItem(refreshTokenName)

const AxiosClient = async (method, endPoint, payload, toolkit, params = {}) => {

  const token = getTokenSync()
  const { warningToast } = useAppToast()

  const headers = {
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(payload?._boundary && { 'Content-Type': `multipart/form-data; boundary=${payload._boundary}` })
  }

  try {
    const response = await axios({
      url: `${appEnv.BASE_URL}${endPoint}`,
      method,
      data: payload,
      params,
      headers
    })

    if (response.status === 401 && response.data?.code === 'user_not_found') {
      toolkit.dispatch(logout())
    }

    return toolkit.fulfillWithValue(response.data)
  } catch (error) {
    const { response } = error
    if (response.status === 401) {
      if (response.data?.code === 'user_not_found') {
        toolkit.dispatch(logout())
      } else if (response.data?.code === 'token_not_valid' && refreshToken) {
        const refreshHitCount = localStorage.getItem(refreshTokenCount) || '0'
        if (Number(refreshHitCount) === 0) {
          warningToast('Token expired. Refreshing...')
          localStorage.setItem(refreshTokenCount, '1')
          const formData = new FormData()
          formData.append('refresh', refreshToken)
          toolkit.dispatch(refreshTokenAsync(formData))
        }
      }
    }
    return toolkit.rejectWithValue(response)
  }
}

export default AxiosClient
