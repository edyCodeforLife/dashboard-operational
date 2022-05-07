import axios from 'axios'

const TransactionListV2 = async ({ params, token }) => {
  try {
    // remove filter
    delete params.order_id
    delete params.voucher_number

    if (params.order_by === '') {
      delete params.order_by
    }

    // change filter name
    // params.code = params.voucher_code
    // delete params.voucher_code
    // params.transaction_amount = params.transaction_value
    // delete params.transaction_value

    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_MARKETING_SERVICE}/voucher/v2/transaction`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-PERMISSION': 'SHOW_ALL',
        },
        params,
      },
    )
    console.log('TransactionListV2', params)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default TransactionListV2
