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
          flex={2}
          mr={2}
          overflow="auto"
        >
          <Box display="flex">
            <Box flex={1}>Room ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.id}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Method</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.method || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Relation Type</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.relation_type || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Relation ID</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.relation_id || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Status</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data?.status || '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Created Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.created_at
                ? moment(data.created_at).format('DD/MM/YYYY HH:mm:ss')
                : '-'}
            </Box>
          </Box>
          <Box display="flex" mt={1}>
            <Box flex={1}>Updated Date</Box>
            <Box marginX={2}>:</Box>
            <Box flex={1} fontWeight="bold">
              {data.updated_at
                ? moment(data.updated_at).format('DD/MM/YYYY HH:mm:ss')
                : '-'}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          overflow="auto"
        ></Box>
      </Box>
    </div>
  )
}

Overview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Overview
