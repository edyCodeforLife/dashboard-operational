import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../hooks/useAuthentication'
import TransactionListV2 from '../../../components/TransactionListV2'
import { pageSetTitle } from '../../../redux/actions/page'

const List = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Voucher Transaction'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <TransactionListV2 />
}

export default List
