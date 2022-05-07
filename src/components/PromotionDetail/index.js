import React, { useState } from 'react'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InputLabel from '@material-ui/core/InputLabel'
import TabPanel from '../../components/TabPanel'
import { makeStyles } from '@material-ui/core/styles'
import useDetail from './hooks/useDetail'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  boxUpload: {
    overflow: 'hidden',
    borderRadius: '10px',
    position: 'relative',
    paddingBottom: '60%',
    backgroundColor: '#EBEBF0',
    border: 'solid 1px #dddddd',
  },
  buttonUploadWrap: {
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  breadcrumbs: {
    boxShadow: '0 4px 2px -2px #C7C7D2',
    paddingBottom: '15px',
  },
}))

const PromotionDetail = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { payload, images } = useDetail()

  return (
    <Box>
      <Box py={3}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
          <Link color="inherit" href="/promotion">
            Promotion Program
          </Link>
          <Link color="inherit" href="#">
            Promotion Details
          </Link>
        </Breadcrumbs>
      </Box>
      <Box py={3} display="flex" alignItems="center">
        <Link style={{ color: '#3E8CB9' }} href="/promotion" onClick={() => {}}>
          {'< Back'}
        </Link>
        <Typography style={{ fontWeight: 'bold', paddingLeft: '3rem' }}>
          Promotion Details
        </Typography>
      </Box>
      <Box pb={3} pt={2} sx={{ fontSize: '14px', color: '#6B7588' }}>
        Promotion ID : {payload?.id || '-'}
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
                  label={
                    <React.Fragment>
                      Banner
                      <br />
                      Picture
                    </React.Fragment>
                  }
                  wrapped
                />
                <Tab label="Deep Link" wrapped />
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
                    {payload?.status === 'Draft' && (
                      <Button
                        onClick={() => {}}
                        variant="contained"
                        style={{
                          marginLeft: '10px',
                          backgroundColor: '#9DBFF9',
                          color: '#fff',
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
                          marginLeft: '10px',
                          backgroundColor: '#abf5d0',
                          color: '#0fa864',
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
                    <InputLabel
                      style={{
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: '#000',
                      }}
                    >
                      Promotion Title <label style={{ color: 'red' }}>*</label>
                    </InputLabel>
                    <Typography>{payload?.title || '-'}</Typography>
                  </Box>
                  <Box style={{ width: '100%', minHeight: '400px' }}>
                    <InputLabel
                      style={{
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: '#000',
                      }}
                    >
                      Deskripsi <label style={{ color: 'red' }}>*</label>
                    </InputLabel>
                    <div
                      className="product-des"
                      dangerouslySetInnerHTML={{ __html: payload?.description }}
                    />
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
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Promotion Type <label style={{ color: 'red' }}>*</label>
                      </InputLabel>
                      <Typography>{payload?.promotionType || '-'}</Typography>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Rank Weight
                      </InputLabel>
                      <Typography>{payload?.rankWeight || '00'}</Typography>
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
                      <Box sx={{ width: '100%' }}>
                        <InputLabel
                          style={{
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#000',
                          }}
                        >
                          Merchant Type{' '}
                          <label style={{ color: 'red' }}>*</label>
                        </InputLabel>
                        <Typography>{payload?.merchantType || '-'}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mb: 4,
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <InputLabel
                          style={{
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#000',
                          }}
                        >
                          Merchant Name{' '}
                          <label style={{ color: 'red' }}>*</label>
                        </InputLabel>
                        <Typography>{payload?.merchantName || '-'}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: '70%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mb: 4,
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <InputLabel
                          style={{
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            color: '#000',
                          }}
                        >
                          Voucher Code
                        </InputLabel>
                        <Typography>{payload?.voucherCode || '-'}</Typography>
                      </Box>
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
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.buttonUploadWrap}
                    >
                      <img
                        src={images?.thumbnail}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
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
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.buttonUploadWrap}
                    >
                      <img
                        src={images?.detail}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
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
                    <Box sx={{ width: '100%' }}>
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Deeplink Android
                      </InputLabel>
                      <Typography>
                        {payload?.deeplinkTypeAndroid || '-'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '70%' }}>
                    <Box sx={{ width: '100%' }}>
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Deeplink Android
                      </InputLabel>
                      <Typography>
                        {payload?.deeplinkUrlAndroid || '-'}
                      </Typography>
                    </Box>
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
                    <Box sx={{ width: '100%' }}>
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Deeplink IOS
                      </InputLabel>
                      <Typography>{payload?.deeplinkTypeIos || '-'}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '70%' }}>
                    <Box sx={{ width: '100%' }}>
                      <InputLabel
                        style={{
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '12px',
                          color: '#000',
                        }}
                      >
                        Deeplink IOS
                      </InputLabel>
                      <Typography>{payload?.deeplinkUrlIos || '-'}</Typography>
                    </Box>
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
                  <Box sx={{ width: '100%' }}>
                    <InputLabel
                      style={{
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: '#000',
                      }}
                    >
                      Deeplink Web
                    </InputLabel>
                    <Typography>{payload?.deeplinkWeb || '-'}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ color: '#8F90A6', fontSize: '14px' }}>
                *dengan menginput deeplink, akan memunculkan button Lihat Lebih
                Lanjut pada aplikasi user.
              </Box>
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default PromotionDetail
