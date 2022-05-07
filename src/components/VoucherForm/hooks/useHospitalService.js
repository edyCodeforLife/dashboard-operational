import { useEffect, useState } from 'react'
import delay from '../../../helpers/debounce'
import cmsHospitals from '../../../services/cms/hospitals'

const useHospitalService = () => {
  const [hospitals, setHospital] = useState([])
  const [keyword, setKeyword] = useState('')

  const getHospital = async () => {
    try {
      const response = await cmsHospitals({ keyword })
      const mapped = response.map((item) => ({
        label: item.name,
        value: item.hospital_id,
      }))
      setHospital(mapped)
    } catch (e) {
      setHospital([])
    }
  }

  useEffect(() => getHospital(), [keyword])

  const findHospital = delay((value) => setKeyword(value), 700)

  return {
    hospitals,
    setHospital,
    findHospital,
  }
}

export default useHospitalService
