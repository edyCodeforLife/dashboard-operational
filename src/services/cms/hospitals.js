import axios from 'axios'

const cmsHospitals = async ({ keyword = '' }) => {
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_CMS_SERVICE}/hospitals?${keyword}`,
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

export default cmsHospitals
