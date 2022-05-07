import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Notfound from '../Notfound'

const Call = ({ calls = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Method</TableCell>
            <TableCell align="center">Users</TableCell>
            <TableCell align="center">Started At</TableCell>
            <TableCell align="center">Answered At</TableCell>
            <TableCell align="center">Latest Status</TableCell>
            <TableCell align="center">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {calls.length === 0 && (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={7}>
                <Notfound />
              </TableCell>
            </TableRow>
          )}
          {calls
            .sort((a, b) => a.id - b.id)
            .map((call) => {
              let startedAt = null
              let endedAt = null
              let userA = call.users[0]?.userDetail
                ? `${call.users[0]?.userDetail?.first_name} ${call.users[0]?.userDetail?.last_name} (${call.users[0]?.userDetail?.ref_id})`
                : '-'
              let userB = call.users[call.users.length - 1]?.userDetail
                ? `${
                    call.users[call.users.length - 1]?.userDetail?.first_name
                  } ${
                    call.users[call.users.length - 1]?.userDetail?.last_name
                  } (${call.users[call.users.length - 1]?.userDetail?.ref_id})`
                : '-'

              call.call_logs
                .sort((a, b) => a.id - b.id)
                .map((callLog) => {
                  if (!startedAt) {
                    startedAt = callLog.createdAt
                  }

                  endedAt = callLog.createdAt
                })

              return (
                <TableRow key={call.id}>
                  <TableCell align="center">{call.id}</TableCell>
                  <TableCell align="center">{call.method}</TableCell>
                  <TableCell align="center">
                    <div>{userA}</div>
                    <div>{userB}</div>
                  </TableCell>
                  <TableCell align="center">
                    {moment(startedAt).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">
                    {moment(endedAt).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">{call.status}</TableCell>
                  <TableCell align="center">
                    {moment(call.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Call.propTypes = {
  calls: PropTypes.array.isRequired,
}

export default Call
