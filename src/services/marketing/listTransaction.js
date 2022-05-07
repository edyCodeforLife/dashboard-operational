import axios from 'axios'

const transactionList = async ({ params, token }) => {
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_MARKETING_SERVICE}/voucher/transaction`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-PERMISSION': 'SHOW_ALL',
        },
        params,
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

export default transactionList
