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
import { Box, Grid, TableFooter, TextField } from '@material-ui/core'
import TablePaginationActions from '../TablePaginationActions'
import Status from '../Status'
import Loader from '../Loader'
import Notfound from '../Notfound'
import useUserList from './hooks/useUserList'
import moment from 'moment'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UserList = () => {
  const classes = useStyles()
  const { filters, setKeyword, isLoading, data, meta, handleChangePage } =
    useUserList()

  return (
    <Box>
      <Box p={3}>
        <Grid container>
          <Grid item>
            <TextField
              label="Keyword"
              value={filters.key}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ref ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={7}>
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={7}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data.length > 0 &&
              data.map((row) => {
                return (
                  <TableRow key={row.ref_id}>
                    <TableCell>
                      <a
                        href={`/user/${row.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Box fontWeight="bold" color="#2980b9">
                          {row.ref_id}
                        </Box>
                      </a>
                    </TableCell>
                    <TableCell align="center">{`${row.first_name} ${row.last_name}`}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">
                      {row.user_role.join(', ')}
                    </TableCell>
                    <TableCell align="center">
                      {row.registered_at
                        ? moment(row.registered_at).format(
                            'DD/MM/YYYY HH:mm:ss',
                          )
                        : '-'}
                    </TableCell>
                    <TableCell align="center">
                      <Status
                        bgColor={
                          row.status === 'ACTIVE' ? '#27ae60' : '#c0392b'
                        }
                        textColor="white"
                        status={row.status === 'ACTIVE' ? 'Aktif' : 'Diblokir'}
                        statusSystem={row.status}
                      />
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
                  colSpan={7}
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
