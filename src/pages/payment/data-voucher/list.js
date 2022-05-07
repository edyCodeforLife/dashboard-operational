import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { pageSetTitle } from '../../../redux/actions/page'
import VoucherList from '../../../components/VoucherList'

const List = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Data Voucher'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <VoucherList />
}

export default List
