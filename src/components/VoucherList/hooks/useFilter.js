import { useState } from 'react'

const useFilter = () => {
  const [voucherFlags] = useState([
    { value: 'SINGLE', label: 'Single' },
    { value: 'MULTIPLE', label: 'Multiple' },
  ])

  const [typeOfServices] = useState([
    { value: 'LAYANAN_MEDIS', label: 'Layanan Medis' },
    { value: 'TELEKONSULTASI', label: 'Telekonsultasi' },
    { value: 'FARMASI', label: 'Farmasi' },
    { value: 'PENGIRIMAN_OBAT', label: 'Pengiriman Obat' },
  ])

  const [amountFlags] = useState([
    { value: 'FIX_AMOUNT', label: 'Fix Amount' },
    { value: 'PERCENTAGE', label: 'Percentage' },
  ])

  return {
    amountFlags,
    voucherFlags,
    typeOfServices,
  }
}

export default useFilter
