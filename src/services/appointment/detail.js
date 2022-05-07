import axios from 'axios'

const appointmentDetail = async ({ appointmentId, token }) => {
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v1/consultation/${appointmentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-PERMISSION': 'SHOW_ALL',
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

export default appointmentDetail
