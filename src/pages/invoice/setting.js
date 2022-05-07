import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'
import InvoiceSetting from '../../components/InvoiceSetting'

const Setting = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Pengaturan Invoice'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <InvoiceSetting />
}

export default Setting
