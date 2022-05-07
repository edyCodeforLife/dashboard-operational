import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../../hooks/useAuthentication'
import { pageSetTitle } from '../../../../redux/actions/page'
import VoucherForm from '../../../../components/VoucherForm'

const Edit = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Voucher Update'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <VoucherForm />
}

export default Edit
