import axios from 'axios'
import qs from 'qs'

const socketListRoom = async ({
  token,
  page = 1,
  limit = 10,
  dateRange,
  status,
  keyword = '',
  method,
  relationType,
  relationId,
}) => {
  try {
    const params = {}
    if (page) params.page = Number(page)
    if (limit) params.limit = limit
    if (dateRange) params.date_range = dateRange
    if (status) params.status = status
    if (keyword) params.keyword = keyword
    if (method) params.method = method
    if (relationType) params.relation_type = relationType
    if (relationId) params.relation_id = relationId

    const queryString = qs.stringify(params)

    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_SOCKET_SERVICE}/v1/room?${queryString}`,
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

export default socketListRoom
