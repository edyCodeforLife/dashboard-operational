import { useEffect, useState } from 'react'
import cmsHospitals from '../../../services/cms/hospitals'
import cmsPromoType from '../../../services/cms/promotionTypes'
import cmsPromoMerchant from '../../../services/cms/promotionMerchants'
import voucherListApi from '../../../services/marketing/voucherList'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'

const useOption = () => {
  const [error, setError] = useState('')
  const [types, setTypes] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [merchants, setMerchants] = useState([])
  const [vouchers, setVouchers] = useState([])
  const [voucherCode, setVoucherCode] = useState('')
  const [deeplinkTypes, setDeeplinkTypes] = useState([])

  const { token } = useShallowEqualSelector((state) => state.user)

  useEffect(async () => {
    try {
      const promoTypes = await cmsPromoType()
      const mapped = promoTypes.map((item) => ({
        label: item.name,
        value: item.id,
      }))

      setTypes(mapped)
    } catch (err) {
      setError(err?.message || err)
    }
  }, [])

  useEffect(async () => {
    try {
      const promoMerchats = await cmsPromoMerchant()
      const mapped = promoMerchats.map((item) => ({
        label: item.name,
        value: item.id,
      }))

      setMerchants(mapped)
    } catch (err) {
      setError(err?.message || err)
    }
  }, [])

  const getVoucherList = async (payloadVoucherCode = '') => {
    try {
      const params = { voucher_flag: 'SINGLE' }

      if (payloadVoucherCode !== '') params.voucher_code = payloadVoucherCode
      else delete params.voucher_code

      const promoVouchers = await voucherListApi({
        token,
        params,
      })
      const mapped = promoVouchers?.data?.map((item) => ({
        label: item.voucher_code,
        value: item.id,
      }))

      setVouchers(mapped)
    } catch (err) {
      setError(err?.message)
    }
  }

  useEffect(async () => {
    try {
      const hospitalApi = await cmsHospitals({ keyword: '' })
      const mapped = hospitalApi.map((item) => ({
        label: item.name,
        value: item.name,
      }))

      setHospitals(mapped)
    } catch (e) {
      setError(e?.message)
    }
  }, [])

  useEffect(() => {
    setDeeplinkTypes([
      { value: 'WEB', label: 'Web' },
      { value: 'ANDROID', label: 'Android' },
      { value: 'IOS', label: 'IOS' },
    ])
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      getVoucherList(voucherCode)
    }, 700)

    return () => {
      if (debounce) {
        clearTimeout(debounce)
      }
    }
  }, [voucherCode])

  useEffect(
    () => () => {
      setError('')
      setTypes([])
      setVoucherCode('')
      setHospitals([])
      setMerchants([])
      setVouchers([])
      setDeeplinkTypes([])
    },
    [],
  )

  return {
    error,
    types,
    vouchers,
    merchants,
    hospitals,
    deeplinkTypes,
    voucherCode,
    setVoucherCode,
  }
}

export default useOption
