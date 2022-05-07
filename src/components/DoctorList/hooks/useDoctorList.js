import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { pageShowSnackbar } from '../../../redux/actions/page'
import cmsDoctors from '../../../services/cms/doctors'

const useDoctorList = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [meta, setMeta] = useState()
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    showAllDokter: true,
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

  const getData = async () => {
    try {
      setIsLoading(true)

      const { data, meta } = await cmsDoctors({
        ...filters,
      })

      setData(data)
      setMeta({
        total: meta.total,
        per_page: meta.perPage,
        page: meta.page,
      })

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

  const handleChangeValidDoctor = (event) => {
    console.log('event.target.checked', event.target.checked)
    setFilters({
      ...filters,
      page: 1,
      showAllDokter: event.target.checked,
    })
  }

  return {
    filters,
    setKeyword,
    isLoading,
    data,
    meta,
    handleChangePage,
    handleChangeValidDoctor,
  }
}

export default useDoctorList
