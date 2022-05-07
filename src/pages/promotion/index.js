import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PromotionList from '../../components/PromotionList'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Ongoing = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Promotion Program'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <PromotionList />
}

export default Ongoing
