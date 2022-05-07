import axios from 'axios'

const userSearch = async ({ email, phone, token}) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_USER_SERVICE}/users/check-user`,
      {
        email,
        phone,
      },
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

export default userSearch
