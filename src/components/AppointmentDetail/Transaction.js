import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Table from '@material-ui/core/Table'
import Tooltip from '@material-ui/core/Tooltip'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import moment from 'moment-timezone'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Modal from '@material-ui/core/Modal'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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

const Transaction = ({ billingVersion = 'v1', transactions = [] }) => {
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
              <TableCell align="center">Ref ID</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Provider</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Paid Amount</TableCell>
              <TableCell align="center">Paid Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Selected</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Payload</TableCell>
              <TableCell align="center">Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={12}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {transactions
              .sort((a, b) => b.id - a.id)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell align="center">{transaction.id}</TableCell>
                  <TableCell align="center">{transaction.refId}</TableCell>
                  <TableCell align="center">
                    <Tooltip
                      title={`Payment Method Code: ${transaction.paymentMethod}`}
                      arrow
                    >
                      <div>
                        {transaction?.detail?.name || transaction.paymentMethod}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{transaction.provider}</TableCell>
                  <TableCell align="center">
                    {formatCurrency(transaction.amount, 'Rp')}
                  </TableCell>
                  <TableCell align="center">
                    {transaction.paidAmount
                      ? formatCurrency(transaction.paidAmount, 'Rp')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {transaction.amountPaidAt
                      ? billingVersion === 'v1'
                        ? moment(transaction.amountPaidAt).format(
                            'DD/MM/YYYY HH:mm:ss',
                          )
                        : moment
                            .tz(transaction.amountPaidAt, 'UTC')
                            .tz('Asia/Jakarta')
                            .format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">{transaction.status}</TableCell>
                  <TableCell align="center">
                    {`${transaction.selected}`.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    {billingVersion === 'v1'
                      ? moment(transaction.createdAt).format(
                          'DD/MM/YYYY HH:mm:ss',
                        )
                      : moment
                          .tz(transaction.createdAt, 'UTC')
                          .tz('Asia/Jakarta')
                          .format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(transaction.requestData || {})
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setData(transaction.responseData || {})
                        setIsModalOpen(true)
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
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

Transaction.propTypes = {
  billingVersion: PropTypes.string.isRequired,
  transactions: PropTypes.array.isRequired,
}

export default Transaction
