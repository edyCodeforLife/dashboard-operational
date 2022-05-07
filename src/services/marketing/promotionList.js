import axios from 'axios'

const promotionList = async ({ token, params = {} }) => {
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_MARKETING_SERVICE}/promotion`,
      {
        params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default promotionList
