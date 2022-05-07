import { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import useExportData from '../../../hooks/useExportData'
import objectToSnakeCase from '../../../helpers/snakecase-converter'
import promotionList from '../../../services/marketing/promotionList'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'

const usePromotionList = () => {
  const dispatch = useDispatch()
  const { exportCSV } = useExportData()
  const { token } = useShallowEqualSelector((state) => state.user)

  const [meta, setMeta] = useState(null)
  const [promotions, setPromotions] = useState([])
  const [tableColumns, setTableColumns] = useState([])
  const [defaultFilter] = useState({
    page: 1,
    limit: 10,
  })
  const [filter, setFilter] = useState(defaultFilter)

  const getFileNameByFilters = (filters = []) =>
    Object.keys(filters)
      .map((key) => {
        if (
          ![
            'merchant_name',
            'merchant_type',
            'promotion_id',
            'promotion_title',
            'promotion_type',
            'status',
            'voucher_code',
            'weight',
          ].includes(key)
        ) {
          return null
        }

        const filter = filters[key]

        if (!filter) {
          return null
        }

        return `${key}-${filter}`
      })
      .filter((val) => val !== null)
      .join('_')

  const promotionsApi = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const params = objectToSnakeCase(filter || {}) || {}
      const promotionApi = await promotionList({ token, params })
      const mapped = promotionApi?.data?.map((promo) => ({
        id: promo?.id,
        title: promo?.title,
        promotionType: promo?.promotion_type,
        voucherCode: promo?.voucher_code,
        merchantName: promo?.merchant_name,
        merchantType: promo?.merchant_type,
        allowEdit: promo?.allow_edit,
        weight: promo?.weight,
        status: promo?.status,
      }))

      setMeta(promotionApi?.meta)
      setPromotions(mapped)
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      batch(() => {
        dispatch(pageIsBackdropOpen(false))
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
      })
    }
  }

  const exportData = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      if (!meta) {
        throw new Error('Meta data not found!')
      }
      let csvDatas = []
      let params = {}
      const filterUpdate = { ...filter }
      for (let page = 1; page <= meta.total_page; page++) {
        filterUpdate.page = page
        params = objectToSnakeCase(filterUpdate || {})
        const result = await promotionList({ token, params })
        csvDatas = [...csvDatas, ...result.data]
      }

      const fileName = `PROMOTION_${getFileNameByFilters(params)}`.toUpperCase()

      csvDatas = csvDatas
        .sort((a, b) => a.id < b.id)
        .map((row, index) => {
          return {
            'No.': index + 1,
            'Promotion ID': row?.id,
            'Promotion Title': row?.title,
            'Promotion Type': row?.promotion_type,
            'Voucher Code': row?.voucher_code,
            'Merchant Name': row?.merchant_name,
            'Merchant Type': row?.merchant_type,
            Weight: row?.weight,
            Status: row?.status,
          }
        })

      exportCSV({
        data: csvDatas,
        filename: fileName,
      })

      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      batch(() => {
        dispatch(pageIsBackdropOpen(false))
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
      })
    }
  }

  const setLimit = (value) => {
    setFilter({
      ...filter,
      page: 1,
      limit: value,
    })
  }

  const handleChangePage = (_, newPage) => {
    setFilter({
      ...filter,
      page: newPage + 1,
    })
  }

  const resetFilter = () =>
    setFilter({
      page: 1,
      limit: 10,
    })

  const filterHandler = (key, value) => {
    const filterUpdate = { ...filter, [key]: value }
    if (value === 'All') {
      filterUpdate[key] = value
      delete filterUpdate[key]
    }
    setFilter({ ...filterUpdate, ...defaultFilter })
  }

  const inputHandler = (key, value) => {
    const filterUpdate = { ...filter, ...defaultFilter }
    setFilter({ ...filterUpdate, [key]: value })
  }

  const sorting = (key, dir) => {
    const direction = dir === 'desc' ? 'ASC' : 'DESC'
    const newColumns = tableColumns.map((item) => {
      const column = item

      column.active = false
      if (item.id === key) {
        column.dir = direction?.toLowerCase()
        column.active = true
      }

      return column
    })

    setTableColumns(newColumns)
    setFilter({ ...filter, orderBy: key, orderType: direction })
  }

  useEffect(() => {
    setTableColumns([
      { column: 'No', id: '', dir: 'asc', active: false },
      {
        column: 'Promotion ID',
        id: 'promotion_id',
        dir: 'asc',
        active: false,
      },
      {
        column: 'Promotion Title',
        id: 'promotion_title',
        dir: 'asc',
        active: false,
      },
      {
        column: 'Promotion Type',
        id: 'promotion_type',
        dir: 'asc',
        active: false,
      },
      {
        column: 'Voucher Code',
        id: 'voucher_code',
        dir: 'asc',
        active: false,
      },
      {
        column: 'Merchant Name',
        id: 'merchant_name',
        dir: 'asc',
        active: false,
      },
      {
        column: 'Merchant Type',
        id: 'merchant_type',
        dir: 'asc',
        active: false,
      },
      { column: 'Weight', id: 'weight', dir: 'desc', active: false },
      { column: 'Status', id: 'status', dir: 'asc', active: false },
      { column: 'Action', id: '', dir: 'asc', active: false },
    ])
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      promotionsApi()
    }, 700)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [filter])

  useEffect(
    () => () => {
      setMeta(null)
      setPromotions([])
      setTableColumns([])
      setFilter(defaultFilter)
    },
    [],
  )

  return {
    meta,
    filter,
    sorting,
    setLimit,
    exportData,
    promotions,
    resetFilter,
    tableColumns,
    inputHandler,
    filterHandler,
    handleChangePage,
  }
}

export default usePromotionList
