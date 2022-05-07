import React, { useState } from 'react'
import moment from 'moment'
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
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import Notfound from '../../Notfound'
import useUserDevice from './hooks/useUserDevice'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { TableFooter } from '@material-ui/core'
import { TablePagination } from '@material-ui/core'
import TablePaginationActions from '../../TablePaginationActions'
import ConfirmDialog from '../../ConfirmDialog'
import Status from '../../Status'
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

const Device = ({ userId }) => {
  const classes = useStyles()
  const {
    devices,
    meta,
    handleChangePage,
    revokeDevice,
    deviceId,
    setDeviceId,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
  } = useUserDevice({
    userId,
  })
  const [data, setData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(null)

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Device ID</TableCell>
              <TableCell align="center">IP</TableCell>
              <TableCell align="center">Login Date</TableCell>
              <TableCell align="center">Expired Date</TableCell>
              <TableCell align="center">Logout Date</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">User Agent</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {devices.map((device) => {
              let statusText = 'Active'
              let statusColor = '#27ae60'

              if (device.expired_at && moment().isAfter(device.expired_at)) {
                statusText = 'Expired'
                statusColor = '#e67e22'
              }

              if (device.logout_at) {
                statusText = 'Logout'
                statusColor = '#e74c3c'
              }

              return (
                <TableRow key={device.device_id}>
                  <TableCell align="center">{device.device_id}</TableCell>
                  <TableCell align="center">{device.ip}</TableCell>
                  <TableCell align="center">
                    {device.login_at
                      ? moment(device.login_at).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {device.expired_at
                      ? moment(device.expired_at).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {device.logout_at
                      ? moment(device.logout_at).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">{device.role || '-'}</TableCell>
                  <TableCell align="center">
                    <Status
                      bgColor={statusColor}
                      textColor="white"
                      status={statusText}
                      statusSystem={statusText}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {device.user_agent ? (
                      <IconButton
                        onClick={() => {
                          setData(JSON.parse(device.user_agent))
                          setIsModalOpen(true)
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {!device.logout_at &&
                    device.expired_at &&
                    moment().isBefore(device.expired_at) ? (
                      <Button
                        onClick={() => {
                          setDeviceId(device.device_id)
                          setIsConfirmDialogOpen(true)
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Revoke Access
                      </Button>
                    ) : (
                      '-'
                    )}
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
                  colSpan={9}
                  count={meta.totalData}
                  rowsPerPage={meta.perPage}
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
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Warning!!!!!"
        description={`Are you sure want to revoke access for Device: "${deviceId}"?`}
        agreeText="Yes!"
        cancelText="No"
        handleAgree={() => revokeDevice()}
        handleClose={() => setIsConfirmDialogOpen(false)}
      />
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

Device.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default Device
