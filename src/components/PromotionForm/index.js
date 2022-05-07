import React, { useState } from 'react'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TabPanel from '../../components/TabPanel'
import { makeStyles } from '@material-ui/core/styles'
import useForm from './hooks/useForm'
import useOption from './hooks/useOption'
import TextEditor from '../TextEditor'
import Delete from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  number: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  input: {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  tabFont: {
    textTransform: 'capitalize',
    fontSize: '16px',
  },
  plusBulletUpload: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: '26px',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#3F51B5',
    color: '#fff',
  },
  boxUpload: {
    overflow: 'hidden',
    borderRadius: '10px',
    position: 'relative',
    paddingBottom: '60%',
    backgroundColor: '#EBEBF0',
    border: 'dashed 2px #6B7588',
  },
  buttonUploadWrap: {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  uploadField: {
    top: '0',
    left: '0',
    opacity: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  },
  breadcrumbs: {
    boxShadow: '0 4px 2px -2px #C7C7D2',
    paddingBottom: '15px',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      color: '#3E8CB9',
    },
    '& p': {
      fontWeight: 'bold',
      paddingLeft: '3rem',
    },
  },
  boxUpload: {
    position: 'relative',
    paddingBottom: '80%',
  },
  uploadWrap: {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    borderRadius: '10px',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonUploadWrap: {
    width: '100%',
    flex: '1 1 0%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBF0',
    overflow: 'hidden',
    border: 'dashed 2px #6B7588',
  },
  uploadField: {
    top: '0',
    left: '0',
    opacity: 0,
    zIndex: '1',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  actionUploadWrap: {
    display: 'flex',
    minHeight: '50px',
    paddingTop: '15px',
    justifyContent: 'space-between',
  },
  modalDeactive: {
    top: '0',
    left: '0',
    zIndex: '9',
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    '& button': {
      width: '110px',
      cursor: 'pointer',
      padding: '10px 0',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: '10px',
      backgroundColor: '#fff',
    },
  },
  '.MuiAutocomplete-root.Mui-focused.MuiAutocomplete-clearIndicatorDirty': {
    visibility: 'hidden !important',
  },
}))

