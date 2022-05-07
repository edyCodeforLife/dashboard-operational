import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'
import { useDispatch } from 'react-redux'
import Link from '@material-ui/core/Link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Box, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import voucherDetail from '../../services/marketing/voucherDetail'
import { pageShowSnackbar } from '../../redux/actions/page'
import Loader from '../Loader'
import Notfound from '../Notfound'
import { formatCurrency } from '../../helpers/currency'

const useStyles = makeStyles({
  buttonPadding: {
    paddingLeft: 30,
    paddingRight: 30,
  },
})

const VoucherDetail = ({ voucherId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (voucherId) {
      setIsLoading(true)
      voucherDetail({ voucherId, token })
        .then((result) => {
          setData(result)
          setIsLoading(false)
        })
        .catch((error) => {
          setData(null)
          setIsLoading(false)
          dispatch(
            pageShowSnackbar({
              severity: 'error',
              message: error.message,
              vertical: 'top',
              horizontal: 'right',
            }),
          )
        })
    }
  }, [voucherId])

  const specialistsName = (data) => {
    const specialists = data.map((_) => _.name).join(', ') || '-'
    return specialists
  }

  const doctorsName = (data) => {
    const doctors = data.map((_) => _.name).join(', ') || '-'
    return doctors
  }

  const patientsName = (data) => {
    const patiens = data.map((_) => _.name).join(', ') || '-'
    return patiens
  }

  const hospitalsName = (data) => {
    const hospitals = data.map((_) => _.name).join(', ') || '-'
    return hospitals
  }

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading && !data) {
    return <Notfound />
  }

  return (
    <Box pb={5}>
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
        <Grid container justifyContent="space-between">
          <Grid item>
            <Link href="/payment/data-voucher/list">{`< Kembali`}</Link>
          </Grid>
          <Grid item>
            <Button
              onClick={() =>
                window.location.replace(
                  `/payment/data-voucher/edit/${voucherId}`,
                )
              }
              className={classes.LinkPadding}
              variant="contained"
              color="primary"
              style={{ textTransform: 'none' }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box px={3}>
        <Box borderRadius={5} boxShadow={4} pt={3} pb={8}>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Begin Effective</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.begin_effective_date &&
                moment(data.begin_effective_date, 'DD-MM-YYYY').format(
                  'DD-MM-YYYY',
                )}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>End Effective</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.begin_effective_date &&
                moment(data.end_effective_date, 'DD-MM-YYYY').format(
                  'DD-MM-YYYY',
                )}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Voucher Flag</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.voucher_flag || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Voucher Code</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.voucher_code || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Promo Combination</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.promo_combination?.toString() || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Minimum Transaction</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {formatCurrency(data.minimum_transaction, 'Rp') || '-'}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Specialist Category ID</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.specialists?.data?.length > 0
                ? specialistsName(data.specialists.data)
                : '-'}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Doctor ID (optional)</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.doctors?.data?.length > 0
                ? doctorsName(data.doctors.data)
                : '-'}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Patient ID (optional)</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.patients?.data?.length > 0
                ? patientsName(data.patients.data)
                : '-'}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Hospital ID (optional)</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>
              {data?.hospitals?.data?.length > 0
                ? hospitalsName(data.hospitals.data)
                : '-'}
            </Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Type of service</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.type_of_service || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>User per customer</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.use_per_customer || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>User per Discount</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.use_per_discount || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Amount Flag</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.amount_flag || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Voucher Amount</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.voucher_amount || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Max. Amount</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data.maximum_amount || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Amount Coverage by Marketing</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.amount_covered_by_marketing || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Amount Coverage by Doctor</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.amount_covered_by_doctor || '-'}</Box>
          </Box>
          <Box display="flex" paddingX={3} paddingY={1}>
            <Box width={2 / 6}>Amount Coverage by Hospital</Box>
            <Box marginX={1}>:</Box>
            <Box flex={1}>{data?.amount_covered_by_hospital || '-'}</Box>
          </Box>
          <Box mt={3}>
            <Grid container>
              <Grid item xs={6} p={0}>
                <Box display="flex" paddingX={3} paddingY={1}>
                  <Box width={2 / 6}>Created By</Box>
                  <Box marginLeft={2} marginRight={1}>
                    :
                  </Box>
                  <Box flex={1}>{data?.created_by || '-'}</Box>
                </Box>
                <Box display="flex" paddingX={3} paddingY={1}>
                  <Box width={2 / 6}>Created Date</Box>
                  <Box marginLeft={2} marginRight={1}>
                    :
                  </Box>
                  <Box flex={1}>
                    {data?.created_at
                      ? moment(data.created_at, 'DD-MM-YYYY HH:mm').format(
                          'DD-MM-YYYY HH:mm',
                        )
                      : '-'}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" paddingX={3} paddingY={1}>
                  <Box width={2 / 6}>Modified by</Box>
                  <Box marginLeft={2} marginRight={1}>
                    :
                  </Box>
                  <Box flex={1}>{data?.updated_by || '-'}</Box>
                </Box>
                <Box display="flex" paddingX={3} paddingY={1}>
                  <Box width={2 / 6}>Modified date</Box>
                  <Box marginLeft={2} marginRight={1}>
                    :
                  </Box>
                  <Box flex={1}>
                    {data?.updated_at
                      ? moment(data.updated_at, 'DD-MM-YYYY HH:mm').format(
                          'DD-MM-YYYY HH:mm',
                        )
                      : '-'}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

VoucherDetail.propTypes = {
  voucherId: PropTypes.string.isRequired,
}

export default VoucherDetail
