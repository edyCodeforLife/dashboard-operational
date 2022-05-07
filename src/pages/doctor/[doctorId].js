import { Card } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DoctorDetail from '../../components/DoctorDetail'
import { useAuthentication } from '../../hooks/useAuthentication'
import { pageSetTitle } from '../../redux/actions/page'

const Detail = () => {
  const { loggedIn } = useAuthentication()
  const router = useRouter()
  const dispatch = useDispatch()
  const { doctorId } = router.query

  useEffect(() => {
    dispatch(pageSetTitle('Doctor Detail'))
  }, [])

  if (!loggedIn || !doctorId) {
    return null
  }

  return (
    <Card>
      <DoctorDetail doctorId={doctorId} />
    </Card>
  )
}

export default Detail
