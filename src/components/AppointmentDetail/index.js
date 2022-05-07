import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import appointmentDetail from '../../services/appointment/detail'
import { pageShowSnackbar } from '../../redux/actions/page'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { Box, Grid, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../TabPanel'
import Status from '../Status'
import History from './History'
import Schedule from './Schedule'
import Transaction from './Transaction'
import Fee from './Fee'
import Attachment from './Attachment'
import External from './External'
import ExternalHistory from './ExternalHistory'
import Overview from './Overview'
import Action from './Action'
import SocketRoom from '../SocketRoom'

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

const AppointmentDetail = ({ appointmentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [tab, setTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (appointmentId) {
      setIsLoading(true)
      appointmentDetail({ appointmentId, token })
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
  }, [appointmentId])

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
            Order ID:{' '}
            <Box fontWeight="bold" component="span">
              {data.order_code}
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Status
              bgColor={data.status_detail.bg_color}
              textColor={data.status_detail.text_color}
              status={data.status_detail.label}
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
          <Tab label="Schedule" wrapped />
          <Tab label="Transaction" wrapped />
          <Tab label="Fee" wrapped />
          <Tab label="History" wrapped />
          <Tab label="Attachment" wrapped />
          <Tab label="Socket Room" wrapped />
          <Tab label="External" wrapped />
          <Tab label="External History" wrapped />
          <Tab label="Action" wrapped />
        </Tabs>
        <Box maxWidth="86%" display="flex" flex={1}>
          <TabPanel value={tab} index={0}>
            <Overview data={data} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Schedule schedules={data.detail.schedules} />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Transaction
              transactions={data.detail.transactions}
              billingVersion={data.billing_version}
            />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <Fee fees={data.fees} billingVersion={data.billing_version} />
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <History histories={data.history} />
          </TabPanel>
          <TabPanel value={tab} index={5}>
            <Attachment attachments={data.medical_document} />
          </TabPanel>
          <TabPanel value={tab} index={6}>
            <SocketRoom
              params={{
                relationType: 'APPOINTMENT',
                relationId: data.id,
                dateRange: '',
              }}
            />
          </TabPanel>
          <TabPanel value={tab} index={7}>
            <External externals={data.detail.externals} />
          </TabPanel>
          <TabPanel value={tab} index={8}>
            <ExternalHistory
              externalHistories={data.detail.external_histories}
            />
          </TabPanel>
          <TabPanel value={tab} index={9}>
            <Action data={data} />
          </TabPanel>
        </Box>
      </div>
    </Box>
  )
}

AppointmentDetail.propTypes = {
  appointmentId: PropTypes.string.isRequired,
}

export default AppointmentDetail
