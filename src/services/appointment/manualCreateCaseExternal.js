import axios from 'axios'

const manualCreateCaseExternal = async ({ appointmentRefId, token }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v1/manual-process/create-case-external`,
      {
        appointment_ref_id: appointmentRefId,
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

export default manualCreateCaseExternal
