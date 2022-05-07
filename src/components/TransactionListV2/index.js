import React from 'react'
import Loader from '../Loader'
import Notfound from '../Notfound'
import DatePicker from '../DatePicker'
import { makeStyles } from '@material-ui/core/styles'
import { formatCurrency } from '../../helpers/currency'
import useTransactionList from './hooks/useTransactionList'
import TablePaginationActions from '../TablePaginationActions'

import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from '@material-ui/core'

const useStyle = makeStyles({
  inputRoot: {
    fontSize: 12,
  },
  labelRoot: {
    fontSize: 12,
    '&$labelFocused': {},
  },
  labelFocused: {},
  table: {
    minWidth: 700,
  },
})

const TransactionList = () => {
  const classes = useStyle()

  const {
    data,
    meta,
    reset,
    params,
    setLimit,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    setService,
    setCode,
    setTotalDiscount,
    setNetTransaction,
    setStatus,
    sorting,
    isLoading,
    exportData,
    handleChangePage,
    setTransactionAmount,
  } = useTransactionList()

  return (
    <Box>
      <Box p={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ boxShadow: '0 4px 2px -2px #C7C7D2', paddingBottom: '15px' }}
        >
          <Link color="inherit" href="#" onClick={() => {}}>
            Voucher Transaction
          </Link>
          <Link color="inherit" href="#" onClick={() => {}}>
            Tabel
          </Link>
        </Breadcrumbs>
      </Box>
      <Box display="flex" p={3}>
        {/* filter */}
        <Box display="flex" flex={1}>
          <Grid item>
            <Box px={1}>
              <DatePicker
                label="Date Start"
                value={dateStart}
                onChangeDate={(date) => setDateStart(date)}
              />
            </Box>
            <Box px={1} mt={3}>
              <DatePicker
                label="Date End"
                value={dateEnd}
                onChangeDate={(date) => setDateEnd(date)}
              />
            </Box>
          </Grid>
          <Grid item>
            {/* <Box px={1}>
              <TextField
                type="text"
                label="Order ID"
                value={params?.order_id}
                onChange={(event) => setOrderId(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box> */}
            <Box px={1}>
              {params?.type_of_service === '' ? (
                <TextField
                  type="text"
                  label="Service"
                  value={'All'} // API tidak memprovide jika mengirim status All
                  onChange={(event) => setService(event.target.value)}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                  style={{ width: '100%' }}
                  select
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="LAYANAN_MEDIS">Layanan Medis</MenuItem>
                  <MenuItem value="TELEKONSULTASI">Telekonsultasi</MenuItem>
                  <MenuItem value="FARMASI">Farmasi</MenuItem>
                  <MenuItem value="PENGIRIMAN_OBAT">Pengiriman Obat</MenuItem>
                </TextField>
              ) : (
                <TextField
                  type="text"
                  label="Service"
                  value={params?.type_of_service}
                  onChange={(event) => setService(event.target.value)}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                  style={{ width: '100%' }}
                  select
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="LAYANAN_MEDIS">Layanan Medis</MenuItem>
                  <MenuItem value="TELEKONSULTASI">Telekonsultasi</MenuItem>
                  <MenuItem value="FARMASI">Farmasi</MenuItem>
                  <MenuItem value="PENGIRIMAN_OBAT">Pengiriman Obat</MenuItem>
                </TextField>
              )}
            </Box>
            <Box px={1} mt={3}>
              <TextField
                type="text"
                label="Voucher Code"
                value={params?.code}
                onChange={(event) => setCode(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            {/* <Box px={1}>
              <TextField
                type="number"
                label="Voucher Number"
                value={params?.voucher_number}
                onChange={(event) => setVoucherNumber(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box> */}
            <Box px={1}>
              <TextField
                type="number"
                label="Total Discount"
                value={params?.total_discount}
                onChange={(event) => setTotalDiscount(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box>
            <Box px={1} mt={3}>
              {params?.status === '' ? (
                <TextField
                  label="Status"
                  value={'All'} // API tidak memprovide jika mengirim status All
                  onChange={(event) => setStatus(event.target.value)}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                  style={{ width: '100%', minWidth: '160px' }}
                  select
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="CLAIMED">Complete</MenuItem>
                  <MenuItem value="BOOKED">Ongoing</MenuItem>
                  <MenuItem value="CANCELED">Cancel</MenuItem>
                  <MenuItem value="REFUNDED">Refund</MenuItem>
                </TextField>
              ) : (
                <TextField
                  label="Status"
                  // value={params?.status}
                  value={params?.status}
                  onChange={(event) => setStatus(event.target.value)}
                  InputLabelProps={{
                    classes: {
                      root: classes.labelRoot,
                      focused: classes.labelFocused,
                    },
                  }}
                  style={{ width: '100%', minWidth: '160px' }}
                  select
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="CLAIMED">Complete</MenuItem>
                  <MenuItem value="BOOKED">Ongoing</MenuItem>
                  <MenuItem value="CANCELED">Cancel</MenuItem>
                  <MenuItem value="REFUNDED">Refund</MenuItem>
                </TextField>
              )}
            </Box>
          </Grid>
          <Grid item>
            <Box px={1}>
              <TextField
                type="number"
                label="Transaction Value"
                value={params?.transaction_amount}
                onChange={(event) => setTransactionAmount(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box px={1}>
              <TextField
                type="number"
                label="Net Transaction"
                value={params?.net_transaction}
                onChange={(event) => setNetTransaction(event.target.value)}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    focused: classes.labelFocused,
                  },
                }}
              />
            </Box>
          </Grid>
        </Box>
        {/* reset & export */}
        <Box display="flex">
          <Grid item>
            <Box px={1} marginRight="10px">
              <Button
                style={{
                  color: '#3F51B5',
                  fontSize: '12px',
                  marginTop: '15px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
                onClick={() => reset()}
              >
                Reset
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Button
              mr={10}
              color="primary"
              onClick={exportData}
              variant="contained"
              className={classes.buttonPadding}
              style={{ textTransform: 'none', marginTop: '13px' }}
            >
              Download CSV
            </Button>
          </Grid>
        </Box>
      </Box>
      <Box p={3}>
        <Box borderRadius={5} pt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'transaction_date'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting('transaction_date', params?.order_type)
                      }
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'order_id'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() => sorting('order_id', params?.order_type)}
                    >
                      Order ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'type_of_service'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting('type_of_service', params?.order_type)
                      }
                    >
                      Service
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'voucher_code'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting('voucher_code', params?.order_type)
                      }
                    >
                      Voucher Code
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Voucher Number</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'transaction_voucher_amount'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting(
                          'transaction_voucher_amount',
                          params?.order_type,
                        )
                      }
                    >
                      Total Discount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'transaction_amount'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting('transaction_amount', params?.order_type)
                      }
                    >
                      Transaction Value
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'grand_total'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() => sorting('grand_total', params?.order_type)}
                    >
                      Net Transaction
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'status'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() => sorting('status', params?.order_type)}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={10}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && data.length === 0 && (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={10}>
                      <Notfound />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  data.length > 0 &&
                  data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.order_id}</TableCell>
                      <TableCell>{row.type_of_service}</TableCell>
                      <TableCell>{row.voucher_code}</TableCell>
                      <TableCell>
                        {formatCurrency(row.voucher_number, '')}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.total_discount, 'IDR')}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.transaction_value, 'IDR')}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.net_transaction, 'IDR')}
                      </TableCell>
                      <TableCell>
                        {row.status.toUpperCase() === 'COMPLETE' && (
                          <div className="complete-status">Complete</div>
                        )}
                        {row.status.toUpperCase() === 'ONGOING' && (
                          <div className="ongoing-status">Ongoing</div>
                        )}
                        {row.status.toUpperCase() === 'CANCEL' && (
                          <div className="refund-status">Cancel</div>
                        )}
                        {row.status.toUpperCase() === 'REFUNDED' && (
                          <div className="refund-status">Refund</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box>{meta?.total || 0} voucher</Box>
          <Box>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={meta?.total || 0}
              rowsPerPage={meta?.per_page || 10}
              page={(meta?.page || 1) - 1}
              ActionsComponent={TablePaginationActions}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(event) => setLimit(event.target.value)}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default TransactionList
