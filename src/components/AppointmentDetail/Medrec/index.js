import {
  AppBar,
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core'
import { TabContext, TabPanel } from '@material-ui/lab'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useState } from 'react'
import DatePicker from '../../DatePicker'
import useMedrec from './hooks/useMedrec'

const Medrec = ({ appointmentId, patient, userId }) => {
  const {
    patientId,
    ektp,
    name,
    gender,
    birthdate,
    setPatientId,
    setEktp,
    setName,
    setGender,
    setBirthdate,
    checkMedrec,
    medrecs,
    externalPatientIds,
    updatePatientMedrec,
  } = useMedrec({ appointmentId, patient, userId })
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <TabContext value={currentTab}>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          aria-label="simple tabs example"
        >
          <Tab label="Current Medical Record" value={0} />
          <Tab label="Check Medical Record" value={1} />
        </Tabs>
      </AppBar>
      <TabPanel value={0} index={0}>
        <Box maxHeight={500} mt={-2} overflow="auto">
          <h3>Current Medical Record</h3>
          {Object.keys(externalPatientIds).map((provider, index) => {
            return (
              <Box display="flex" mb={1} key={index}>
                <Box flex={1}>{provider}</Box>
                <Box marginX={2}>:</Box>
                <Box flex={2} fontWeight="bold">
                  {externalPatientIds[provider]}
                </Box>
              </Box>
            )
          })}
        </Box>
      </TabPanel>
      <TabPanel value={1} index={1}>
        <Box maxHeight={500} overflow="auto">
          <h3>Cek Medical Record</h3>
          <Box mb={2}>
            <TextField
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              label="Patient ID"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              value={ektp}
              onChange={(e) => setEktp(e.target.value)}
              label="KTP"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </Box>
          <Box mb={6}>
            <DatePicker
              label="Birthdate"
              value={birthdate || moment().format('YYYY-MM-DD')}
              onChangeDate={(date) => setBirthdate(date)}
            />
          </Box>
          <Box mb={4}>
            <Button
              onClick={() => checkMedrec()}
              variant="contained"
              color="primary"
              fullWidth
            >
              Get Medical Record
            </Button>
          </Box>
          {medrecs?.map((medrec, index) => {
            return (
              <Box key={index} mb={3}>
                <Box
                  mb={2}
                  fontWeight="bold"
                >{`Medrec ID: ${medrec.external_patient_id} (${medrec.external_provider})`}</Box>
                <Box display="flex" mb={1}>
                  <Box flex={1}>Name</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {medrec.name}
                  </Box>
                </Box>
                <Box display="flex" mb={1}>
                  <Box flex={1}>KTP</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {medrec.ektp}
                  </Box>
                </Box>
                <Box display="flex" mb={1}>
                  <Box flex={1}>Gender</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {medrec.gender}
                  </Box>
                </Box>
                <Box display="flex" mb={1}>
                  <Box flex={1}>Date Of Birth</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {moment(medrec.date_of_birth, 'YYYY-MM-DD').format(
                      'DD MMMM YYYY',
                    )}
                  </Box>
                </Box>
                <Box display="flex" mb={1}>
                  <Box flex={1}>Address</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {medrec.address}
                  </Box>
                </Box>
                <Box display="flex" mb={2}>
                  <Box flex={1}>City</Box>
                  <Box marginX={2}>:</Box>
                  <Box flex={2} fontWeight="bold">
                    {medrec.city}
                  </Box>
                </Box>
                <Box mb={1}>
                  <Button
                    onClick={() =>
                      updatePatientMedrec({
                        firstName: medrec.first_name,
                        lastName: medrec.last_name,
                        externalProvider: medrec.external_provider,
                        externalPatientId: medrec.external_patient_id,
                      })
                    }
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Set Medical Record
                  </Button>
                </Box>
                <Divider flexItem={true} />
              </Box>
            )
          })}
        </Box>
      </TabPanel>
    </TabContext>
  )
}

Medrec.propTypes = {
  appointmentId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  patient: PropTypes.object.isRequired,
}

export default Medrec
