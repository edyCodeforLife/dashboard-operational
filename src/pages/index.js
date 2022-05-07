import { Box, Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthentication } from '../hooks/useAuthentication'
import { pageSetTitle } from '../redux/actions/page'

const Home = () => {
  useAuthentication(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageSetTitle('Home'))
  }, [])

  return (
    <Card>
      <Box
        p={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src="https://staging-cms.alteacare.com/assets/images/logo_login.png"
          style={{ height: 50 }}
        />
        <Box mt={3} fontWeight="bold" fontSize={20} textAlign="center">
          Dashboard Operational AlteaCare
        </Box>
      </Box>
    </Card>
  )
}

export default Home
