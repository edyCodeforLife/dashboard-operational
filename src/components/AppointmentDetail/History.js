import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import Paper from '@material-ui/core/Paper'
import Notfound from '../Notfound'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const History = ({ histories = [] }) => {
  const classes = useStyles()

  if (histories.length === 0) {
    return <Notfound message="History not found" />
  }

  return (
    <Timeline align="alternate">
      {histories.map((history) => {
        return (
          <TimelineItem key={history.id}>
            <TimelineSeparator>
              <Box
                width={40}
                height={40}
                borderRadius={20}
                border="2px solid grey"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <img src={history.icon} style={{ width: 25, height: 25 }} />
              </Box>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Box fontWeight="bold">{history.label}</Box>
                <Box>{history.description}</Box>
                <Box fontSize={12} mt={1}>
                  {moment(history.created).format('DD/MM/YYYY HH:mm:ss')}
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

History.propTypes = {
  histories: PropTypes.array.isRequired,
}

export default History
