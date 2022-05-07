import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../../redux/actions/page'
import setting from '../../../../services/cms/setting'
import updateRoom from '../../../../services/appointment/updateRoom'

export const useUpdateRoom = ({
  appointmentId,
  defaultVideoCallProvider,
  setTypeModal,
}) => {
  const { token } = useShallowEqualSelector((state) => state.user)
  const dispatch = useDispatch()
  const [videoCallProviders, setVideoCallProviders] = useState([])
  const [videoCallProvider, setVideoCallProvider] = useState(
    defaultVideoCallProvider || null,
  )

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setting()
      .then((response) => {
        setVideoCallProviders(response.video_call_providers)
      })
      .catch((error) => {
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

  const processUpdateRoom = () => {
    dispatch(pageIsBackdropOpen(true))
    updateRoom({
      appointmentId,
      videoCallProvider,
      token,
    })
      .then(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: 'Room  updated',
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
        setTypeModal(null)
      })
      .catch((error) => {
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
  }

  return {
    videoCallProvider,
    videoCallProviders,
    setVideoCallProvider,
    processUpdateRoom,
  }
}
