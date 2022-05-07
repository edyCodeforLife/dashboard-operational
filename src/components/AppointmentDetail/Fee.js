import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Tooltip } from '@material-ui/core'
import moment from 'moment-timezone'
import { formatCurrency } from '../../helpers/currency'
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

const Fee = ({ billingVersion = 'v1', fees = [] }) => {
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
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Selected</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fees.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {fees
              .sort(
                (a, b) =>
                  moment(b.created_at).unix() - moment(a.created_at).unix(),
              )
              .map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell align="center">{fee.id}</TableCell>
                  <TableCell align="center">{fee.category}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={`Type: ${fee.type}`} arrow>
                      <div>{fee.label}</div>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {formatCurrency(fee.amount, 'Rp')}
                  </TableCell>
                  <TableCell align="center">{fee.status}</TableCell>
                  <TableCell align="center">
                    {`${fee.selected}`.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(fee.data)
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {billingVersion === 'v1'
                      ? moment(fee.created_at).format('DD/MM/YYYY HH:mm:ss')
                      : moment
                          .tz(fee.created_at, 'UTC')
                          .tz('Asia/Jakarta')
                          .format('DD/MM/YYYY HH:mm:ss')}
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

Fee.propTypes = {
  billingVersion: PropTypes.string.isRequired,
  fees: PropTypes.array.isRequired,
}

export default Fee
