import { useEffect, useState } from 'react'
import moment from 'moment'
import { batch, useDispatch } from 'react-redux'
import useExportData from '../../../hooks/useExportData'
import { getFileNameByFilters } from '../../../helpers/strings'
import listTransaction from '../../../services/marketing/listTransaction'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'

const useTransactionList = () => {
  const dispatch = useDispatch()
  const { exportCSV } = useExportData()

  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useShallowEqualSelector((state) => state.user)

  const [code, setCode] = useState('')
  const [limit, setLimit] = useState(2)
  const [voucherUsage, setVoucherUsage] = useState('')
  const [totalRevenue, setTotalRevenue] = useState('')
  const [totalDiscount, setTotalDiscount] = useState('')

  const [dateStart, setDateStart] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  )
  const [dateEnd, setDateEnd] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  )

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    code: '',
    voucher_usage: '',
    total_revenue: '',
    order_type: 'ASC',
    total_discount: '',
    order_by: 'voucher_code',
    daterange: `${moment(dateStart).format('DD/MM/YYYY')} - ${moment(
      dateEnd,
    ).format('DD/MM/YYYY')}`,
  })

  const [resetFilters] = useState(params)

  useEffect(() => {
    const debounce = setTimeout(() => {
      getData()
    }, 500)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [params])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      code,
    })
  }, [code])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      voucher_usage: voucherUsage,
    })
  }, [voucherUsage])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      total_discount: totalDiscount.replace('.', ''),
    })
  }, [totalDiscount])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      total_revenue: totalRevenue.replace('.', ''),
    })
  }, [totalRevenue])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      limit,
    })
  }, [limit])

  useEffect(() => {
    setParams({
      ...params,
      daterange: `${moment(dateStart).format('DD/MM/YYYY')} - ${moment(
        dateEnd,
      ).format('DD/MM/YYYY')}`,
    })
  }, [dateStart, dateEnd])

  const handleChangePage = (_, newPage) => {
    setParams({
      ...params,
      page: newPage + 1,
    })
  }

  const sorting = (by, type) => {
    setParams({
      ...params,
      order_by: by,
      order_type: type === 'ASC' ? 'DESC' : 'ASC',
    })
  }

  const reset = () => {
    setDateStart(moment().startOf('month').format('YYYY-MM-DD'))
    setDateEnd(moment().endOf('month').format('YYYY-MM-DD'))
    setParams(resetFilters)
  }

  const numberWithDots = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') || ''
  }

  const exportData = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      if (!meta) {
        throw new Error('Meta data not found!')
      }
      let csvDatas = []
      for (let page = 1; page <= meta.total_page; page++) {
        const params = {
          ...params,
          page,
        }
        const result = await listTransaction({
          params,
          token,
        })
        csvDatas = [...csvDatas, ...result.data]
      }

      const fileName = `TRANSACTION_VOUCHER_${getFileNameByFilters(
        params,
      )}`.toUpperCase()

      csvDatas = csvDatas
        .sort((a, b) => a.id < b.id)
        .map((row, index) => {
          return {
            'No.': index + 1,
            'Voucher Code': row?.voucher_code,
            'Voucher Usage': row?.voucher_usage,
            'Total Diskon Terpakai': row?.total_discount,
            'Total Revenue Didapatkan': row?.total_revenue,
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

  const getData = async () => {
    try {
      setIsLoading(true)
      const result = await listTransaction({
        params,
        token,
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

  return {
    data,
    meta,
    reset,
    params,
    dateEnd,
    setCode,
    sorting,
    setLimit,
    dateStart,
    isLoading,
    exportData,
    setDateEnd,
    setDateStart,
    numberWithDots,
    setTotalRevenue,
    setVoucherUsage,
    setTotalDiscount,
    handleChangePage,
  }
}

export default useTransactionList
