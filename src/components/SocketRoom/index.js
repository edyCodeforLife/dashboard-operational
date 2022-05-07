import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import Modal from '@material-ui/core/Modal'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { IconButton } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TablePagination from '@material-ui/core/TablePagination'
import { Box, Grid, TableFooter, TextField } from '@material-ui/core'
import TablePaginationActions from '../TablePaginationActions'
import DatePicker from '../DatePicker'
import Loader from '../Loader'
import Notfound from '../Notfound'
import useSocketRoom from './hooks/useSocketRoom'
import { getHighlightedText } from '../../helpers/strings'
import SocketRoomDetail from '../SocketRoomDetail'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '80vw',
    height: '80vh',
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
}))

const SocketRoom = ({ params = {} }) => {
  const classes = useStyles()
  const {
    isModalOpen,
    setIsModalOpen,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
    keyword,
    setKeyword,
    isLoading,
    data,
    meta,
    handleChangePage,
    roomId,
    setRoomId,
  } = useSocketRoom({ params })

  return (
    <Box>
      {Object.keys(params).length === 0 && (
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Keyword"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <DatePicker
                label="Created Date Start"
                value={dateStart || moment().format('YYYY-MM-DD')}
                onChangeDate={(date) => setDateStart(date)}
              />
            </Grid>
            <Grid item>
              <DatePicker
                label="Created Date End"
                value={dateEnd || moment().format('YYYY-MM-DD')}
                onChangeDate={(date) => setDateEnd(date)}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Method</TableCell>
              <TableCell align="center">Relation Type</TableCell>
              <TableCell align="center">Relation ID</TableCell>
              <TableCell align="center">Users</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Updated Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8}>
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data.length > 0 &&
              data.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {getHighlightedText(row.method, keyword)}
                    </TableCell>
                    <TableCell align="center">
                      {getHighlightedText(row.relation_type, keyword)}
                    </TableCell>
                    <TableCell align="center">
                      {getHighlightedText(row.relation_id, keyword)}
                    </TableCell>
                    <TableCell>
                      {row.users.map((user) => (
                        <div key={user.ref_id} style={{ marginBottom: 10 }}>
                          <div>{getHighlightedText(user.ref_id, keyword)}</div>
                          <div>{getHighlightedText(user.name, keyword)}</div>
                          <div>{getHighlightedText(user.email, keyword)}</div>
                          <div>{getHighlightedText(user.phone, keyword)}</div>
                          <div>{getHighlightedText(user.role, keyword)}</div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {getHighlightedText(row.status, keyword)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          setRoomId(row.id)
                          setIsModalOpen(true)
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.created_at).format('DD/MM/YYYY HH:mm:ss')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.updated_at).format('DD/MM/YYYY HH:mm:ss')}
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
                  colSpan={8}
                  count={meta.total_data}
                  rowsPerPage={meta.limit}
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
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={classes.paper}>
          <SocketRoomDetail roomId={roomId} />
        </div>
      </Modal>
    </Box>
  )
}

SocketRoom.propTypes = {
  params: PropTypes.object,
}

export default SocketRoom
