import React from 'react'
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
  FormControlLabel,
  Grid,
  Switch,
  TableFooter,
  TextField,
} from '@material-ui/core'
import TablePaginationActions from '../TablePaginationActions'
import Loader from '../Loader'
import Notfound from '../Notfound'
import useDoctorList from './hooks/useDoctorList'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UserList = () => {
  const classes = useStyles()
  const {
    filters,
    setKeyword,
    isLoading,
    data,
    meta,
    handleChangePage,
    handleChangeValidDoctor,
  } = useDoctorList()

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
            <Box mt={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.showAllDokter}
                    onChange={handleChangeValidDoctor}
                    name="Only Valid Doctor"
                    color="primary"
                  />
                }
                label="Only Valid Doctor"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Hospital</TableCell>
              <TableCell align="center">Available Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={3}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data.length > 0 &&
              data.map((row) => {
                return (
                  <TableRow key={row.doctor_id}>
                    <TableCell>
                      <a
                        href={`/doctor/${row.doctor_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Box fontWeight="bold" color="#2980b9">
                          {row.name}
                        </Box>
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      {row.hospital.map((hospital) => hospital.name).join(', ')}
                    </TableCell>
                    <TableCell align="center">
                      {row.available_day_all_hospital?.join(', ')}
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
                  colSpan={3}
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

export default UserList
