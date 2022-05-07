import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Table from '@material-ui/core/Table'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import Modal from '@material-ui/core/Modal'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Notfound from '../Notfound'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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

const ExternalHistory = ({ externalHistories = [] }) => {
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
              <TableCell align="center">Payload</TableCell>
              <TableCell align="center">Response</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {externalHistories.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {externalHistories
              .sort((a, b) => b.id - a.id)
              .map((externalHistory) => (
                <TableRow key={externalHistory.id}>
                  <TableCell align="center">{externalHistory.id}</TableCell>
                  <TableCell align="center">
                    {externalHistory.appointmentScheduleId}
                  </TableCell>
                  <TableCell align="center">{externalHistory.type}</TableCell>
                  <TableCell align="center">
                    {externalHistory.provider}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(externalHistory?.request || {})
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(externalHistory?.response || {})
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{externalHistory.status}</TableCell>
                  <TableCell align="center">
                    {moment(externalHistory.createdAt).format(
                      'DD/MM/YYYY HH:mm:ss',
                    )}
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
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button variant="contained" color="primary">
              Copy Data
            </Button>
          </CopyToClipboard>

          <ReactJson src={data} />
        </div>
      </Modal>
    </>
  )
}

ExternalHistory.propTypes = {
  externalHistories: PropTypes.array.isRequired,
}

export default ExternalHistory
