import { useEffect, useState } from 'react'
import delay from '../../../helpers/debounce'
import cmsSpecializations from '../../../services/cms/specializations'

const useSpecializationService = () => {
  const [specializations, setSpecializations] = useState([])
  const [keyword, setKeyword] = useState('')

  const getSymtom = async () => {
    try {
      const response = await cmsSpecializations({ keyword })
      const mapped = response.map((item) => ({
        label: item.name,
        value: item.specialization_id,
      }))
      setSpecializations(mapped)
    } catch (e) {
      setSpecializations([])
    }
  }

  useEffect(() => getSymtom(), [keyword])

  const findSpecialization = delay((value) => setKeyword(value), 700)

  return {
    specializations,
    findSpecialization,
  }
}

export default useSpecializationService
