import axios from 'axios'

const saveVoucher = async ({ params, token }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_MARKETING_SERVICE}/voucher`,
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

export default saveVoucher
