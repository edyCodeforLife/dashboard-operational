import axios from 'axios'
import moment from 'moment'

const appointmentListCancel = async ({ params, token, maxDays = 14 }) => {
  try {
    let startDate
    let endDate
    if (params.date_start?.length > 0 && params.date_end?.length > 0) {
      startDate = moment(params.date_start)
      endDate = moment(params.date_end)
    }
    if (
      params.schedule_date_start?.length > 0 &&
      params.schedule_date_end?.length > 0
    ) {
      startDate = moment(params.schedule_date_start)
      endDate = moment(params.schedule_date_end)
    }
    if (
      params.canceled_date_start?.length > 0 &&
      params.canceled_date_end?.length > 0
    ) {
      startDate = moment(params.canceled_date_start)
      endDate = moment(params.canceled_date_end)
    }

    if (startDate && endDate) {
      const diffDays = endDate.diff(startDate, 'days')
      if (diffDays < 0) {
        throw new Error('Invalid Date Range!')
      }

      if (diffDays > maxDays) {
        throw new Error(`Maximum Date Range ${maxDays} days!`)
      }
    }

    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_APPOINTMENT_SERVICE}/v1/consultation/canceled`,
      params,
      {
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

export default appointmentListCancel
