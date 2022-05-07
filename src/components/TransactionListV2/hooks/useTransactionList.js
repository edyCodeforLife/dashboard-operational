import { useEffect, useState } from 'react'
import moment from 'moment'
import { batch, useDispatch } from 'react-redux'
import useExportData from '../../../hooks/useExportData'
import { getFileNameByFilters } from '../../../helpers/strings'
import listTransactionV2 from '../../../services/marketing/listTransactionV2'
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

  const [limit, setLimit] = useState(2)

  const [dateStart, setDateStart] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  )
  const [dateEnd, setDateEnd] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  )
  const [orderId, setOrderId] = useState('')
  const [status, setStatus] = useState('')
  const [totalDiscount, setTotalDiscount] = useState('')
  const [transactionAmount, setTransactionAmount] = useState('')
  const [type_of_service, setService] = useState('')
  const [code, setCode] = useState('')
  const [voucherNumber, setVoucherNumber] = useState('')
  const [netTransaction, setNetTransaction] = useState('')
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    order_type: 'ASC',
    order_by: '',
    daterange: `${moment(dateStart).format('DD/MM/YYYY')} - ${moment(
      dateEnd,
    ).format('DD/MM/YYYY')}`,
    order_id: '',
    status: '',
    total_discount: '',
    transaction_amount: '',
    type_of_service: '',
    code: '',
    voucher_number: '',
    net_transaction: '',
    // service: '',
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

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      order_id: orderId,
    })
  }, [orderId])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      type_of_service: type_of_service,
    })
  }, [type_of_service])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      code: code,
    })
  }, [code])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      voucher_number: voucherNumber.replace('.', ''),
    })
  }, [voucherNumber])

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
      transaction_amount: transactionAmount.replace('.', ''),
    })
  }, [transactionAmount])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      net_transaction: netTransaction.replace('.', ''),
    })
  }, [netTransaction])

  useEffect(() => {
    setParams({
      ...params,
      page: 1,
      status: status,
    })
  }, [status])

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
        const result = await listTransactionV2({
          params: { ...params, page },
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
            Date: row?.date,
            'Order ID': row?.order_id,
            Service: row?.type_of_service,
            'Voucher Code': row?.voucher_code,
            'Voucher Number': row?.voucher_number,
            'Total Discount': row?.total_discount,
            'Transaction Value': row?.transaction_value,
            'Net Transaction': row?.net_transaction,
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

  const getData = async () => {
    try {
      setIsLoading(true)
      const result = await listTransactionV2({
        params,
        token,
      })
      console.log('result', result)
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
    setLimit,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    orderId,
    setOrderId,
    type_of_service,
    setService,
    code,
    setCode,
    voucherNumber,
    setVoucherNumber,
    totalDiscount,
    setTotalDiscount,
    transactionAmount,
    setTransactionAmount,
    netTransaction,
    setNetTransaction,
    status,
    setStatus,
    sorting,
    isLoading,
    exportData,
    numberWithDots,
    handleChangePage,
  }
}

export default useTransactionList
