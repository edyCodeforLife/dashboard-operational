import axios from 'axios'
import qs from 'qs'

const userList = async ({ token, params }) => {
  try {
    const queryString = qs.stringify(params)

    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_USER_SERVICE}/users?${queryString}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-PERMISSION': 'SHOW_ALL',
        },
      },
    )

    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default userList
