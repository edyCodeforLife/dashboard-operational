import axios from 'axios'

const updatePromotion = async ({ params, token, id }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_MARKETING_SERVICE}/promotion/${id}`,
      { ...params },
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

export default updatePromotion
