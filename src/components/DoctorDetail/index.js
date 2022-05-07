import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import cmsDoctorDetail from '../../services/cms/doctorDetail'
import { pageShowSnackbar } from '../../redux/actions/page'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { Box, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../TabPanel'
import Overview from './Overview'

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

const DoctorDetail = ({ doctorId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (doctorId) {
      setIsLoading(true)
      cmsDoctorDetail({ doctorId })
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
  }, [doctorId])

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading && !data) {
    return <Notfound />
  }

  return (
    <Box>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={tab}
          onChange={(_, selectedTab) => setTab(selectedTab)}
          className={classes.tabs}
        >
          <Tab label="Overview" wrapped />
        </Tabs>
        <Box maxWidth="86%" display="flex" flex={1}>
          <TabPanel value={tab} index={0}>
            <Overview data={data} />
          </TabPanel>
        </Box>
      </div>
    </Box>
  )
}

DoctorDetail.propTypes = {
  doctorId: PropTypes.string.isRequired,
}

export default DoctorDetail
