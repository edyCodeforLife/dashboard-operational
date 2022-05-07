import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useShallowEqualSelector from './useShallowEqualSelector'
import permissions from '../constants/permissions'
import { useDispatch } from 'react-redux'
import { pageShowSnackbar } from '../redux/actions/page'

export const useAuthentication = (redirected = true) => {
  const { loggedIn, token, role } = useShallowEqualSelector(
    (state) => state.user,
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (
      role !== 'SUPER_ADMIN' &&
      !permissions[role]?.includes(router.pathname) &&
      redirected
    ) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'You dont have access to this page!',
          vertical: 'top',
          horizontal: 'right',
        }),
      )
      router.replace('/')
    }
  }, [router.pathname, role])

  useEffect(() => {
    if (!loggedIn && redirected) {
      router.replace('/login')
    }
  }, [loggedIn, token])

  return {
    loggedIn,
    token,
  }
}
