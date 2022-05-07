import { useEffect, useState } from 'react'
import voucherList from '../../../services/marketing/voucherList'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import { useDispatch } from 'react-redux'
import { pageShowSnackbar } from '../../../redux/actions/page'
import debounce from '../../../helpers/debounce'
import objectToSnakeCase from '../../../helpers/snakecase-converter'

const useVoucherList = () => {
  const dispatch = useDispatch()
  const [meta, setMeta] = useState(null)
  const [vouchers, setVouchers] = useState([])
  const { token } = useShallowEqualSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({
    voucherFlag: '',
    voucherCode: '',
    minimumTransaction: '',
    amountFlag: '',
    typeOfService: '',
    amountFlag: '',
    voucherAmount: '',
    maximumAmount: '',
    beginEffectiveDate: '',
    endEffectiveDate: '',
    createdBy: '',
    createdAt: '',
    updatedBy: '',
    updatedAt: '',
    limit: 10,
    active: false,
  })

  // dont change this, because API can't sort properly
  const [tableColumns, setTableColumns] = useState([
    { column: 'Voucher Flag', dir: 'asc', active: false },
    { column: 'Voucher Code', dir: 'asc', active: false },
    { column: 'Min. Transaction', dir: 'asc', active: false },
    { column: 'Action', dir: 'asc', active: false },
    { column: '', dir: 'asc', active: false },
    { column: 'Type of Service', dir: 'asc', active: false },
    { column: 'Amount Flag', dir: 'asc', active: false },
    { column: 'Voucher Amount', dir: 'asc', active: false },
    { column: 'Max. Amount', dir: 'asc', active: false },
    { column: 'Begin Effective', dir: 'asc', active: false },
    { column: 'End Effective', dir: 'asc', active: false },
    { column: 'Created Date', dir: 'asc', active: false },
    { column: 'Created By', dir: 'asc', active: false },
    { column: 'Modified Date', dir: 'asc', active: false },
    { column: 'Modified By', dir: 'asc', active: false },
  ])

  const [reset] = useState(filter)

  const getVoucher = async () => {
    try {
      const payload = { ...filter }
      payload.page = page

      if (filter.active) delete payload.page
      delete payload.active

      const params = objectToSnakeCase(payload)
      const response = await voucherList({ token, params })
      setVouchers(response.data)
      setMeta(response.meta)
    } catch (error) {
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

  const handleFilterOption = ({ identifier, value }) => {
    setFilter({
      ...filter,
      [`${identifier}`]: value,
      active: true,
    })
  }

  const handleFilterInput = debounce(({ identifier, value }) => {
    setFilter({
      ...filter,
      [`${identifier}`]: value,
      active: true,
    })
  }, 700)

  const handlePagination = (_, newPage) => {
    setPage(newPage + 1)
  }

  const handleRowPerPage = (limit) => {
    setFilter({ ...filter, limit })
  }

  const resetFilter = () => {
    setFilter(reset)
    const input = document.querySelectorAll('input')
    const toArray = [...input]
    toArray.map((item) => (item.value = ''))
  }

  const sorting = (index, dir, identifier) => {
    const newVouchers = [...vouchers]
    const columns = [...tableColumns]
    const idx = columns.findIndex((item) => item.active)

    newVouchers.reverse((prev, next) => {
      let id = 'id'
      for (const item in prev) {
        const column = identifier.split(' ').join('_').toLowerCase()
        const match = item.includes(column)
        if (match) id = item
      }

      if (dir === 'desc') return prev[`${id}`] - next[`${id}`]
      if (dir === 'asc') return next[`${id}`] - prev[`${id}`]
    })

    if (idx > -1) columns[idx].active = false
    columns[index].active = true
    columns[index].dir = dir === 'asc' ? 'desc' : 'asc'

    setVouchers(newVouchers)
    setTableColumns(columns)
  }

  useEffect(() => getVoucher(), [filter, page])

  return {
    meta,
    filter,
    sorting,
    vouchers,
    resetFilter,
    tableColumns,
    handleRowPerPage,
    handlePagination,
    handleFilterInput,
    handleFilterOption,
  }
}

export default useVoucherList
