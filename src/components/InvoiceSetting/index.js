import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Delete from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import useInvoiceSetting from './hooks/useInvoiceSetting'

const useStyle = makeStyles({
  labelRoot: {
    color: '#000',
    fontSize: 14,
    '&$labelFocused': {},
  },
  plusBulletUpload: {
    width: '35px',
    color: '#fff',
    height: '35px',
    display: 'flex',
    fontSize: '26px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '50%',
    marginBottom: '10px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#3F51B5',
  },
  labelFocused: {},
  buttonSubmit: {
    color: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#3F51B5',
    textTransform: 'capitalize',
    '&:hover': {
      background: '#6274d7',
    },
    '&:disabled': {
      color: '#fff',
      backgroundColor: '#C7C9D9',
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
  previewImageField: {
    flex: '1 1 0%',
    display: 'flex',
    overflow: 'hidden',
    border: 'dashed 2px #6B7588',
    padding: '15px',
    backgroundImage:
      'linear-gradient(45deg, #e7e7e7 25%, transparent 25%), linear-gradient(135deg, #e7e7e7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e7e7e7 75%), linear-gradient(135deg, transparent 75%, #e7e7e7 75%)',
    backgroundSize: '25px 25px',
    backgroundPosition: '0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px',
  },
})

const InvoiceSetting = () => {
  const classes = useStyle()
  const {
    stamp,
    submit,
    cashier,
    disabled,
    setCashier,
    removeStamp,
    fileHandler,
  } = useInvoiceSetting()

  return (
    <Box pb={5}>
      <Box p={3}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ boxShadow: '0 4px 2px -2px #C7C7D2', paddingBottom: '15px' }}
        >
          <Link color="inherit" href="#" onClick={() => {}}>
            Pengaturan invoice
          </Link>
          <Link color="inherit" href="#" onClick={() => {}}>
            {' '}
          </Link>
        </Breadcrumbs>
      </Box>
      <form
        id="formData"
        encType="multipart/form-data"
        onSubmit={(event) => submit(event)}
      >
        <Box px={3} paddingBottom={2}>
          <Grid container>
            <Grid item xs={7}>
              <Typography style={{ fontWeight: 'bold' }}>
                Pengaturan Invoice
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  disabled={disabled}
                  className={classes.buttonSubmit}
                >
                  Simpan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box px={3}>
          <Grid container>
            <Grid item xs={4}>
              <Box paddingLeft={5} paddingTop={4}>
                <InputLabel
                  style={{
                    marginBottom: '10px',
                    fontSize: '12px',
                    color: '#000',
                  }}
                >
                  Nama Kasir <label style={{ color: 'red' }}>*</label>
                </InputLabel>
                <Input
                  type="text"
                  value={cashier || ''}
                  style={{ width: '100%' }}
                  onChange={(event) => setCashier(event.target.value)}
                />
              </Box>
              <Box paddingLeft={5} paddingTop={4}>
                <Typography className={classes.labelRoot}>
                  Stamp <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Box marginTop={1} className={classes.boxUpload}>
                  <Box className={classes.uploadWrap}>
                    {stamp.url ? (
                      // image preview field
                      <Box className={classes.previewImageField}>
                        <img
                          src={stamp.url}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                    ) : (
                      // upload image button
                      <Box className={classes.buttonUploadWrap}>
                        <span style={{ textAlign: 'center', color: '#8F90A6' }}>
                          <label className={classes.plusBulletUpload}>+</label>
                          Upload Image
                        </span>
                      </Box>
                    )}
                    <input
                      name="file"
                      type="file"
                      onChange={fileHandler}
                      className={classes.uploadField}
                    />
                    <Box className={classes.actionUploadWrap}>
                      {stamp?.url !== '' && (
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#3F51B5',
                            }}
                          >
                            Replace Stamp
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
                              onClick={() => removeStamp()}
                            >
                              <span style={{ marginRight: '5px' }}>Remove</span>{' '}
                              <Delete fontSize="small" />
                            </Button>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box paddingLeft={5} paddingTop={8}>
                <Typography style={{ color: '#8F90A6' }}>
                  *format gambar .png, .jpeg, .jpg atau .bmp
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  )
}

export default InvoiceSetting
