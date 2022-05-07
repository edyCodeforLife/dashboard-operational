import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto',
  },
}))

const External = ({ externals = [] }) => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState({})

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Schedule ID</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Provider</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {externals.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={7}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {externals
              .sort((a, b) => b.id - a.id)
              .map((external) => (
                <TableRow key={external.id}>
                  <TableCell align="center">{external.id}</TableCell>
                  <TableCell align="center">
                    {external.appointmentScheduleId}
                  </TableCell>
                  <TableCell align="center">{external.type}</TableCell>
                  <TableCell align="center">{external.provider}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(external.data)
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{external.status}</TableCell>
                  <TableCell align="center">
                    {moment(external.createdAt).format('DD/MM/YYYY HH:mm:ss')}
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

External.propTypes = {
  externals: PropTypes.array.isRequired,
}

export default External
