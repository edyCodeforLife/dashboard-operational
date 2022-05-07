import axios from 'axios'

const uploadFile = async ({ formData, token }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_FILE_SERVICE}/v1/file/upload`,
      formData,
      {
        headers: {
          'Accept-Language': 'ID',
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

export default uploadFile
