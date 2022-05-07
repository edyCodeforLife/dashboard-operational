import axios from 'axios'

const updateInvoiceSetting = async ({ idInvoice, formData, token }) => {
  try {
    const { data: response } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL_CMS_SERVICE}/setting/digital-invoice/${idInvoice}`,
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=<calculated when request is sent>',
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

export default updateInvoiceSetting
