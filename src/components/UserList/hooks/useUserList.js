import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import { pageShowSnackbar } from '../../../redux/actions/page'
import listUser from '../../../services/user/list'

const useUserList = () => {
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
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

      const result = await listUser({
        params: filters,
        token,
      })

      setData(result.users)
      setMeta({
        total: result.totalData,
        per_page: result.perPage,
        page: result.page,
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

  return {
    filters,
    setKeyword,
    isLoading,
    data,
    meta,
    handleChangePage,
  }
}

export default useUserList
