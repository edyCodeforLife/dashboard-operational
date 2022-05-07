import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../hooks/useAuthentication'
import TransactionList from '../../../components/TransactionList'
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

  return <TransactionList />
}

export default List
