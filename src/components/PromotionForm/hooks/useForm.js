import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import uploadFile from '../../../services/file/uploadFile'
import savePromotion from '../../../services/marketing/savePromotion'
import updatePromotion from '../../../services/marketing/updatePromotion'
import objectToSnakeCase from '../../../helpers/snakecase-converter'
import promotionDetail from '../../../services/marketing/promotionDetail'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'
import useValidator from './useValidator'
import useOption from './useOption'

const useForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { validateDeeplink, validateMerchantName } = useValidator()
  const { merchants } = useOption()

  const [payload, setPayload] = useState(null)
  const [useHospital, setUseHospital] = useState(false)
  const [uploadProcess, setUploadProcess] = useState(false)
  const [isModalDeactive, setIsModalDeactive] = useState(false)
  const [changeTab, setChangeTab] = useState(false)
  const [images, setImages] = useState({
    thumbnail: '',
    detail: '',
  })

  const { token } = useShallowEqualSelector((state) => state.user)

  useEffect(() => validateDeeplink(payload), [payload])

  useEffect(() => {
    validateMerchantName(payload, setUseHospital)
    const type = payload?.merchantType
    const typeSelected = merchants.find((item) => item.value === type)
    delete payload?.merchantName

    if (typeSelected?.label?.toLowerCase() !== 'alteacare') {
      setPayload({ ...payload, merchantName: payload?.merchantName })
    } else {
      setPayload({ ...payload, merchantName: 'AlteaCare' })
    }
  }, [payload?.merchantType])

  useEffect(async () => {
    const { id } = router.query

    if (id) {
      try {
        dispatch(pageIsBackdropOpen(true))
        const detail = await promotionDetail({ id, token })

        setPayload({
          ...payload,
          id: detail?.id,
          title: detail?.title,
          status: detail?.status,
          description: detail?.description,
          rankWeight: detail?.weight,
          merchantName: detail?.merchant_name,
          merchantType: detail?.merchant_type_id,
          voucherDataId: detail?.voucher_code_id,
          voucherCode:
            detail?.voucher_code !== '-' ? detail?.voucher_code : null,
          imageBannerDetail: detail?.image_banner_detail_id,
          imageBannerThumbnail: detail?.image_banner_thumbnail_id,
          promotionType: detail?.promotion_type_id,
          releaseDate: detail?.released_at
            ? moment(detail?.released_at).format('DD/MM/YYYY')
            : null,
          deeplinkTypeAndroid: detail?.deeplink_type_android && 'ANDROID',
          deeplinkTypeIos: detail?.deeplink_type_ios && 'IOS',
          deeplinkUrlAndroid: detail?.deeplink_url_android,
          deeplinkUrlIos: detail?.deeplink_url_ios,
          deeplinkWeb: detail?.deeplink_web,
          deactiveDate:
            detail?.deactivated_at &&
            moment(detail?.deactivated_at).format('DD/MM/YYYY'),
        })

        setUseHospital(detail?.merchant_type?.toLowerCase() === 'hospital')

        setImages({
          ...images,
          thumbnail:
            detail?.image_banner_thumbnail?.formats?.thumbnail ||
            detail?.image_banner_thumbnail?.url,
          detail:
            detail?.image_banner_detail?.formats?.thumbnail ||
            detail?.image_banner_detail?.url,
        })
        dispatch(pageIsBackdropOpen(false))
      } catch (err) {
        dispatch(pageIsBackdropOpen(false))
        setMessageAlert('error', err?.message)
      }
    }
  }, [router, payload?.id])

  const setMessageAlert = (type, message) => {
    dispatch(
      pageShowSnackbar({
        severity: type,
        message: message,
        vertical: 'top',
        horizontal: 'right',
      }),
    )
  }

  const inputHandler = (key, value) => {
    setPayload({ ...payload, [key]: value })
  }

  const imageValidator = (event, key) => {
    return new Promise((resolve, reject) => {
      if (!event) return false
      const file = event.target.files[0]
      const fileType = file.type
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const input = document.querySelectorAll(`[name="${key}"]`)
      if (!file) {
        reject(new Error('File belum di pilih'))
      }

      if (validImageTypes.indexOf(fileType) === -1) {
        reject(new Error('File hanya bisa gambar'))
      }

      if (input[0].value !== '' && uploadProcess) {
        reject(new Error(`Mohon tunggu, file banner ${key} sedang diunggah`))
      }

      resolve(true)
    })
  }

  const fileHandler = async (file, key) => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const formData = new FormData()
      await imageValidator(file, key)
      setUploadProcess(true)
      const files = file?.target?.files[0]
      formData.append('file', files, files?.name)
      const uploader = await uploadFile({ token, formData })

      setImages({
        ...images,
        [key]: uploader?.formats?.thumbnaill || uploader?.url,
      })

      setUploadProcess(false)
      inputHandler(`image_banner_${key}`, uploader?.id)
      const input = document.querySelectorAll(`[name="${key}"]`)
      input[0].value = ''
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      dispatch(pageIsBackdropOpen(false))
      setMessageAlert('error', error?.message)
    }
  }

  const submitHandler = async (status) => {
    try {
      dispatch(pageIsBackdropOpen(true))
      const params = objectToSnakeCase(payload)
      delete params.voucher_code

      if (
        params?.deeplink_type_ios === '' ||
        params?.deeplink_type_ios === 'ANDROID'
      ) {
        delete payload?.deeplinkUrlIos
      }

      if (
        params?.deeplink_type_android === '' ||
        params?.deeplink_type_android === 'IOS'
      ) {
        delete payload?.deeplinkUrlAndroid
      }

      if (params) {
        params.status = status
        params.deeplink_url_ios = payload?.deeplinkUrlIos || ''
        params.deeplink_url_android = payload?.deeplinkUrlAndroid || ''
        params.deeplink_type_ios = payload?.deeplinkTypeIos && 'DEEPLINK'
        params.deeplink_type_android =
          payload?.deeplinkTypeAndroid && 'DEEPLINK'
      }

      if (!payload?.id) {
        await savePromotion({ token, params })
        router.push('/promotion')
        status === 'DRAFT' &&
          setMessageAlert('success', 'Promotion Saved as Draft!')

        status === 'RELEASE' &&
          setMessageAlert('success', 'Promotion Released!')
      } else {
        delete params?.release_date
        delete params?.deactive_date

        console.log(params)

        await updatePromotion({ params, token, id: payload?.id })
        router.push('/promotion')

        status === 'RELEASE' &&
          setMessageAlert('success', 'Promotion Released!')

        status === 'DEACTIVATE' &&
          setMessageAlert('success', 'Promotion Deactivated!')
      }
      dispatch(pageIsBackdropOpen(false))
    } catch (error) {
      dispatch(pageIsBackdropOpen(false))
      setMessageAlert('error', error?.message)
    }
  }

  const removeImages = (name) => {
    setImages({
      ...images,
      [name]: '',
    })
  }

  const triggerTab = (param) => {
    setChangeTab(param)
  }

  useEffect(
    () => () => {
      setPayload(null)
      setUseHospital(false)
      setUploadProcess(false)
      setChangeTab(false)
      setImages({
        thumbnail: '',
        detail: '',
      })
    },
    [],
  )

  return {
    images,
    payload,
    changeTab,
    setPayload,
    fileHandler,
    useHospital,
    triggerTab,
    inputHandler,
    removeImages,
    submitHandler,
    isModalDeactive,
    setIsModalDeactive,
  }
}

export default useForm
