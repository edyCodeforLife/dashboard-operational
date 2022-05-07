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
    dateEnd,
    setCode,
    sorting,
    setLimit,
    dateStart,
    isLoading,
    exportData,
    setDateEnd,
    setDateStart,
    numberWithDots,
    setTotalRevenue,
    setVoucherUsage,
    setTotalDiscount,
    handleChangePage,
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
        <Box display="flex" flex={1}>
          <Grid item>
            <Box px={1}>
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
            <Box px={1}>
              <TextField
                type="number"
                label="Voucher Usage"
                value={params?.voucher_usage}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(event) => setVoucherUsage(event.target.value)}
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
                type="text"
                label="Total diskon terpakai"
                InputProps={{ inputProps: { min: 0 } }}
                value={numberWithDots(params?.total_discount)}
                onChange={(event) => setTotalDiscount(event.target.value)}
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
                type="text"
                label="Total revenue didapatkan"
                InputProps={{ inputProps: { min: 0 } }}
                value={numberWithDots(params?.total_revenue)}
                onChange={(event) => setTotalRevenue(event.target.value)}
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
        </Box>
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
                  <TableCell>No</TableCell>
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
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'voucher_usage'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() =>
                        sorting('voucher_usage', params?.order_type)
                      }
                    >
                      Voucher Usage
                    </TableSortLabel>
                  </TableCell>
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
                      Total Diskon terpakai
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={params.order_by === 'grand_total'}
                      direction={params?.order_type === 'ASC' ? 'asc' : 'desc'}
                      onClick={() => sorting('grand_total', params?.order_type)}
                    >
                      Total Revenue Didapatkan
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={5}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && data.length === 0 && (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={5}>
                      <Notfound />
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  data.length > 0 &&
                  data.map((row, index) => (
                    <TableRow key={row.voucher_code}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.voucher_code}</TableCell>
                      <TableCell>
                        {formatCurrency(row.voucher_usage, '')}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.total_discount, 'IDR')}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(row.total_revenue, 'IDR')}
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
