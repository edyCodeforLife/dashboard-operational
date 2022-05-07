import axios from 'axios'
import qs from 'qs'

const cmsSpecializations = async ({ keyword = '' }) => {
  try {
    let params = { _q: keyword, _limit: 5 }
    if (keyword === '') delete params._q

    const queryString = qs.stringify(params)

    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_CMS_SERVICE}/specializations?${queryString}`,
      params,
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

export default cmsSpecializations
