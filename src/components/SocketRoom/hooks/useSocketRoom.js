import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import { pageShowSnackbar } from '../../../redux/actions/page'
import socketListRoom from '../../../services/socket/listRoom'

const useSocketRoom = ({ params }) => {
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)
  const [dateStart, setDateStart] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  )
  const [dateEnd, setDateEnd] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roomId, setRoomId] = useState(null)
  const [filters, setFilters] = useState({
    keyword: '',
    dateRange: `${moment(dateStart).format('DD/MM/YYYY')} - ${moment(
      dateEnd,
    ).format('DD/MM/YYYY')}`,
    date_start: dateStart,
    date_end: dateEnd,
    page: 1,
    ...params,
  })

  useEffect(() => {
    const debounce = setTimeout(() => {
      getData()
    }, 500)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [filters])

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilters({
        ...filters,
        page: 1,
        keyword,
      })
    }, 500)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [keyword])

  useEffect(() => {
    changeFilterDate()
  }, [dateStart, dateEnd])

  const getData = async () => {
    try {
      setIsLoading(true)
      const result = await socketListRoom({
        token,
        ...filters,
      })
      setData(result.data)
      setMeta(result.meta)
      setIsLoading(false)
    } catch (error) {
      setData([])
      setMeta(null)
      setIsLoading(false)
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: error.message,
          vertical: 'top',
          horizontal: 'right',
        }),
      )
    }
  }
  const handleChangePage = (_, newPage) => {
    setFilters({
      ...filters,
      page: newPage + 1,
    })
  }

  const changeFilterDate = () => {
    setFilters({
      ...filters,
      page: 1,
      dateRange: `${moment(dateStart).format('DD/MM/YYYY')} - ${moment(
        dateEnd,
      ).format('DD/MM/YYYY')}`,
      date_start: dateStart,
      date_end: dateEnd,
    })
  }

  return {
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    filters,
    keyword,
    setKeyword,
    isLoading,
    data,
    meta,
    handleChangePage,
    isModalOpen,
    setIsModalOpen,
    roomId,
    setRoomId,
  }
}

export default useSocketRoom
