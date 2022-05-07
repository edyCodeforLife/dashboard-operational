import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../../hooks/useShallowEqualSelector'
import { pageShowSnackbar } from '../../../../redux/actions/page'
import userDevice from '../../../../services/user/device'
import userRevokeDevice from '../../../../services/user/revokeDevice'

const useUserDevice = ({ userId }) => {
  const { token } = useShallowEqualSelector((state) => state.user)
  const dispatch = useDispatch()
  const [devices, setDevices] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [deviceId, setDeviceId] = useState(null)

  const [meta, setMeta] = useState(null)

  useEffect(() => {
    if (userId && page) {
      getData()
    }
  }, [userId, page])

  const getData = () => {
    setIsLoading(true)
    userDevice({ userId, page, token })
      .then((result) => {
        setDevices(result.devices)
        setMeta(result.meta)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1)
  }

  const revokeDevice = () => {
    setIsConfirmDialogOpen(false)
    userRevokeDevice({ userId, deviceId, token })
      .then(() => {
        setPage(null)
        setTimeout(() => {
          setPage(1)
        }, 100)

        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: `Device: "${deviceId}" success to revoked access`,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
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

  return {
    devices,
    isLoading,
    page,
    setPage,
    meta,
    setMeta,
    handleChangePage,
    revokeDevice,
    deviceId,
    setDeviceId,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
  }
}

export default useUserDevice
