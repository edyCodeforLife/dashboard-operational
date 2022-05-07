import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import userDetail from '../../services/user/detail'
import { pageShowSnackbar } from '../../redux/actions/page'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { Box, Grid, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../TabPanel'
import Status from '../Status'
import Overview from './Overview'
import Device from './Device'
import Role from './Role'
import AppointmentList from '../AppointmentList'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
    maxWidth: '25%',
  },
}))

const UserDetail = ({ userId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token, role } = useShallowEqualSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [tab, setTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      setIsLoading(true)
      userDetail({ userId, token })
        .then((result) => {
          setData(result)
          setIsLoading(false)
        })
        .catch((error) => {
          setData(null)
          setIsLoading(false)
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
  }, [userId])

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading && !data) {
    return <Notfound />
  }

  return (
    <Box>
      <Box p={2}>
        <Grid container>
          <Grid item xs={11}>
            User ID:{' '}
            <Box fontWeight="bold" component="span">
              {data.ref_id}
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Status
              bgColor={data.status === 'ACTIVE' ? '#27ae60' : '#c0392b'}
              textColor="white"
              status={data.status === 'ACTIVE' ? 'Aktif' : 'Diblokir'}
              statusSystem={data.status}
            />
          </Grid>
        </Grid>
      </Box>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={tab}
          onChange={(_, selectedTab) => setTab(selectedTab)}
          className={classes.tabs}
        >
          <Tab label="Overview" wrapped />
          <Tab label="App. Ongoing" wrapped />
          <Tab label="App. Completed" wrapped />
          <Tab label="App. Refunded" wrapped />
          <Tab label="App. Canceled" wrapped />
          {role === 'SUPER_ADMIN' && <Tab label="Device" wrapped />}
          {role === 'SUPER_ADMIN' && <Tab label="Role" wrapped />}
        </Tabs>
        <Box maxWidth="86%" display="flex" flex={1}>
          <TabPanel value={tab} index={0}>
            <Overview data={data} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <AppointmentList type="ON_GOING" userId={userId} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <AppointmentList
              user
              type="COMPLETED"
              status={['COMPLETED']}
              userId={userId}
            />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <AppointmentList
              type="REFUNDED"
              status={['REFUNDED']}
              userId={userId}
            />
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <AppointmentList type="CANCELED" userId={userId} />
          </TabPanel>
          {role === 'SUPER_ADMIN' && (
            <TabPanel value={tab} index={5}>
              <Device userId={userId} />
            </TabPanel>
          )}
          {role === 'SUPER_ADMIN' && (
            <TabPanel value={tab} index={6}>
              <Role userId={userId} />
            </TabPanel>
          )}
        </Box>
      </div>
    </Box>
  )
}

UserDetail.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserDetail
