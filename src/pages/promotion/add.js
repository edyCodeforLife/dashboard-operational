import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'
import PromotionForm from '../../components/PromotionForm'

const Add = () => {
  const { loggedIn } = useAuthentication()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Promotion Program'))
  }, [])

  if (!loggedIn) {
    return null
  }

  return <PromotionForm />
}

export default Add
