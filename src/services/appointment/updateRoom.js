import axios from 'axios'

const updateRoom = async ({ appointmentId, videoCallProvider, token }) => {
  try {
    const { data: response } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v2/room/${appointmentId}`,
      {
        video_call_provider: videoCallProvider,
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

export default updateRoom
