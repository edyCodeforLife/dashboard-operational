import axios from 'axios'
import qs from 'qs'

const cmsDoctors = async ({
  page = 1,
  perPage = 20,
  keyword = '',
  showAllDokter = false,
}) => {
  try {
    const start = (page - 1) * perPage
    const limit = perPage

    const params = {
      _start: start,
      _limit: limit,
    }

    if (keyword) {
      params._q = keyword
    }

    if (!showAllDokter) {
      params.removeValidationHospital = true
    }

    const queryString = qs.stringify(params)

    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_CMS_SERVICE}/doctors?${queryString}`,
    )

    return Promise.resolve({
      data: response.data,
      meta: {
        total: response?.meta?.total,
        page,
        perPage,
      },
    })
  } catch (error) {
    return Promise.reject(
      new Error(
        error?.response?.data?.message || error?.message || 'Terjadi Kesalahan',
      ),
    )
  }
}

export default cmsDoctors
