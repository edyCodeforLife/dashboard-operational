import { useEffect, useState } from 'react'
import delay from '../../../helpers/debounce'
import patientList from '../../../services/user/patients'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'

const usePatientService = () => {
  const [patients, setPatients] = useState([])
  const [keyword, setKeyword] = useState('')
  const { token } = useShallowEqualSelector((state) => state.user)

  const getPatient = async () => {
    try {
      const response = await patientList({ token })
      const mapped = response.patient.map((item) => ({
        label: item.name,
        value: item.patient_id,
      }))

      setPatients(mapped)
    } catch (e) {
      setPatients([])
    }
  }

  useEffect(() => getPatient(), [keyword])

  const findPatient = delay((value) => setKeyword(value), 700)

  return {
    patients,
    findPatient,
  }
}

export default usePatientService
