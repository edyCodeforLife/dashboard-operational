import { useEffect, useState } from 'react'
import delay from '../../../helpers/debounce'
import cmsDoctors from '../../../services/cms/doctors'

const useDoctorService = () => {
  const [doctors, setDoctors] = useState([])
  const [keyword, setKeyword] = useState('')

  const getDoctor = async () => {
    try {
      const response = await cmsDoctors({
        keyword,
        perPage: 5,
        showAllDokter: true,
      })
      const mapped = response.data.map((item) => ({
        label: item.name,
        value: item.doctor_id,
      }))

      setDoctors(mapped)
    } catch (e) {
      setDoctors([])
    }
  }

  useEffect(() => getDoctor(), [keyword])

  const findDoctor = delay((value) => setKeyword(value), 700)

  return {
    doctors,
    findDoctor,
  }
}

export default useDoctorService
