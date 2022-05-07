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

const User = ({ users = [] }) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState(null)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Method</TableCell>
              <TableCell align="center">Ref ID</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Connected Date</TableCell>
              <TableCell align="center">Disconnected Date</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Updated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={12}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.method}</TableCell>
                <TableCell align="center">{user.ref_id}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setData(user.user_data || {})
                      setIsModalOpen(true)
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  {user.connected_at
                    ? moment(user.connected_at).format('DD/MM/YYYY HH:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {user.disconnected_at
                    ? moment(user.disconnected_at).format('DD/MM/YYYY HH:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {user.created_at
                    ? moment(user.created_at).format('DD/MM/YYYY HH:mm:ss')
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  {user.updated_at
                    ? moment(user.updated_at).format('DD/MM/YYYY HH:mm:ss')
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

User.propTypes = {
  users: PropTypes.array.isRequired,
}

export default User
