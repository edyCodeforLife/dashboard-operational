import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import DescriptionIcon from '@material-ui/icons/Description'
import List from '@material-ui/core/List'
import { useRouter } from 'next/router'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw'
import PeopleIcon from '@material-ui/icons/People'
import HomeIcon from '@material-ui/icons/Home'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import LocalOffer from '@material-ui/icons/LocalOffer'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { useDispatch } from 'react-redux'
import { Box, Button } from '@material-ui/core'
import useShallowEqualSelector from '../hooks/useShallowEqualSelector'
import { pageIsDrawerOpen } from '../redux/actions/page'
import Description from '@material-ui/icons/Description'
import Folder from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 275,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
}))

const MenuDrawer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const { isDrawerOpen } = useShallowEqualSelector((state) => state.page)
  const { loggedIn, role } = useShallowEqualSelector((state) => state.user)
  const [open, setOpen] = useState({
    appointment: false,
  })

  const toggleDrawer = () => {
    dispatch(pageIsDrawerOpen(!isDrawerOpen))
  }

  const toggleCollapse = (type) => {
    setOpen({
      ...open,
      [type]: !open[type],
    })
  }

  const list = () => {
    if (!loggedIn) {
      return (
        <div className={clsx(classes.list)} role="presentation">
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box mb={2} fontWeight="bold" textAlign="center">
              Please login first
            </Box>
            <Button
              fullWidth
              onClick={() => {
                toggleDrawer()
                router.push('/login')
              }}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Box>
        </div>
      )
    }

    return (
      <div className={clsx(classes.list)} role="presentation">
        <List>
          <ListItem
            button
            onClick={() => {
              toggleDrawer()
              router.push('/')
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {['MARKETING', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/payment/data-voucher/list')
              }}
            >
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary="Data Voucher" />
            </ListItem>
          )}
          {false && ['MARKETING', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/payment/voucher-transaction/list')
              }}
            >
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Voucher Transaction" />
            </ListItem>
          )}
          {['MARKETING', 'FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/payment/voucher-transaction-v2/list')
              }}
            >
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Voucher Transaction" />
            </ListItem>
          )}
          {['MARKETING', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/promotion')
              }}
            >
              <ListItemIcon>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText primary="Promotion Program" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              toggleDrawer()
              router.push('/appointment/search')
            }}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Appointment" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              toggleDrawer()
              router.push('/user/search')
            }}
          >
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="Search User" />
          </ListItem>
          {['MA', 'PRO', 'FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <ListItem button onClick={() => toggleCollapse('appointment')}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Appointment" />
              {open['appointment'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
          {['MA', 'PRO', 'FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <Collapse in={open['appointment']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    toggleDrawer()
                    router.push('/appointment/ongoing')
                  }}
                >
                  <ListItemText primary="Ongoing" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    toggleDrawer()
                    router.push('/appointment/history')
                  }}
                >
                  <ListItemText primary="Completed" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    toggleDrawer()
                    router.push('/appointment/refunded')
                  }}
                >
                  <ListItemText primary="Refunded" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    toggleDrawer()
                    router.push('/appointment/canceled')
                  }}
                >
                  <ListItemText primary="Canceled" />
                </ListItem>
              </List>
            </Collapse>
          )}
          {['PRO', 'FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <ListItem button onClick={() => toggleCollapse('manual_process')}>
              <ListItemIcon>
                <Rotate90DegreesCcwIcon />
              </ListItemIcon>
              <ListItemText primary="Manual Process" />
              {open['manual_process'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
          {['PRO', 'FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <Collapse in={open['manual_process']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {['PRO', 'SUPER_ADMIN'].includes(role) && (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      toggleDrawer()
                      router.push('/manual/meet-specialist')
                    }}
                  >
                    <ListItemText primary="Set Meet Specialist" />
                  </ListItem>
                )}
                {['FINANCE', 'SUPER_ADMIN'].includes(role) && (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      toggleDrawer()
                      router.push('/manual/confirm-payment')
                    }}
                  >
                    <ListItemText primary="Confirm Manual Transfer" />
                  </ListItem>
                )}
                {['PRO', 'SUPER_ADMIN'].includes(role) && (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      toggleDrawer()
                      router.push('/manual/create-appointment')
                    }}
                  >
                    <ListItemText primary="Manual Create Appointment External" />
                  </ListItem>
                )}
                {['PRO', 'SUPER_ADMIN'].includes(role) && (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      toggleDrawer()
                      router.push('/manual/create-case')
                    }}
                  >
                    <ListItemText primary="Manual Create Case External" />
                  </ListItem>
                )}
                {['PRO', 'SUPER_ADMIN'].includes(role) && (
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      toggleDrawer()
                      router.push('/manual/cancel-appointment')
                    }}
                  >
                    <ListItemText primary="Manual Cancel Appointment External" />
                  </ListItem>
                )}
              </List>
            </Collapse>
          )}
          {['FINANCE', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/invoice/setting')
              }}
            >
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Invoice Setting" />
            </ListItem>
          )}
          {['MA', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/user/list')
              }}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          )}
          {['MA', 'SUPER_ADMIN'].includes(role) && (
            <ListItem
              button
              onClick={() => {
                toggleDrawer()
                router.push('/doctor/list')
              }}
            >
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText primary="Doctor" />
            </ListItem>
          )}
          {['SUPER_ADMIN'].includes(role) && (
            <ListItem button onClick={() => toggleCollapse('report')}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
              {open['report'] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          )}
          {['SUPER_ADMIN'].includes(role) && (
            <Collapse in={open['report']} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    toggleDrawer()
                    router.push('/report/socket-room')
                  }}
                >
                  <ListItemText primary="Socket Room" />
                </ListItem>
              </List>
            </Collapse>
          )}
        </List>
      </div>
    )
  }

  return (
    <div>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </div>
  )
}

export default MenuDrawer
