import { useState } from 'react'

const useValidator = () => {
  const [error, setError] = useState({
    voucherFlag: '',
    voucherCode: '',
    promoCombination: '',
    minimumTransaction: '',
    amountFlag: '',
    voucherAmount: '',
    maximumAmount: '',
    beginEffectiveDate: '',
    specialistCategoryIds: '',
    doctorIds: '',
    patientIds: '',
    hospitalIds: '',
    amountCoveredByMarketing: '',
    amountCoveredByDoctor: '',
    amountCoveredByHospital: '',
    endEffectiveDate: '',
    typeOfService: '',
    usePerCustomer: '',
    usePerDiscount: '',
    voucherGenerate: '',
  })
  const [reset] = useState(error)

  const amountValidator = (params) => {
    const doctor = params?.amountCoveredByDoctor || 0
    const hospital = params?.amountCoveredByHospital || 0
    const marketing = params?.amountCoveredByMarketing || 0
    const totalCalculate =
      parseFloat(doctor) + parseFloat(hospital) + parseFloat(marketing)

    const condition =
      totalCalculate !== parseInt(params?.voucherAmount) &&
      params?.voucherAmount

    if (condition) {
      const msg = 'Amount covered by msg must be same as voucher amount'
      setError({
        ...error,
        amountCoveredByMarketing: msg.replace('msg', 'marketing'),
        amountCoveredByDoctor: msg.replace('msg', 'doctor'),
        amountCoveredByHospital: msg.replace('msg', 'hospital'),
      })
    } else {
      setError(reset)
    }
  }

  return {
    error,
    setError,
    amountValidator,
  }
}

export default useValidator
