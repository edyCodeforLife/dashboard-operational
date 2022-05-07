import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import socketDetailRoom from '../../services/socket/detailRoom'
import { pageShowSnackbar } from '../../redux/actions/page'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { Box, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../TabPanel'
import Overview from './Overview'
import User from './User'
import Log from './Log'

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

const SocketRoomDetail = ({ roomId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [tab, setTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (roomId) {
      setIsLoading(true)
      socketDetailRoom({ roomId, token })
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
  }, [roomId])

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading && !data) {
    return <Notfound />
  }

  return (
    <Box>
      <Box p={2}>
        Room ID:{' '}
        <Box fontWeight="bold" component="span">
          {data.id}
        </Box>
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
          <Tab label="User" wrapped />
          <Tab label="Log" wrapped />
        </Tabs>
        <Box maxWidth="86%" display="flex" flex={1}>
          <TabPanel value={tab} index={0}>
            <Overview data={data} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <User users={data?.users || []} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Log logs={data?.logs || []} />
          </TabPanel>
        </Box>
      </div>
    </Box>
  )
}

SocketRoomDetail.propTypes = {
  roomId: PropTypes.string.isRequired,
}

export default SocketRoomDetail
