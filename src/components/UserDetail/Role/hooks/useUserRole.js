import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../../hooks/useShallowEqualSelector'
import { pageShowSnackbar } from '../../../../redux/actions/page'
import userRole from '../../../../services/user/role'
import userUpdateRole from '../../../../services/user/updateRole'

export const useUserRole = ({ userId }) => {
  const { token } = useShallowEqualSelector((state) => state.user)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [currentRoles, setCurrentRoles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (userId) {
      getData()
    }
  }, [userId])

  useEffect(() => {
    getCurrentRoles()
  }, [data])

  const getData = () => {
    userRole({ token, userId })
      .then((response) => {
        setData(response)
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

  const getCurrentRoles = () => {
    const tempCurrentRoles = data
      .filter((v) => v.status === 'ACTIVE')
      .map((v) => {
        return v.role
      })

    setCurrentRoles(tempCurrentRoles)
  }

  const updateRoles = () => {
    if (currentRoles.length === 0) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'Minimum 1 role',
          vertical: 'top',
          horizontal: 'right',
        }),
      )

      return
    }

    setIsModalOpen(false)

    userUpdateRole({ userId, token, roles: currentRoles })
      .then(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: 'Role success to updated',
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        getData()
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
    data,
    isModalOpen,
    setIsModalOpen,
    currentRoles,
    setCurrentRoles,
    updateRoles,
    getCurrentRoles,
  }
}
