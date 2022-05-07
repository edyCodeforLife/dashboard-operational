import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import moment from 'moment'
import Notfound from '../../Notfound'
import Status from '../../Status'
import { useUserRole } from './hooks/useUserRole'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Modal } from '@material-ui/core'
import { Box } from '@material-ui/core'
import roles from '../../../constants/roles'
import { Chip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

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

const Role = ({ userId }) => {
  const classes = useStyles()
  const {
    data,
    isModalOpen,
    setIsModalOpen,
    currentRoles,
    setCurrentRoles,
    updateRoles,
    getCurrentRoles,
  } = useUserRole({ userId })

  return (
    <>
      <Box mb={2} mt={-2}>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          Update Role
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Created By</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Deleted By</TableCell>
              <TableCell align="center">Deleted Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={7}>
                  <Notfound />
                </TableCell>
              </TableRow>
            )}
            {data
              .sort((a, b) => b.id - a.id)
              .map((role) => (
                <TableRow key={role.id}>
                  <TableCell align="center">{role.id}</TableCell>
                  <TableCell align="center">{role.role}</TableCell>
                  <TableCell align="center">
                    <Status
                      bgColor={role.status === 'ACTIVE' ? '#27ae60' : '#c0392b'}
                      textColor="white"
                      status={role.status === 'ACTIVE' ? 'Active' : 'Deleted'}
                      statusSystem={role.status}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {role.created_by
                      ? `${role.created_by.first_name} ${role.created_by.last_name} (${role.created_by.ref_id})`
                      : ''}
                  </TableCell>
                  <TableCell align="center">
                    {role.created_at
                      ? moment(role.created_at).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {role.deleted_by
                      ? `${role.deleted_by.first_name} ${role.deleted_by.last_name} (${role.deleted_by.ref_id})`
                      : ''}
                  </TableCell>
                  <TableCell align="center">
                    {role.deleted_at
                      ? moment(role.deleted_at).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={() => {
          getCurrentRoles()
          setIsModalOpen(false)
        }}
      >
        <div className={classes.paper}>
          <div>Role</div>
          <Box my={2}>
            <Select
              multiple
              value={currentRoles}
              fullWidth
              onChange={(e) => setCurrentRoles(e.target.value)}
              input={<Input id="select-multiple-chip" />}
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
            >
              {roles.map((role) => (
                <MenuItem key={role.code} value={role.code}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <div>
            <Button
              onClick={() => updateRoles()}
              variant="contained"
              color="primary"
              size="small"
            >
              Update Role
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

Role.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default Role