const PromotionForm = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const {
    types,
    merchants,
    vouchers,
    setVoucherCode,
    deeplinkTypes,
    hospitals,
  } = useOption()

  const {
    images,
    payload,
    changeTab,
    setPayload,
    triggerTab,
    useHospital,
    fileHandler,
    inputHandler,
    removeImages,
    submitHandler,
    isModalDeactive,
    setIsModalDeactive,
  } = useForm()

  const dropdown = ({
    required,
    label,
    placeholder,
    options,
    value,
    display,
    handleChange,
  }) => (
    <Box sx={{ width: '100%', display: display || '' }} pr={2}>
      <InputLabel
        style={{
          marginBottom: '8px',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#000',
        }}
      >
        {label} {required && <label style={{ color: 'red' }}>*</label>}
      </InputLabel>
      <Select
        fullWidth
        displayEmpty
        value={value || ''}
        onChange={handleChange}
      >
        <MenuItem value="">{placeholder}</MenuItem>
        {options.map((item, index) => (
          <MenuItem key={index.toString()} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )

  const dropdownAutoComplete = ({
    label,
    options,
    dataValue,
    placeholder,
    handleChange,
  }) => {
    const optionsFilter = options?.filter(
      (row) => row?.value !== dataValue?.value,
    )
    const optionsUpdate = [
      { label: dataValue?.label, value: dataValue?.value },
    ].concat(optionsFilter)

    return (
      <Box sx={{ width: '100%' }} pr={2}>
        <InputLabel
          style={{
            color: '#000',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >
          {label}
        </InputLabel>
        <Autocomplete
          value={dataValue}
          options={optionsUpdate}
          sx={{ width: 300 }}
          defaultValue={null}
          onChange={handleChange}
          onInputChange={(event) => setVoucherCode(event?.target?.value)}
          getOptionLabel={(option) => option?.label || ''}
          getOptionSelected={(option, value) => option?.value === value?.value}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
      </Box>
    )
  }

  const inputField = ({
    name,
    type,
    value,
    label,
    display,
    placeholder,
    handleChange,
    isMandatoryIcon = true,
  }) => (
    <Box sx={{ width: '100%', display: display || '' }} pr={2}>
      <InputLabel
        style={{
          marginBottom: '10px',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#000',
        }}
      >
        {label} {isMandatoryIcon && <label style={{ color: 'red' }}>*</label>}
      </InputLabel>
      <Input
        className={classes.number}
        name={name || ''}
        value={value || ''}
        type={type || 'text'}
        id="component-simple"
        onChange={handleChange}
        placeholder={placeholder || ''}
        style={{ width: '100%', fontSize: '13px' }}
      />
    </Box>
  )

  const textAreaField = ({ label }) => (
    <Box sx={{ width: '100%' }} pr={2}>
      <InputLabel
        style={{
          marginBottom: '10px',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#000',
        }}
      >
        {label} <label style={{ color: 'red' }}>*</label>
      </InputLabel>
      <Box sx={{ border: 'solid 1px #ddd' }}>
        <TextEditor
          isEdit={!!payload?.id || changeTab}
          value={payload?.description}
          handler={(content) => inputHandler('description', content)}
        />
      </Box>
    </Box>
  )

  const submitHandlerComponent = (status, isUpdate = false) => {
    const text =
      (status === 'RELEASE' && (isUpdate ? 'Update' : 'Release')) ||
      (status === 'DRAFT' && 'Save as draft') ||
      (status === 'DEACTIVATE' && 'Deactivated')
    const backgroundColor =
      (status === 'RELEASE' && '#06C270') ||
      (status === 'DRAFT' && '#3F51B5') ||
      'transparent'
    const color =
      (status === 'RELEASE' && '#ffffff') ||
      (status === 'DRAFT' && '#ffffff') ||
      (status === 'DEACTIVATE' && '#FF5C5C')
    const border = (status === 'DEACTIVATE' && 'solid 1px #FF5C5C') || 'none'

    return (
      <Button
        onClick={() =>
          status !== 'DEACTIVATE'
            ? submitHandler(status)
            : setIsModalDeactive(true)
        }
        variant="contained"
        style={{
          color,
          border,
          width: '130px',
          backgroundColor,
          marginLeft: '15px',
          textTransform: 'none',
        }}
      >
        {text}
      </Button>
    )
  }

  return (
    <Box>
      {isModalDeactive && (
        <Box className={classes.modalDeactive}>
          <Box
            sx={{
              color: '#3A3A3C',
              borderRadius: '15px',
              backgroundColor: '#fff',
              padding: '5px 25px 5px',
            }}
          >
            <p>
              <b>Confirmation</b>
            </p>
            <p style={{ fontSize: '15px' }}>
              Are you sure to deactivate this promo detail?
            </p>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '35px 0 25px 0',
                justifyContent: 'center',
              }}
            >
              <button
                style={{
                  color: '#3E8CB9',
                  border: 'solid 1px #3E8CB9',
                }}
                onClick={() => {
                  submitHandler('DEACTIVATE')
                  setIsModalDeactive(false)
                }}
              >
                Yes
              </button>
              <button
                style={{
                  color: '#FF5C5C',
                  border: 'solid 1px #FF5C5C',
                }}
                onClick={() => setIsModalDeactive(false)}
              >
                Cancel
              </button>
            </Box>
          </Box>
        </Box>
      )}
      <Box py={3}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/promotion">
            Promotion Program
          </Link>
          <Link color="inherit" href="#">
            {!payload?.id && 'New'} Promotion{' '}
            {!payload?.id ? 'Form' : 'Details'}
          </Link>
        </Breadcrumbs>
      </Box>
      <Box py={3} display="flex" alignItems="center">
        <Link style={{ color: '#3E8CB9' }} href="/promotion" onClick={() => {}}>
          {'< Back'}
        </Link>
        <Typography style={{ fontWeight: 'bold', paddingLeft: '3rem' }}>
          {!payload?.id && 'New'} Promotion {!payload?.id ? 'Form' : 'Details'}
        </Typography>
      </Box>
      <Box
        pb={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontSize: '14px', color: '#6B7588' }}>
          {payload?.id && `Promotion ID : ${payload?.id || '-'}`}
        </Box>
        {!payload?.id && (
          <Box>
            {submitHandlerComponent('DRAFT')}
            {submitHandlerComponent('RELEASE')}
          </Box>
        )}
        {payload?.status === 'Draft' && payload?.id && (
          <Box>
            {submitHandlerComponent('DRAFT')}
            {submitHandlerComponent('RELEASE')}
          </Box>
        )}
        {payload?.status === 'Released' && payload?.id && (
          <Box>
            {submitHandlerComponent('RELEASE', true)}
            {submitHandlerComponent('DEACTIVATE')}
          </Box>
        )}
      </Box>
      <Box
        pb={3}
        pt={2}
        style={{ border: 'solid 1px #ddd', borderRadius: '5px' }}
      >
        <Box style={{ marginBottom: 5, borderBottom: 'solid 1px #ddd' }}>
          <Grid container>
            <Grid item xs={7}>
              <Tabs
                variant="fullWidth"
                value={tab}
                onChange={(_, selectedTab) => setTab(selectedTab)}
                textColor={'primary'}
                indicatorColor={'primary'}
              >
                <Tab
                  className={classes.tabFont}
                  onClick={() => triggerTab(true)}
                  label={
                    <React.Fragment>
                      Promotion
                      <br />
                      Title
                    </React.Fragment>
                  }
                  wrapped
                />
                <Tab
                  className={classes.tabFont}
                  onClick={() => triggerTab(false)}
                  label={
                    <React.Fragment>
                      Banner
                      <br />
                      Picture
                    </React.Fragment>
                  }
                  wrapped
                />
                <Tab
                  className={classes.tabFont}
                  onClick={() => triggerTab(false)}
                  label="Deeplink"
                  wrapped
                />
              </Tabs>
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box>
                  <Typography style={{ fontSize: '12px' }}>
                    Release Date :
                  </Typography>
                  <Typography style={{ fontSize: '12px' }}>
                    {payload?.releaseDate || '-'}
                  </Typography>
                </Box>
                <Box pl={4}>
                  <Typography style={{ fontSize: '12px' }}>
                    Deactivated Date :
                  </Typography>
                  <Typography style={{ fontSize: '12px' }}>
                    {payload?.deactiveDate || '-'}
                  </Typography>
                </Box>
                <Box px={4} display="flex" alignItems="center">
                  <Typography style={{ fontSize: '12px' }}>Status</Typography>
                  <Typography style={{ fontSize: '12px' }}>
                    {(payload?.status === 'Draft' || !payload?.status) && (
                      <Button
                        onClick={() => {}}
                        variant="contained"
                        style={{
                          color: '#2C528B',
                          marginLeft: '10px',
                          backgroundColor: '#9DBFF9',
                        }}
                      >
                        Draft
                      </Button>
                    )}
                    {payload?.status === 'Released' && (
                      <Button
                        onClick={() => {}}
                        variant="contained"
                        style={{
                          color: '#0fa864',
                          marginLeft: '10px',
                          backgroundColor: '#abf5d0',
                        }}
                      >
                        Released
                      </Button>
                    )}
                    {payload?.status === 'Deactivated' && (
                      <Button
                        onClick={() => {}}
                        variant="contained"
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#ffbfbf',
                          color: '#d02c2a',
                        }}
                      >
                        Deactivated
                      </Button>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <TabPanel value={tab} index={0}>
            <Grid container>
              <Grid item pr={3} xs={7}>
                <Box pr={5}>
                  <Box mb={4} style={{ width: '100%' }}>
                    {inputField({
                      label: 'Promotion Title',
                      value: payload?.title || '',
                      placeholder: 'Type promotion title here',
                      handleChange: (e) =>
                        inputHandler('title', e.target.value),
                    })}
                  </Box>
                  <Box style={{ width: '100%', minHeight: '400px' }}>
                    {textAreaField({ label: 'Deskripsi' })}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                  pl={4}
                >
                  <Box
                    sx={{
                      width: '100%',
                      mb: 4,
                      display: 'flex',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ width: '70%' }}>
                      {dropdown({
                        required: true,
                        label: 'Choose Promotion Type',
                        placeholder: 'Choose Promotion Type',
                        options: types,
                        value: payload?.promotionType,
                        display: '',
                        handleChange: (e) =>
                          inputHandler('promotionType', e.target.value),
                      })}
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      {inputField({
                        label: 'Rank Weight',
                        value: payload?.rankWeight,
                        placeholder: '00',
                        type: 'number',
                        handleChange: (e) =>
                          inputHandler('rankWeight', e.target.value),
                        isMandatoryIcon: false,
                      })}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      flex: '1 1 0%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignContent: 'flex-start',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mt: 15,
                        mb: 4,
                      }}
                    >
                      {dropdown({
                        required: true,
                        label: 'Merchant Type',
                        placeholder: 'Choose Merchant Type',
                        options: merchants,
                        value: payload?.merchantType,
                        display: '',
                        handleChange: (e) =>
                          inputHandler('merchantType', e.target.value),
                      })}
                    </Box>
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mb: 4,
                      }}
                    >
                      {dropdown({
                        required: true,
                        label: 'Merchant Name',
                        placeholder: 'Choose Hospital',
                        options: hospitals,
                        value:
                          payload?.merchantName?.toLowerCase() === 'alteacare'
                            ? ''
                            : payload?.merchantName,
                        display: !useHospital && 'none',
                        handleChange: (e) =>
                          inputHandler('merchantName', e.target.value),
                      })}
                      {inputField({
                        label: 'Merchant Name',
                        name: 'merchantName',
                        value: payload?.merchantName,
                        display: useHospital && 'none',
                        handleChange: (e) =>
                          inputHandler('merchantName', e.target.value),
                      })}
                    </Box>
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mb: 4,
                      }}
                    >
                      {dropdownAutoComplete({
                        options: vouchers,
                        label: 'Voucher Code',
                        placeholder: 'Choose Voucher Code',
                        dataValue:
                          payload?.voucherCode && payload?.voucherDataId
                            ? {
                                label: payload?.voucherCode,
                                value: payload?.voucherDataId,
                              }
                            : null,
                        handleChange: (e, values) => {
                          setPayload({
                            ...payload,
                            voucherDataId: values?.value,
                            voucherCode: values?.label,
                          })
                        },
                      })}
                    </Box>
                    <Box sx={{ color: '#8F90A6', fontSize: '13px' }}>
                      <Typography>
                        *Hanya dapat memilih voucher
                        <br />
                        dengan Flag &quot;Single&quot;
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Grid container>
              <Grid item xs={4}>
                <Box xs={4} paddingX={2} paddingTop={2}>
                  <Typography className={classes.labelRoot}>
                    Thumbnail Banner
                  </Typography>
                  <Box marginTop={1} className={classes.boxUpload}>
                    <Box className={classes.uploadWrap}>
                      <Box className={classes.buttonUploadWrap}>
                        {images?.thumbnail !== '' ? (
                          <img
                            src={images?.thumbnail}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <span
                            style={{ textAlign: 'center', color: '#8F90A6' }}
                          >
                            <label className={classes.plusBulletUpload}>
                              +
                            </label>
                            Upload Banner <br />
                            <label style={{ fontSize: '12px' }}>
                              Ratio 2:1
                            </label>
                          </span>
                        )}
                      </Box>
                      <input
                        type="file"
                        name="thumbnail"
                        onChange={(e) => fileHandler(e, 'thumbnail')}
                        className={classes.uploadField}
                      />
                      <Box className={classes.actionUploadWrap}>
                        {images?.thumbnail !== '' && (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#3F51B5',
                              }}
                            >
                              Replace Banner
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                position: 'relative',
                                zIndex: '2',
                              }}
                            >
                              <Button
                                style={{
                                  textTransform: 'capitalize',
                                  color: '#FF5C5C',
                                }}
                                onClick={() => removeImages('thumbnail')}
                              >
                                <span style={{ marginRight: '5px' }}>
                                  Remove
                                </span>{' '}
                                <Delete fontSize="small" />
                              </Button>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box xs={4} paddingX={2} paddingTop={2}>
                  <Typography className={classes.labelRoot}>
                    Detail Banner
                  </Typography>
                  <Box marginTop={1} className={classes.boxUpload}>
                    <Box className={classes.uploadWrap}>
                      <Box className={classes.buttonUploadWrap}>
                        {images?.detail !== '' ? (
                          <img
                            src={images?.detail}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <span
                            style={{ textAlign: 'center', color: '#8F90A6' }}
                          >
                            <label className={classes.plusBulletUpload}>
                              +
                            </label>
                            Upload Banner <br />
                            <label style={{ fontSize: '12px' }}>
                              Ratio 16:9
                            </label>
                          </span>
                        )}
                      </Box>
                      <input
                        type="file"
                        name="detail"
                        onChange={(e) => fileHandler(e, 'detail')}
                        className={classes.uploadField}
                      />
                      <Box className={classes.actionUploadWrap}>
                        {images?.detail !== '' && (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#3F51B5',
                              }}
                            >
                              Replace Banner
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                position: 'relative',
                                zIndex: '2',
                              }}
                            >
                              <Button
                                style={{
                                  textTransform: 'capitalize',
                                  color: '#FF5C5C',
                                }}
                                onClick={() => removeImages('detail')}
                              >
                                <span style={{ marginRight: '5px' }}>
                                  Remove
                                </span>{' '}
                                <Delete fontSize="small" />
                              </Button>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Grid item xs={9}>
              <Box
                sx={{
                  marginBottom: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    mb: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}
                >
                  <Box sx={{ width: '30%' }}>
                    {dropdown({
                      required: false,
                      label: 'Deeplink Android',
                      placeholder: 'Choose Deeplink Type',
                      options: deeplinkTypes,
                      value: payload?.deeplinkTypeAndroid,
                      display: '',
                      handleChange: (e) =>
                        inputHandler('deeplinkTypeAndroid', e.target.value),
                    })}
                  </Box>
                  <Box sx={{ width: '70%' }}>
                    {inputField({
                      name: 'android',
                      label: 'Deeplink Android',
                      value: payload?.deeplinkUrlAndroid,
                      placeholder: 'appointment/{type}/{appointmentid}',
                      handleChange: (e) =>
                        inputHandler('deeplinkUrlAndroid', e.target.value),
                      isMandatoryIcon: false,
                    })}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    mb: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}
                >
                  <Box sx={{ width: '30%' }}>
                    {dropdown({
                      required: false,
                      label: 'Deeplink IOS',
                      placeholder: 'Choose Deeplink Type',
                      options: deeplinkTypes,
                      value: payload?.deeplinkTypeIos,
                      display: '',
                      handleChange: (e) =>
                        inputHandler('deeplinkTypeIos', e.target.value),
                    })}
                  </Box>
                  <Box sx={{ width: '70%' }}>
                    {inputField({
                      label: 'Deeplink IOS',
                      name: 'ios',
                      value: payload?.deeplinkUrlIos,
                      placeholder: 'appointment/{type}/{appointmentid}',
                      handleChange: (e) =>
                        inputHandler('deeplinkUrlIos', e.target.value),
                      isMandatoryIcon: false,
                    })}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    mb: 4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}
                >
                  {inputField({
                    label: 'Deeplink Web',
                    name: 'web',
                    value: payload?.deeplinkWeb,
                    placeholder: 'Type Link',
                    handleChange: (e) =>
                      inputHandler('deeplinkWeb', e.target.value),
                    isMandatoryIcon: false,
                  })}
                </Box>
              </Box>
              <Box sx={{ color: '#8F90A6', fontSize: '14px' }}>
                *dengan menginput deeplink, akan memunculkan button{' '}
                <b>Lihat Lebih Lanjut</b> pada aplikasi user.
              </Box>
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default PromotionForm
