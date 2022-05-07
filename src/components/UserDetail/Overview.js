import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import moment from 'moment'

const Overview = ({ data = null }) => {
  return (
    <div>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          mr={2}
          overflow="auto"
        >
          <Box display="flex">
            <Box flex={1}>User ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data.ref_id}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>First Name</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.first_name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Last Name</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.last_name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Email</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {`${data.email} (${
                data.is_verified_email ? 'Verified' : 'Not Verified'
              })`}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Phone Number</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {`${data.phone} (${
                data.is_verified_phone ? 'Verified' : 'Not Verified'
              })`}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Gender</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.gender || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Birth Country</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.birth_country?.name || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Birth Place</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.birth_place || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Birth Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.birth_date
                ? `${moment(data?.user_details?.birth_date).format(
                    'DD/MM/YYYY',
                  )} (${data?.user_details?.age?.year || '0'} Year ${
                    data?.user_details?.age?.month || '0'
                  } ${data?.user_details?.age?.month > 1 ? 'Months' : 'Month'})`
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Role</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data.user_role.join(', ')}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Status System</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.status}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Created Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {moment(data?.registered_at).format('DD/MM/YYYY HH:mm:ss')}
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} overflow="auto">
          <Box display="flex">
            <Box flex={1}>Nationality</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.nationality?.name || '-'}
            </Box>
          </Box>
          <Box display="flex">
            <Box flex={1}>SAP Patient ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.sap_patient_id || '-'}
            </Box>
          </Box>
          <Box display="flex">
            <Box flex={1}>Card ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.id_card || '-'}
            </Box>
          </Box>
          <Box display="flex">
            <Box flex={1}>Photo Card ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={2} fontWeight="bold">
              {data?.user_details?.photo_id_card?.url ? '' : '-'}
            </Box>
          </Box>
          <Box display="flex">
            {data?.user_details?.photo_id_card?.url ? (
              <img src={data?.user_details?.photo_id_card?.url} />
            ) : (
              '-'
            )}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Overview
