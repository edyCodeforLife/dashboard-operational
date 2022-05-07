import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'
import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TableFooter,
  TextField,
} from '@material-ui/core'
import TablePaginationActions from '../TablePaginationActions'
import DatePicker from '../DatePicker'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { formatCurrency } from '../../helpers/currency'
import Status from '../Status'
import useAppointmentList from './hooks/useAppointmentList'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const AppointmentList = ({ userId, type = 'ON_GOING', status = [] }) => {
  const classes = useStyles()
  const {
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    filters,
    setKeyword,
    filterDateType,
    handleChangeFilterDateType,
    exportData,
    isLoading,
    data,
    meta,
    handleChangePage,
    paymentMethod,
    setPaymentMethod,
    paymentMethods,
    hospitals,
    setHospitals,
    allHospitals,
  } = useAppointmentList({ userId, type, status })

  return (
    <Box>
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Keyword"
              value={filters.key}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Box>
              <InputLabel id="filter_date_type">Filter Date</InputLabel>
              <Select
                labelId="filter_date_type"
                value={filterDateType}
                onChange={(e) => handleChangeFilterDateType(e.target.value)}
              >
                <MenuItem value="SCHEDULE">Schedule Date</MenuItem>
                <MenuItem value="CREATED">Created Date</MenuItem>
                {['CANCELED', 'REFUNDED'].includes(type) && (
                  <MenuItem value="CANCELED">Canceled Date</MenuItem>
                )}
              </Select>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <InputLabel id="filter_payment_type">Payment Method</InputLabel>
              <Select
                labelId="filter_payment_type"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="ALL">All Payment Method</MenuItem>
                {paymentMethods.map((paymentMethod) => (
                  <MenuItem key={paymentMethod.code} value={paymentMethod.code}>
                    {paymentMethod.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item>
            <DatePicker
              label={`${
                filterDateType === 'SCHEDULE'
                  ? 'Schedule'
                  : filterDateType === 'CREATED'
                  ? 'Created'
                  : 'Canceled'
              } Date Start`}
              value={dateStart || moment().format('YYYY-MM-DD')}
              onChangeDate={(date) => setDateStart(date)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label={`${
                filterDateType === 'SCHEDULE'
                  ? 'Schedule'
                  : filterDateType === 'CREATED'
                  ? 'Created'
                  : 'Canceled'
              } Date End`}
              value={dateEnd || moment().format('YYYY-MM-DD')}
              onChangeDate={(date) => setDateEnd(date)}
            />
          </Grid>
          <Grid item>
            <Box>
              <InputLabel id="filter_hospital">Hospital</InputLabel>
              <Select
                multiple
                value={hospitals}
                fullWidth
                onChange={(e) => setHospitals(e.target.value)}
                input={<Input id="select-multiple-chip" />}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => {
                      const hospital = allHospitals.find(
                        (hospital) => hospital.hospital_id === value,
                      )
                      return (
                        <span
                          key={value}
                          style={{
                            marginRight: 10,
                            backgroundColor: 'lightgrey',
                            borderRadius: 8,
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          {hospital?.name}
                        </span>
                      )
                    })}
                  </div>
                )}
              >
                {allHospitals.map((hospital) => (
                  <MenuItem
                    key={hospital.hospital_id}
                    value={hospital.hospital_id}
                  >
                    {hospital.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={1}>
              <Button
                onClick={() => exportData()}
                variant="contained"
                color="primary"
              >
                Export CSV
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Patient</TableCell>
              <TableCell align="center">Specialist</TableCell>
              <TableCell align="center">Hospital</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Schedule Date</TableCell>
              <TableCell align="center">Created Date</TableCell>
              {['CANCELED', 'REFUNDED'].includes(type) && (
                <TableCell align="center">Canceled Date</TableCell>
              )}
              {['COMPLETED'].includes(type) && (
                <TableCell align="center">Drug Resume</TableCell>
              )}
              {['COMPLETED'].includes(type) && (
                <TableCell align="center">Additional Resume</TableCell>
              )}
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={
                    ['CANCELED', 'REFUNDED'].includes(type)
                      ? 11
                      : ['COMPLETED'].includes(type)
                      ? 12
                      : 10
                  }
                >
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={
                    ['CANCELED', 'REFUNDED'].includes(type)
                      ? 11
                      : ['COMPLETED'].includes(type)
                      ? 12
                      : 10
                  }
                >
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data.length > 0 &&
              data.map((row) => {
                const schedule = row.schedule
                  ? `${moment(row.schedule.date).format(
                      'DD/MM/YYYY',
                    )} (${moment(row.schedule.time_start, 'HH:mm').format(
                      'HH:mm',
                    )} - ${moment(row.schedule.time_end, 'HH:mm').format(
                      'HH:mm',
                    )})`
                  : '-'

                return (
                  <TableRow key={row.order_code}>
                    <TableCell component="th" scope="row">
                      <a
                        href={`/appointment/${row.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Box fontWeight="bold" color="#2980b9">
                          {row.order_code}
                        </Box>
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      {row.parent_user.name || '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.patient.name || '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row.doctor.name || '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row?.doctor?.hospital?.name || '-'}
                    </TableCell>
                    <TableCell align="center">
                      {row?.transaction?.detail?.name || '-'}
                    </TableCell>
                    <TableCell align="center">
                      {formatCurrency(row.total_price, 'Rp')}
                    </TableCell>
                    <TableCell align="center">{schedule}</TableCell>
                    <TableCell align="center">
                      {moment(row.created).format('DD/MM/YYYY HH:mm:ss')}
                    </TableCell>
                    {['CANCELED', 'REFUNDED'].includes(type) && (
                      <TableCell align="center">
                        {row.canceled_at
                          ? moment(row.canceled_at).format(
                              'DD/MM/YYYY HH:mm:ss',
                            )
                          : '-'}
                      </TableCell>
                    )}
                    {['COMPLETED'].includes(type) && (
                      <TableCell align="center">
                        {row.have_drug_resume === true ? 'TRUE' : 'FALSE'}
                      </TableCell>
                    )}
                    {['COMPLETED'].includes(type) && (
                      <TableCell align="center">
                        {row.have_additional_resume === true ? 'TRUE' : 'FALSE'}
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <a
                        href={`/appointment/${row.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Status
                          bgColor={row.status_detail.bg_color}
                          textColor={row.status_detail.text_color}
                          status={row.status_detail.label}
                          statusSystem={row.status}
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
          {meta && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[20]}
                  colSpan={
                    ['CANCELED', 'REFUNDED'].includes(type)
                      ? 11
                      : ['COMPLETED'].includes(type)
                      ? 12
                      : 10
                  }
                  count={meta.total}
                  rowsPerPage={meta.per_page}
                  page={meta.page - 1}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Box>
  )
}

AppointmentList.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string.isRequired,
  status: PropTypes.array,
}

export default AppointmentList
