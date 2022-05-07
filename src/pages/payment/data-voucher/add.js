import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { pageSetTitle } from '../../../redux/actions/page'
import VoucherForm from '../../../components/VoucherForm'

const Add = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Voucher Add'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <VoucherForm />
}

export default Add
