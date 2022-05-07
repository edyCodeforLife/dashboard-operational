import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../../hooks/useAuthentication'
import { pageSetTitle } from '../../../redux/actions/page'
import PromotionDetail from '../../../components/PromotionDetail'

const Detail = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Promotion Program'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <PromotionDetail />
}

export default Detail
