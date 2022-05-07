import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../../hooks/useAuthentication'
import { pageSetTitle } from '../../../../redux/actions/page'
import VoucherDetail from '../../../../components/VoucherDetail'

const Detail = () => {
  const { loggedIn } = useAuthentication()
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query

  useEffect(() => {
    dispatch(pageSetTitle('Voucher Detail'))
  }, [])

  if (!loggedIn || !id) {
    return null
  }

  return <VoucherDetail voucherId={id} />
}

export default Detail
