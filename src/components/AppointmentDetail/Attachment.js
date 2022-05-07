import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Box } from '@material-ui/core'
import Notfound from '../Notfound'

const Attachment = ({ attachments = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">File ID</TableCell>
            <TableCell align="center">File Name</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Uploaded By</TableCell>
            <TableCell align="center">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attachments.length === 0 && (
            <TableRow>
              <TableCell component="th" scope="row" colSpan={7}>
                <Notfound />
              </TableCell>
            </TableRow>
          )}
          {attachments
            .sort((a, b) => b.id - a.id)
            .map((attachment) => (
              <TableRow key={attachment.id}>
                <TableCell align="center">{attachment.id}</TableCell>
                <TableCell align="center">{attachment.type || '-'}</TableCell>
                <TableCell align="center">{attachment.file_id}</TableCell>
                <TableCell align="center">
                  <a href={attachment.url} target="_blank" rel="noreferrer">
                    <Box fontWeight="bold" color="#2980b9">
                      {attachment.original_name}
                    </Box>
                  </a>
                </TableCell>
                <TableCell align="center">{attachment.size}</TableCell>
                <TableCell align="center">
                  {attachment.upload_by_user === 1 ? 'User' : 'Altea'}
                </TableCell>
                <TableCell align="center">
                  {moment(attachment.date_raw).format('DD/MM/YYYY HH:mm:ss')}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

Attachment.propTypes = {
  attachments: PropTypes.array.isRequired,
}

export default Attachment
