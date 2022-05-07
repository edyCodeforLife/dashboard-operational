import axios from 'axios'

const getMedrec = async ({
  appointmentId,
  token,
  patientId,
  ektp,
  name,
  gender,
  birthdate,
}) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v1/medical-record/search`,
      {
        appointment_id: appointmentId,
        patient_id: patientId,
        ektp,
        name,
        gender,
        birth_date: birthdate,
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

export default getMedrec
