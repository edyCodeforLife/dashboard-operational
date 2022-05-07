import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Box, Button, Container, Menu, MenuItem } from '@material-ui/core'
import useShallowEqualSelector from '../hooks/useShallowEqualSelector'
import Snackbar from '../components/Snackbar'
import { AccountCircle } from '@material-ui/icons'
import { batch, useDispatch } from 'react-redux'
import {
  userSetHospitals,
  userSetLoggedIn,
  userSetProfile,
  userSetRole,
  userSetToken,
} from '../redux/actions/user'
import { pageIsDrawerOpen, pageShowSnackbar } from '../redux/actions/page'
import MenuDrawer from '../components/MenuDrawer'
import { Breadcrumb } from '../components/Breadcrumb'
import userLogout from '../services/user/logout'
import FullLoader from '../components/FullLoader'
import userMe from '../services/user/me'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { title, isSnackbarOpen, snackbarOption } = useShallowEqualSelector(
    (state) => state.page,
  )
  const { loggedIn, token, profile } = useShallowEqualSelector(
    (state) => state.user,
  )
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (loggedIn && token) {
      getProfile()
    }
  }, [loggedIn, token])

  const getProfile = () => {
    userMe({ token })
      .then((response) => {
        dispatch(userSetProfile(response))
      })
      .catch((error) => {
        if (
          error.message?.toLowerCase().includes('jwt expired') ||
          error.message
            ?.toLowerCase()
            .includes('your account is not verified') ||
          error.message?.toLowerCase().includes('token access expired') ||
          error.message?.toLowerCase().includes('invalid signature')
        ) {
          batch(() => {
            dispatch(userSetToken(null))
            dispatch(userSetRole(null))
            dispatch(userSetHospitals([]))
            dispatch(userSetLoggedIn(false))
          })
        }
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = () => {
    dispatch(pageIsDrawerOpen(true))
  }

  const logout = () => {
    userLogout({ token })
      .then(() => {
        batch(() => {
          dispatch(userSetToken(null))
          dispatch(userSetRole(null))
          dispatch(userSetHospitals([]))
          dispatch(userSetLoggedIn(false))
          dispatch(
            pageShowSnackbar({
              severity: 'success',
              message: 'Logout Success',
              vertical: 'top',
              horizontal: 'right',
            }),
          )
        })
        handleClose()
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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>{title} - Dashboard Operational</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              onClick={toggleDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              {title}
            </Typography>
            {!loggedIn && (
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
            )}
            {loggedIn && (
              <div>
                {`${profile?.first_name || ''} ${profile?.last_name || ''}`}
                <IconButton onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box flex={1}>
        <Container maxWidth="lg">
          <Box p={3}>
            <Breadcrumb />
            <Box mt={2}>{children}</Box>
          </Box>
        </Container>
      </Box>
      <MenuDrawer />
      <FullLoader />
      {isSnackbarOpen && <Snackbar {...snackbarOption} open={isSnackbarOpen} />}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
