import moment from 'moment'
import { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import useExportData from '../../../hooks/useExportData'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'
import listOngoing from '../../../services/appointment/listOngoing'
import listCancel from '../../../services/appointment/listCancel'
import listHistory from '../../../services/appointment/listHistory'
import { getFileNameByFilters } from '../../../helpers/strings'
import cmsPaymentTypes from '../../../services/cms/paymentTypes'
import cmsHospitals from '../../../services/cms/hospitals'

const useAppointmentList = ({ userId, type = 'ON_GOING', status = [] }) => {
  const dispatch = useDispatch()
  const { exportCSV } = useExportData()
  const { token, hospitals: userHospitals } = useShallowEqualSelector(
    (state) => state.user,
  )
  const [filterDateType, setFilterDateType] = useState('SCHEDULE')
  const [paymentMethod, setPaymentMethod] = useState('ALL')
  const [dateStart, setDateStart] = useState(
    moment().startOf('month').format('YYYY-MM-DD'),
  )
  const [dateEnd, setDateEnd] = useState(
    moment().endOf('month').format('YYYY-MM-DD'),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [allHospitals, setAllHospitals] = useState([])
  const [hospitals, setHospitals] = useState(userHospitals)
  const [meta, setMeta] = useState(null)
  const [filters, setFilters] = useState({
    user_id: userId || undefined,
    keyword: '',
    date_start: '',
    date_end: '',
    payment_method: '',
    schedule_date_start: moment().startOf('month').format('YYYY-MM-DD'),
    schedule_date_end: moment().endOf('month').format('YYYY-MM-DD'),
    canceled_date_start: '',
    canceled_date_end: '',
    sort_by: 'id',
    sort_type: 'DESC',
    page: 1,
    status,
    hospital_ids: userHospitals,
  })

  useEffect(() => {
    getPaymentMethod()
    getHospitals()
  }, [])

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
    const debounce = setTimeout(() => {
      setFilters({
        ...filters,
        page: 1,
        payment_method: paymentMethod === 'ALL' ? '' : paymentMethod,
        keyword,
      })
    }, 500)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [paymentMethod])

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilters({
        ...filters,
        page: 1,
        hospital_ids: hospitals,
        keyword,
      })
    }, 500)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [hospitals])

  useEffect(() => {
    changeFilterDate()
  }, [dateStart, dateEnd, filterDateType])

  const getData = async () => {
    try {
      setIsLoading(true)

      if (type === 'ON_GOING') {
        const result = await listOngoing({
          params: filters,
          token,
          maxDays: 31,
        })
        setData(result.data)
        setMeta(result.meta)
      }

      if (type === 'CANCELED') {
        const result = await listCancel({
          params: {
            ...filters,
            status: [
              'CANCELED_BY_SYSTEM',
              'CANCELED_BY_GP',
              'CANCELED_BY_USER',
              'PAYMENT_EXPIRED',
              'PAYMENT_FAILED',
            ],
          },
          token,
          maxDays: 31,
        })
        setData(result.data)
        setMeta(result.meta)
      }

      if (type === 'COMPLETED') {
        const result = await listHistory({
          params: filters,
          token,
          maxDays: 31,
        })
        setData(result.data)
        setMeta(result.meta)
      }

      if (type === 'REFUNDED') {
        const result = await listCancel({
          params: {
            ...filters,
            status: ['REFUNDED'],
          },
          token,
          maxDays: 31,
        })
        setData(result.data)
        setMeta(result.meta)
      }

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

  const handleChangeFilterDateType = (value) => {
    setFilterDateType(value)
  }

  const changeFilterDate = () => {
    if (filterDateType === 'SCHEDULE') {
      setFilters({
        ...filters,
        page: 1,
        date_start: '',
        date_end: '',
        schedule_date_start: dateStart,
        schedule_date_end: dateEnd,
        canceled_date_start: '',
        canceled_date_end: '',
      })
    }

    if (filterDateType === 'CREATED') {
      setFilters({
        ...filters,
        page: 1,
        date_start: dateStart,
        date_end: dateEnd,
        schedule_date_start: '',
        schedule_date_end: '',
        canceled_date_start: '',
        canceled_date_end: '',
      })
    }

    if (filterDateType === 'CANCELED') {
      setFilters({
        ...filters,
        page: 1,
        date_start: '',
        date_end: '',
        schedule_date_start: '',
        schedule_date_end: '',
        canceled_date_start: dateStart,
        canceled_date_end: dateEnd,
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
      for (let page = 1; page <= meta.total_page; page++) {
        const params = {
          ...filters,
          page,
        }
        if (type === 'ON_GOING') {
          const response = await listOngoing({ params, token, maxDays: 31 })
          csvDatas = [...csvDatas, ...response.data]
        }

        if (type === 'CANCELED') {
          const response = await listCancel({
            params: {
              ...params,
              status: [
                'CANCELED_BY_SYSTEM',
                'CANCELED_BY_GP',
                'CANCELED_BY_USER',
                'PAYMENT_EXPIRED',
                'PAYMENT_FAILED',
              ],
            },
            token,
            maxDays: 31,
          })
          csvDatas = [...csvDatas, ...response.data]
        }

        if (type === 'COMPLETED') {
          const response = await listHistory({ params, token, maxDays: 31 })
          csvDatas = [...csvDatas, ...response.data]
        }

        if (type === 'REFUNDED') {
          const response = await listCancel({
            params: {
              ...params,
              status: ['REFUNDED'],
            },
            token,
            maxDays: 31,
          })
          csvDatas = [...csvDatas, ...response.data]
        }
      }

      const fileName = `APPOINTMENT_${type}_${getFileNameByFilters(
        filters,
      )}`.toUpperCase()

      csvDatas = csvDatas
        .sort((a, b) => a.id < b.id)
        .map((row) => {
          const schedule = row.schedule
            ? `${moment(row.schedule.date).format('DD/MM/YYYY')} (${moment(
                row.schedule.time_start,
                'HH:mm',
              ).format('HH:mm')} - ${moment(
                row.schedule.time_end,
                'HH:mm',
              ).format('HH:mm')})`
            : '-'
          const fees = []
          const discounts = []
          const vouchers = []

          row.fees?.forEach((fee) => {
            if (fee.category === 'FEE') {
              fees.push(`${fee.label} (${fee.amount})`)
            }

            if (fee.category === 'DISCOUNT') {
              discounts.push(
                `${fee.label} (${fee.amount})${
                  fee.type ? ` (${fee.type})` : ''
                }`,
              )
            }

            if (fee.category === 'VOUCHER') {
              vouchers.push(
                `${fee.label} (${fee.amount})${
                  fee.type ? ` (${fee.type})` : ''
                }`,
              )
            }
          })

          const result = {
            ID: row.id,
            'Order ID': row.order_code,
            'Billing ID': row.billing_id || '-',
            'Billing Version': row.billing_version || 'v1',
            'Payment Method Code': row.transaction?.detail?.code || '-',
            'Payment Method': row.transaction?.detail?.name || '-',
            'User Ref ID': row?.parent_user?.ref_id || '-',
            User: row?.parent_user?.name || '-',
            'Patient Ref ID': row?.user?.ref_id || '-',
            Patient: row?.user?.name || '-',
            Specialist: row?.doctor?.name || '-',
            Hospital: row?.doctor?.hospital?.name || '-',
            'Consultation Method': row?.consultation_method,
            'Sub Total': row?.total_original_price || 0,
            'Total Discount': row?.total_discount || 0,
            'Total Voucher': row?.total_voucher || 0,
            'Grand Total': row?.total_price || 0,
            'Fee Data': fees.join(', '),
            'Discount Data': discounts.join(', '),
            'Voucher Data': vouchers.join(', '),
            'Schedule Date': schedule,
            'Created Date': moment(row.created).format('DD/MM/YYYY HH:mm:ss'),
            'Expired Date': row.expired_at
              ? moment(row.expired_at).format('DD/MM/YYYY HH:mm:ss')
              : '-',
            'Canceled Date': row.canceled_at
              ? moment(row.canceled_at).format('DD/MM/YYYY HH:mm:ss')
              : '-',
            'Canceled Notes': row.canceled_notes || '-',
            Status: row.status_detail.label,
            'Status System': row.status,
            'In Operational Hour':
              row.in_operational_hour === true ? 'TRUE' : 'FALSE',
            'External Patient ID': `'${row.external_patient_id}` || '-',
            'Appointment ID': `'${row.external_appointment_id}` || '-',
            'Case No': `'${row.external_case_no}` || '-',
            'Insurance Company': `${row.ins_name}` || '-',
            'Insurance No': `'${row.ins_no}` || '-',
          }

          if (type === 'COMPLETED') {
            result['Drug Resume'] =
              row.have_drug_resume === true ? 'TRUE' : 'FALSE'
            result['Additional Resume'] =
              row.have_additional_resume === true ? 'TRUE' : 'FALSE'
          }

          return result
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

  const getPaymentMethod = () => {
    cmsPaymentTypes().then((data) => {
      let tempPaymentMethods = []
      data.map((paymentType) =>
        paymentType.payment_methods.map((paymentMethod) => {
          tempPaymentMethods = [...tempPaymentMethods, paymentMethod]
        }),
      )

      setPaymentMethods(tempPaymentMethods)
    })
  }

  const getHospitals = () => {
    cmsHospitals({}).then((data) => {
      setAllHospitals(data)
    })
  }

  return {
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    filters,
    setKeyword,
    filterDateType,
    handleChangeFilterDateType,
    exportData,
    isLoading,
    data,
    meta,
    handleChangePage,
    paymentMethod,
    setPaymentMethod,
    paymentMethods,
    hospitals,
    setHospitals,
    allHospitals,
  }
}

export default useAppointmentList
