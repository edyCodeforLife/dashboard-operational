import axios from 'axios'

const userLogout = async ({ token }) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_USER_SERVICE}/auth/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return Promise.resolve({})
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default userLogout
