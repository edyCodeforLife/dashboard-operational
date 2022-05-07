import React from 'react'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from '../TablePaginationActions'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import useFilter from './hooks/useFilter'
import useVoucherList from './hooks/useVoucherList'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  inputRoot: {
    fontSize: 12,
  },
  textGreen: {
    color: '#6bcabb',
  },
  textPrimary: {
    color: '#3e8cb9',
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

const VoucherList = () => {
  const classes = useStyle()
  const { voucherFlags, typeOfServices, amountFlags } = useFilter()
  const {
    meta,
    filter,
    sorting,
    vouchers,
    resetFilter,
    tableColumns,
    handleRowPerPage,
    handlePagination,
    handleFilterOption,
    handleFilterInput,
  } = useVoucherList()

  const tableHead = (item, index) => (
    <TableCell component="th" scope="row" key={index}>
      <TableSortLabel
        active={item.active}
        direction={item.dir}
        onClick={() => sorting(index, item.dir, item.column)}
      >
        {item.column}
      </TableSortLabel>
    </TableCell>
  )

  const filterDropdown = (label, identifier, options) => (
    <Box pr={2}>
      <FormControl fullWidth>
        <InputLabel className={classes.labelRoot} id={identifier}>
          {label}
        </InputLabel>
        <Select
          fullWidth
          labelId={identifier}
          value={filter[`${identifier}`]}
          onChange={(event) =>
            handleFilterOption({
              identifier,
              value: event.target.value,
            })
          }
        >
          {options.map((item, index) => (
            <MenuItem key={index.toString()} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )

  const filterInput = (label, identifier, type = 'text') => (
    <Box pr={2}>
      <TextField
        fullWidth
        defaultValue={type === 'date' ? moment().format('YYYY-MM-DD') : ''}
        label={label}
        type={type}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => {
          handleFilterInput({
            identifier,
            value: event.target.value,
          })
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused,
          },
        }}
      />
    </Box>
  )

  return (
    <Box>
      <Box p={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ boxShadow: '0 4px 2px -2px #C7C7D2', paddingBottom: '15px' }}
        >
          <Link color="inherit" href="#" onClick={() => {}}>
            Manajemen Data Voucher
          </Link>
          <Link color="inherit" href="#" onClick={() => {}}>
            Detail Voucher
          </Link>
        </Breadcrumbs>
      </Box>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid container item xs={6}>
            <Grid item xs={3}>
              {filterDropdown('Voucher Flag', 'voucherFlag', voucherFlags)}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Voucher Code', 'voucherCode')}
            </Grid>
            <Grid item xs={3}>
              {filterInput(
                'Minimum Transaction',
                'minimumTransaction',
                'number',
              )}
            </Grid>
            <Grid item xs={3}>
              {filterDropdown(
                'Type of Service',
                'typeOfService',
                typeOfServices,
              )}
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={3}>
              {filterDropdown('Amount Flag', 'amountFlag', amountFlags)}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Voucher Amount', 'voucherAmount', 'number')}
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Button
                className={classes.buttonPadding}
                onClick={() => {
                  window.location.replace(`/payment/data-voucher/add`)
                }}
                variant="contained"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                Voucher Baru
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={3}>
              {filterInput('Maximum Amount', 'maximumAmount', 'number')}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Begin Effective', 'beginEffectiveDate', 'date')}
            </Grid>
            <Grid item xs={3}>
              {filterInput('End Effective', 'endEffectiveDate', 'date')}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Created By', 'createdBy')}
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <Grid item xs={3}>
              {filterInput('Created Date', 'createdAt', 'date')}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Modified By', 'updatedBy')}
            </Grid>
            <Grid item xs={3}>
              {filterInput('Modified Date', 'updatedAt', 'date')}
            </Grid>
            <Grid
              item
              xs={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Button
                onClick={() => resetFilter()}
                style={{
                  textTransform: 'none',
                  color: '#3F51B5',
                  fontWeight: 'bold',
                  fontSize: '12px',
                }}
              >
                Reset Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box p={3}>
        <Box borderRadius={5} pt={3}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableColumns.map((item, index) => tableHead(item, index))}
                </TableRow>
              </TableHead>
              <TableBody>
                {vouchers.map((item, index) => (
                  <TableRow key={index.toString()}>
                    <TableCell>{item.voucher_flag}</TableCell>
                    <TableCell>{item.voucher_code}</TableCell>
                    <TableCell>{item.minimum_transaction}</TableCell>
                    <TableCell>
                      <Link
                        className={classes.textPrimary}
                        href={`/payment/data-voucher/edit/${item.id}`}
                      >
                        Update
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className={classes.textGreen}
                        href={`/payment/data-voucher/detail/${item.id}`}
                      >
                        Detail
                      </Link>
                    </TableCell>
                    <TableCell>{item.type_of_service}</TableCell>
                    <TableCell>{item.amount_flag}</TableCell>
                    <TableCell>{item.voucher_amount}</TableCell>
                    <TableCell>{item.maximum_amount}</TableCell>
                    <TableCell>{item.begin_effective_date}</TableCell>
                    <TableCell>{item.end_effective_date}</TableCell>
                    <TableCell>{item.created_at}</TableCell>
                    <TableCell>{item.created_by}</TableCell>
                    <TableCell>{item.updated_at}</TableCell>
                    <TableCell>{item.updated_by || '-'}</TableCell>
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
              onPageChange={handlePagination}
              onRowsPerPageChange={(e) => handleRowPerPage(e.target.value)}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default VoucherList
