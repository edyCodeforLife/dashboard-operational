import React, { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { pageSetTitle, pageShowSnackbar } from '../redux/actions/page'
import userLogin from '../services/user/login'
import {
  userSetLoggedIn,
  userSetRole,
  userSetToken,
} from '../redux/actions/user'
import useShallowEqualSelector from '../hooks/useShallowEqualSelector'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loggedIn } = useShallowEqualSelector((state) => state.user)
  const [values, setValues] = useState({
    role: 'MA',
  })

  useEffect(() => {
    dispatch(pageSetTitle('Login'))
  }, [])

  useEffect(() => {
    if (loggedIn) {
      router.replace('/')
    }
  }, [loggedIn])

  const onSubmit = (e) => {
    e.preventDefault()

    userLogin(values)
      .then((response) => {
        batch(() => {
          dispatch(
            pageShowSnackbar({
              severity: 'success',
              message: 'Login Success',
              vertical: 'top',
              horizontal: 'right',
            }),
          )
          dispatch(userSetRole(values.role))
          dispatch(userSetToken(response.access_token))
          dispatch(userSetLoggedIn(true))
        })
      })
      .catch((error) => {
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
      })
  }

  const handleInputValue = (e) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  if (loggedIn) {
    return null
  }

  return (
    <Box
      height="65vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <Box paddingX={5} paddingY={4}>
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <img
              src="https://staging-cms.alteacare.com/assets/images/logo_login.png"
              style={{ height: 50 }}
            />
            <Box pt={2} pb={2}>
              <h3>Login Dashboard Operational</h3>
            </Box>
            <TextField
              required
              name="email"
              type="email"
              label="Email"
              onBlur={handleInputValue}
              onChange={handleInputValue}
              style={{ width: '100%' }}
            />
            <TextField
              required
              name="password"
              type="password"
              label="Password"
              onBlur={handleInputValue}
              onChange={handleInputValue}
              style={{ width: '100%', marginTop: 20 }}
            />
            <Box width="100%" mt={2} style={{ textAlign: 'left' }}>
              <InputLabel id="role" style={{ fontSize: 12 }}>
                Role
              </InputLabel>
              <Select
                name="role"
                labelId="role"
                value={values.role}
                onChange={handleInputValue}
                style={{ width: '100%', marginTop: 5 }}
              >
                <MenuItem value="MA">Medical Advisor</MenuItem>
                <MenuItem value="PRO">PRO</MenuItem>
                <MenuItem value="CUSTOMER_SERVICE">Customer Service</MenuItem>
                <MenuItem value="FINANCE">Finance</MenuItem>
                <MenuItem value="MARKETING">Marketing</MenuItem>
                <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
              </Select>
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  )
}

export default Login
