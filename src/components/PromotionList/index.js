import React from 'react'
import { useRouter } from 'next/router'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import usePromotionList from './hooks/usePromotionList'
import useOption from './hooks/useOption'

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
    padding: '5px',
    minWidth: 1600,
    '& th': {
      padding: '5px 20px',
    },
    '& td': {
      padding: '5px 20px',
    },
  },
})

const PromotionList = () => {
  const router = useRouter()
  const classes = useStyle()
  const { promotionTypes, merchants, statuses } = useOption()
  const {
    handleChangePage,
    filterHandler,
    inputHandler,
    tableColumns,
    resetFilter,
    exportData,
    promotions,
    setLimit,
    filter,
    sorting,
    meta,
  } = usePromotionList()

  const tableHead = (item, index) => {
    const widthValue =
      (item.column === 'No' && '50px') ||
      (item.column === 'Promotion ID' && '160px') ||
      (item.column === 'Promotion Title' && '200px') ||
      (item.column === 'Merchant Name' && '175px') ||
      (item.column === 'Action' && '150px') ||
      'auto'

    return (
      <TableCell
        style={{ width: widthValue }}
        component="th"
        scope="row"
        key={index}
      >
        {!['No', 'Merchant Type', 'Promotion Type', 'Action'].includes(
          item.column,
        ) ? (
          <TableSortLabel
            active={item.active}
            direction={item.dir}
            onClick={() => sorting(`${item.id}`, item.dir)}
          >
            {item.column}
          </TableSortLabel>
        ) : (
          item.column
        )}
      </TableCell>
    )
  }

  const dropdown = ({ label, options, handleChange, value }) => (
    <Box sx={{ width: '100%' }} pr={2}>
      <FormControl fullWidth>
        <InputLabel className={classes.labelRoot}>{label}</InputLabel>
        <Select fullWidth value={value || 'All'} onChange={handleChange}>
          <MenuItem value="All">All</MenuItem>
          {options.map((item, index) => (
            <MenuItem key={index.toString()} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )

  const input = ({ label, type, value, handleChange }) => (
    <Box sx={{ width: '100%' }} pr={2}>
      <TextField
        fullWidth
        label={label}
        type={type || 'text'}
        value={value || ''}
        onChange={handleChange}
        InputProps={
          label === 'keyword'
            ? {
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }
            : {}
        }
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused,
          },
        }}
      />
    </Box>
  )

  const statusLabel = (status) => {
    const backgroundColor =
      (status === 'Released' && '#57EBA180') ||
      (status === 'Draft' && '#9DBFF9') ||
      (status === 'Deactivated' && '#FF808080')

    const color =
      (status === 'Released' && '#05A660') ||
      (status === 'Draft' && '#2C528B') ||
      (status === 'Deactivated' && '#D12B2B')

    return (
      <Box
        p={1}
        display="flex"
        justifyContent="center"
        sx={{
          color,
          backgroundColor,
          fontWeight: 'bold',
          borderRadius: '5px',
        }}
      >
        {status}
      </Box>
    )
  }

  return (
    <Box>
      <Box py={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ boxShadow: '0 4px 2px -2px #C7C7D2', paddingBottom: '15px' }}
        >
          <Link color="inherit" href="#" onClick={() => {}}>
            Promotion Program
          </Link>
          <Link color="inherit" href="#" onClick={() => {}}>
            List
          </Link>
        </Breadcrumbs>
      </Box>
      <Box py={3}>
        <Grid container>
          <Grid item pb={2} xs={10}>
            <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
              {input({
                label: 'Promotion ID',
                value: filter?.promotionId,
                handleChange: (e) =>
                  inputHandler('promotionId', e.target.value),
              })}
              {input({
                label: 'Promotion Title',
                value: filter?.promotionTitle,
                handleChange: (e) =>
                  inputHandler('promotionTitle', e.target.value),
              })}
              {dropdown({
                label: 'Promotion Type',
                value: filter?.promotionType || '',
                options: promotionTypes,
                handleChange: (e) =>
                  filterHandler('promotionType', e.target.value),
              })}
              {input({
                label: 'Voucher Code',
                value: filter?.voucherCode,
                handleChange: (e) =>
                  inputHandler('voucherCode', e.target.value),
              })}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
                xs={2}
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
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {input({
                label: 'Merchant Name',
                value: filter?.merchantName,
                handleChange: (e) =>
                  inputHandler('merchantName', e.target.value),
              })}
              {dropdown({
                label: 'Merchant Type',
                value: filter?.merchantType || '',
                options: merchants,
                handleChange: (e) =>
                  filterHandler('merchantType', e.target.value),
              })}
              {dropdown({
                label: 'status',
                value: filter?.status || '',
                options: statuses,
                handleChange: (e) => filterHandler('status', e.target.value),
              })}
              {input({
                label: 'Weight',
                value: filter?.weight,
                handleChange: (e) => inputHandler('weight', e.target.value),
              })}
              <Box sx={{ width: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignContent: 'space-between',
              }}
            >
              <Button
                onClick={() => router.push('/promotion/add')}
                variant="contained"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                New Promotion
              </Button>
              <Button
                onClick={exportData}
                variant="contained"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                Download CSV
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box py={3}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.table}>
              <TableRow>
                {tableColumns.map((item, index) => tableHead(item, index))}
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions.map((item, index) => (
                <TableRow key={index.toString()}>
                  <TableCell>
                    {parseInt(index.toString(), 10) + parseInt(1, 10)}
                  </TableCell>
                  <TableCell>
                    <p
                      style={{
                        width: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.id}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{
                        width: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
                    </p>
                  </TableCell>
                  <TableCell>{item.promotionType}</TableCell>
                  <TableCell>{item.voucherCode}</TableCell>
                  <TableCell>
                    <p
                      style={{
                        width: '175px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.merchantName}
                    </p>
                  </TableCell>
                  <TableCell>{item.merchantType}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{statusLabel(item.status)}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Link
                        href={`/promotion/detail/${item.id}`}
                        style={{
                          fontWeight: 'bold',
                          color: '#3E8CB9',
                          textTransform: 'none',
                        }}
                      >
                        See detail
                      </Link>
                      <Link
                        href={
                          item.allowEdit ? `/promotion/edit/${item.id}` : `#`
                        }
                        style={{
                          fontWeight: 'bold',
                          color: `${item.allowEdit ? '#3E8CB9' : '#C7C9D9'}`,
                          textTransform: 'none',
                          margin: '6px 10px 0px',
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </Link>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Box>{meta?.total || 0} Promotion</Box>
        <Box>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={meta?.total || 0}
            rowsPerPage={meta?.per_page || 10}
            page={(meta?.page || 1) - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(event) => setLimit(event.target.value)}
          />
        </Box>
      </Grid>
    </Box>
  )
}

export default PromotionList
