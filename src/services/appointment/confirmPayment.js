import axios from 'axios'

const confirmPayment = async ({ appointmentRefId, paidAmount = 0, token }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v1/payment/confirm-manual-bank-transfer`,
      {
        appointment_ref_id: appointmentRefId,
        paid_amount: parseFloat(paidAmount),
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

export default confirmPayment
