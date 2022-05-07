import { useEffect, useState } from 'react'
import cmsPromotionType from '../../../services/cms/promotionTypes'
import cmsMerchant from '../../../services/cms/promotionMerchants'

const useOption = () => {
  const [statuses, setStatuses] = useState([])
  const [merchants, setMerchants] = useState([])
  const [errorOptions, setErrorOptions] = useState(null)
  const [promotionTypes, setPromotionTypes] = useState([])

  useEffect(async () => {
    try {
      const types = await cmsPromotionType()
      const mapped = types.map((type) => ({
        label: type.name,
        value: type.id,
      }))

      setPromotionTypes(mapped)
    } catch (error) {
      setErrorOptions(error?.message)
    }
  }, [])

  useEffect(async () => {
    try {
      const merchantApi = await cmsMerchant()
      const mapped = merchantApi.map((merchant) => ({
        label: merchant.name,
        value: merchant.id,
      }))

      setMerchants(mapped)
    } catch (error) {
      setErrorOptions(error?.message)
    }
  }, [])

  useEffect(() => {
    setStatuses([
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Released', value: 'RELEASE' },
      { label: 'Deactivated', value: 'DEACTIVATE' },
    ])
  }, [])

  useEffect(
    () => () => {
      setStatuses([])
      setMerchants([])
      setErrorOptions(null)
      setPromotionTypes([])
    },
    [],
  )

  return {
    statuses,
    merchants,
    errorOptions,
    promotionTypes,
  }
}

export default useOption
