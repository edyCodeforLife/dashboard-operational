import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { batch, useDispatch } from 'react-redux'
import { Card, TextField } from '@material-ui/core'
import {
  pageIsBackdropOpen,
  pageSetTitle,
  pageShowSnackbar,
} from '../../redux/actions/page'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import userSearch from '../../services/user/search'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

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

const Search = () => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailData, setDetailData] = useState({})
  const { loggedIn, token } = useAuthentication()
  const dispatch = useDispatch()
  const [emailPhoneNumber, setEmailPhoneNumber] = useState('')

  useEffect(() => {
    dispatch(pageSetTitle('Search User'))
  }, [])

  const searchUser = async () => {
    dispatch(pageIsBackdropOpen(true))

    try {
      const data = await userSearch({
        token,
        email: emailPhoneNumber,
        phone: emailPhoneNumber,
      })

      setIsModalOpen(true)
      setDetailData(data || {})
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'error',
            message: error.message,
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
    }
  }

  if (!loggedIn) {
    return null
  }

  return (
    <>
      <Card>
        <Alert severity="info">
          This feature used for Search User by Email or Phone Number
        </Alert>
        <Box display="flex" p={4}>
          <TextField
            label="Email/Phone Number"
            value={emailPhoneNumber}
            onChange={(e) => setEmailPhoneNumber(e.target.value)}
          />
          <Box mt={1.5} ml={3}>
            <Button onClick={searchUser} variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Box>
      </Card>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={classes.paper}>
          {(detailData?.email?.user_id || detailData?.phone?.user_id) && (
            <Box mb={2}>
              <Button
                onClick={() =>
                  window.open(
                    `/user/${
                      detailData?.email?.user_id || detailData?.phone?.user_id
                    }`,
                    '_blank',
                  )
                }
                variant="contained"
                color="primary"
              >
                Detail User ({emailPhoneNumber})
              </Button>
            </Box>
          )}
          <ReactJson src={detailData} />
        </div>
      </Modal>
    </>
  )
}

export default Search
