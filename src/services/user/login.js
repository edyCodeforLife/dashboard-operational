import axios from 'axios'

const userLogin = async ({ email, password, role = 'PRO' }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_USER_SERVICE}/auth/login`,
      {
        email,
        password,
        role,
      },
    )

    if (!response.data.is_verified) {
      throw new Error('Akun tidak verified')
    }

    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default userLogin
