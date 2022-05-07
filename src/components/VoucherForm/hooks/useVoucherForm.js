import moment from 'moment'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import useValidator from './useValidator'
import { pageShowSnackbar } from '../../../redux/actions/page'
import saveVoucher from '../../../services/marketing/saveVoucher'
import objectToSnakeCase from '../../../helpers/snakecase-converter'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import voucherDetail from '../../../services/marketing/voucherDetail'
import updateVoucher from '../../../services/marketing/updateVoucher'

const useVoucherForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [params, setParams] = useState(null)
  const [detailed, setDetailed] = useState(null)
  const [voucherId, setVoucherId] = useState(null)
  const { amountValidator, error } = useValidator()
  const [doctorSelected, setDoctorSelected] = useState([])
  const [patientSelected, setPatientSelected] = useState([])
  const [hospitalSelected, setHospitalSelected] = useState([])
  const { token } = useShallowEqualSelector((state) => state.user)
  const [specializationSelected, setSpecializationSelected] = useState([])
  const [voucherFlags] = useState([
    { value: '', label: 'Silahkan Pilih Voucher Flag' },
    { value: 'SINGLE', label: 'Single' },
    { value: 'MULTIPLE', label: 'Multiple' },
  ])

  const [typeOfServices] = useState([
    { value: '', label: 'Silahkan Pilih Type Of Service' },
    { value: 'LAYANAN_MEDIS', label: 'Layanan Medis' },
    { value: 'TELEKONSULTASI', label: 'Telekonsultasi' },
    { value: 'FARMASI', label: 'Farmasi' },
    { value: 'PENGIRIMAN_OBAT', label: 'Pengiriman Obat' },
  ])

  const [amountFlags] = useState([
    { value: '', label: 'Silahkan Pilih Amount Flag' },
    { value: 'FIX_AMOUNT', label: 'Fix Amount' },
    { value: 'PERCENTAGE', label: 'Percentage' },
  ])

  useEffect(() => amountValidator(params), [params])

  useEffect(() => {
    const maxAmountCondition =
      params?.amountFlag === 'FIX_AMOUNT' &&
      parseInt(params?.maximumAmount) !== parseInt(params?.voucherAmount)

    if (maxAmountCondition) {
      setParams({ ...params, maximumAmount: params?.voucherAmount })
    }

    if (params?.amountFlag === 'PERCENTAGE' && params?.voucherAmount >= 100) {
      setParams({ ...params, voucherAmount: 100 })
    }
  }, [params?.amountFlag, params?.voucherAmount, params?.maximumAmount])

  const handleParams = (input, identifier) => {
    setParams({ ...params, [`${identifier}`]: input.target.value })
  }

  const handleDateInput = (input, identifier) => {
    setParams({
      ...params,
      [`${identifier}`]: moment(input).format('YYYY-MM-DD HH:mm'),
    })
  }

  const shouldRemove = (parameter) => {
    delete parameter.voucherFlag
    delete parameter.voucherCode
  }

  const handleSave = async () => {
    try {
      const parameter = { ...params }
      parameter.promoCombination = !!parameter.promoCombination
      if (voucherId) shouldRemove(parameter)
      const payload = objectToSnakeCase(parameter)

      if (voucherId) await updateVoucher({ params: payload, token, voucherId })
      else await saveVoucher({ params: payload, token })
      dispatch(
        pageShowSnackbar({
          severity: 'success',
          message: `Voucher berhasil di ${voucherId ? 'perbarui' : 'buat'}`,
          vertical: 'top',
          horizontal: 'right',
          autoHideDuration: 2000,
        }),
      )
    } catch (err) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: err.message,
          vertical: 'top',
          horizontal: 'right',
        }),
      )
    }
  }

  useEffect(() => {
    setParams({
      ...params,
      doctorIds: doctorSelected?.map((item) => item.value),
      patientIds: patientSelected?.map((item) => item.value),
      hospitalIds: hospitalSelected?.map((item) => item.value),
      specialistCategoryIds: specializationSelected?.map((item) => item.value),
    })
  }, [
    doctorSelected,
    hospitalSelected,
    patientSelected,
    specializationSelected,
  ])

  const getDetailVoucher = async (voucherId) => {
    try {
      const detail = await voucherDetail({ voucherId, token })
      setDetailed(detail)

      const begin = moment(
        detail.begin_effective_date,
        'DD-MM-YYYY HH:mm:ss',
      ).format('YYYY-MM-DD HH:mm')

      const end = moment(
        detail.end_effective_date,
        'DD-MM-YYYY HH:mm:ss',
      ).format('YYYY-MM-DD HH:mm')

      setParams({
        ...params,
        haveTransaction: detail.have_transaction,
        voucherFlag: detail.voucher_flag,
        voucherCode: detail.voucher_code,
        promoCombination: detail.promoCombination ? '1' : '0',
        minimumTransaction: detail.minimum_transaction || 0,
        amountFlag: detail.amount_flag,
        voucherAmount: detail.voucher_amount,
        maximumAmount: detail.maximum_amount,
        amountCoveredByDoctor: detail.amount_covered_by_doctor,
        amountCoveredByHospital: detail.amount_covered_by_hospital,
        amountCoveredByMarketing: detail.amount_covered_by_marketing,
        beginEffectiveDate: begin,
        endEffectiveDate: end,
        usePerCustomer: detail.use_per_customer,
        usePerDiscount: detail.use_per_discount,
        typeOfService: detail.type_of_service,
      })

      setHospitalSelected(() =>
        detail.hospitals?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      )

      setDoctorSelected(() =>
        detail.doctors?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      )

      setPatientSelected(() =>
        detail.patients?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      )

      setSpecializationSelected(() =>
        detail.specialists?.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      )
    } catch (err) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: err.message,
          vertical: 'top',
          horizontal: 'right',
        }),
      )
    }
  }

  useEffect(() => {
    if (voucherId && params?.usePerDiscount <= detailed.use_per_discount) {
      setParams({
        ...params,
        usePerDiscount: detailed.use_per_discount,
      })
    }
  }, [params?.usePerDiscount])

  useEffect(() => {
    if (voucherId && params?.usePerCustomer <= detailed.use_per_customer) {
      setParams({
        ...params,
        usePerCustomer: detailed.use_per_customer,
      })
    }
  }, [params?.usePerCustomer])

  useEffect(() => {
    const { id } = router.query
    if (id) {
      setVoucherId(id)
      getDetailVoucher(id)
    }
  }, [router])

  // clean function
  useEffect(() => () => setParams(null), [])

  return {
    error,
    params,
    voucherId,
    handleSave,
    amountFlags,
    handleParams,
    voucherFlags,
    doctorSelected,
    typeOfServices,
    patientSelected,
    handleDateInput,
    hospitalSelected,
    setDoctorSelected,
    setPatientSelected,
    setHospitalSelected,
    specializationSelected,
    setSpecializationSelected,
  }
}

export default useVoucherForm
