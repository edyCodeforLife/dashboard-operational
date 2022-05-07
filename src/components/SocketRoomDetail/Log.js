import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Table from '@material-ui/core/Table'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import moment from 'moment'
import Notfound from '../Notfound'
const ReactJson = dynamic(import('react-json-view'), { ssr: false })

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '60vw',
    height: '60vh',
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
}))

const Log = ({ logs = [] }) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState(null)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Updated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={5}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell align="center">{log.type}</TableCell>
                <TableCell align="center">{log.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setData(log.data || {})
                      setIsModalOpen(true)
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {log.created_at
                    ? moment(log.created_at).format('DD/MM/YYYY HH:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {log.updated_at
                    ? moment(log.updated_at).format('DD/MM/YYYY HH:mm:ss')
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={classes.paper}>
          <ReactJson src={data} />
        </div>
      </Modal>
    </>
  )
}

Log.propTypes = {
  logs: PropTypes.array.isRequired,
}

export default Log
