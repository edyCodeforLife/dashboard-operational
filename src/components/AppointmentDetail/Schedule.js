import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import Notfound from '../Notfound'
import { Tooltip } from '@material-ui/core'

const Schedule = ({ schedules = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Schedule Date</TableCell>
            <TableCell align="center">Schedule Time</TableCell>
            <TableCell align="center">Provider</TableCell>
            <TableCell align="center">Approved By</TableCell>
            <TableCell align="center">Canceled By</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Selected</TableCell>
            <TableCell align="center">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.length === 0 && (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={9}>
                <Notfound />
              </TableCell>
            </TableRow>
          )}
          {schedules
            .sort((a, b) => b.id - a.id)
            .map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell align="center">{schedule.id}</TableCell>
                <TableCell align="center">
                  <Tooltip title={`Type: ${schedule.scheduleCode}`} arrow>
                    <div>{schedule.date}</div>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{`${moment(
                  schedule.startTime,
                  'HH:mm',
                ).format('HH:mm')} - ${moment(schedule.endTime, 'HH:mm').format(
                  'HH:mm',
                )}`}</TableCell>
                <TableCell align="center">
                  {schedule.scheduleProvider}
                </TableCell>
                <TableCell align="center">
                  {schedule.approvedUserDetail
                    ? `${schedule.approvedUserDetail.first_name} ${schedule.approvedUserDetail.last_name} (${schedule.approvedUserDetail.ref_id})`
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {schedule.canceledUserDetail
                    ? `${schedule.canceledUserDetail.first_name} ${schedule.canceledUserDetail.last_name} (${schedule.canceledUserDetail.ref_id})`
                    : '-'}
                </TableCell>
                <TableCell align="center">{schedule.status}</TableCell>
                <TableCell align="center">
                  {`${schedule.selected}`.toUpperCase()}
                </TableCell>
                <TableCell align="center">
                  {moment(schedule.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Schedule.propTypes = {
  schedules: PropTypes.array.isRequired,
}

export default Schedule
