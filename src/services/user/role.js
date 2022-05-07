import axios from 'axios'

const userRole = async ({ userId, token }) => {
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_USER_SERVICE}/users/${userId}/role`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export default userRole
