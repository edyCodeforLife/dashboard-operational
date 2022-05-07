import { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import getInvoiceSetting from '../../../services/invoiceSetting/getInvoiceSetting'
import updateInvoiceSetting from '../../../services/invoiceSetting/updateInvoiceSetting'

import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'

const useInvoiceSetting = () => {
  const dispatch = useDispatch()
  const { token } = useShallowEqualSelector((state) => state.user)

  const [files, setFiles] = useState(null)
  const [cashier, setCashier] = useState('')
  const [idInvoice, setIdInvoice] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [stamp, setStamp] = useState({ url: '' })

  const [digitalInvoice, setDigitalInvoice] = useState(null)

  const fileValidator = (event) =>
    new Promise((resolve, reject) => {
      const file = event.target.files[0]
      const fileType = file.type
      const fileSize = file.size
      const validImageTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/bmp',
      ]

      if (fileSize >= 10240000) {
        reject(new Error('File hanya bisa di upload maximum 10 mb'))
      }
      if (validImageTypes.indexOf(fileType) === -1) {
        reject(new Error('File hanya bisa gambar'))
      }
      resolve(true)
    })

  const fileHandler = async (file) => {
    try {
      await fileValidator(file)
      const files = file?.target?.files?.[0]
      setFiles(files)
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setStamp({ url: reader.result })
      })
      reader.readAsDataURL(file?.target?.files[0])
      if (!file && !files) return false

      return true
    } catch (error) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: error?.data?.message || error?.message,
          vertical: 'top',
          horizontal: 'right',
        }),
      )
      return true
    }
  }

  const handlerSetDigitalInvoice = (result) => {
    setIdInvoice(result?.id)
    setDigitalInvoice(result)
    setCashier(result?.nama_kasir)

    setStamp({
      url:
        result?.cap_digital_invoice?.formats?.medium ||
        result?.cap_digital_invoice?.url,
    })
  }

  const getInvoiceSettingApi = async () => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const result = await getInvoiceSetting({ token })
      handlerSetDigitalInvoice(result)
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      batch(() => {
        dispatch(pageIsBackdropOpen(false))
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
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      dispatch(pageIsBackdropOpen(true))
      const data = JSON.stringify({ nama_kasir: cashier })
      const formData = new FormData()
      formData.append('data', data)
      if (files) {
        formData.append('files.cap_digital_invoice', files, files?.name)
      }
      const result = await updateInvoiceSetting({ idInvoice, formData, token })
      handlerSetDigitalInvoice(result)
      batch(() => {
        dispatch(
          pageShowSnackbar({
            severity: 'success',
            message: 'Pengaturan Invoice berhasil disimpan!',
            vertical: 'top',
            horizontal: 'right',
          }),
        )
        dispatch(pageIsBackdropOpen(false))
      })
    } catch (error) {
      batch(() => {
        dispatch(pageIsBackdropOpen(false))
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
  }

  const removeStamp = () => {
    setStamp({ url: '' })
  }

  useEffect(() => {
    getInvoiceSettingApi()
  }, [])

  useEffect(() => {
    setDisabled(!(cashier !== '' && stamp?.url !== ''))
  }, [cashier, stamp?.url])

  useEffect(
    () => () => {
      setFiles(null)
      setCashier('')
      setIdInvoice('')
      setDisabled(true)
      setStamp({ url: '' })
      setDigitalInvoice(null)
    },
    [],
  )

  return {
    stamp,
    submit,
    cashier,
    disabled,
    setCashier,
    fileHandler,
    removeStamp,
    digitalInvoice,
  }
}

export default useInvoiceSetting
