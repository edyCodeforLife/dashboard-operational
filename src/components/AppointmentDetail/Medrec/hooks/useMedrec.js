import { useEffect, useState } from 'react'
import { batch } from 'react-redux'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../../redux/actions/page'
import getMedrec from '../../../../services/appointment/getMedrec'
import getPatient from '../../../../services/user/getPatient'
import updatePatient from '../../../../services/user/updatePatient'

const useMedrec = ({ appointmentId, patient, userId }) => {
  const { token } = useShallowEqualSelector((state) => state.user)
  const dispatch = useDispatch()
  const [patientId, setPatientId] = useState('')
  const [ektp, setEktp] = useState(patient.card_id || '')
  const [name, setName] = useState(patient.name || '')
  const [gender, setGender] = useState(patient.gender || '')
  const [birthdate, setBirthdate] = useState(patient.birthdate || '')
  const [medrecs, setMedrecs] = useState([])
  const [externalPatientIds, setExternalPatientIds] = useState({})

  useEffect(() => {
    getPatientData()
  }, [patient, userId])

  const checkMedrec = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const response = await getMedrec({
        appointmentId,
        patientId,
        ektp,
        name,
        gender,
        birthdate,
        token,
      })

      setMedrecs(response)
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      setMedrecs([])
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

  const getPatientData = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const response = await getPatient({
        token,
        patientId: patient.id,
        userId,
      })

      setExternalPatientIds(response?.external_patient_id || {})
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      setMedrecs([])
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

  const updatePatientMedrec = async ({
    firstName,
    lastName,
    externalProvider,
    externalPatientId,
  }) => {
    try {
      dispatch(pageIsBackdropOpen(true))
      await updatePatient({
        token,
        patientId: patient.id,
        params: {
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          external_provider: externalProvider,
          external_patient_id: externalPatientId,
        },
      })
      setMedrecs([])
      getPatientData()
      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: 'Update Medrec Success!',
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
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

  return {
    patientId,
    setPatientId,
    ektp,
    setEktp,
    name,
    setName,
    gender,
    setGender,
    birthdate,
    setBirthdate,
    checkMedrec,
    medrecs,
    externalPatientIds,
    updatePatientMedrec,
  }
}

export default useMedrec
