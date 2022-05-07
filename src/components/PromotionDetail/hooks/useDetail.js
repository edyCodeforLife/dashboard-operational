import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { batch, useDispatch } from 'react-redux'
import promotionDetail from '../../../services/marketing/promotionDetail'
import useShallowEqualSelector from '../../../hooks/useShallowEqualSelector'
import {
  pageIsBackdropOpen,
  pageShowSnackbar,
} from '../../../redux/actions/page'

const useDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [payload, setPayload] = useState(null)
  const [images, setImages] = useState({
    thumbnail: '',
    detail: '',
  })

  const { token } = useShallowEqualSelector((state) => state.user)

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
          rankWeight: detail?.weight,
          merchantName: detail?.merchant_name,
          description: detail?.description,
          merchantType: detail?.merchant_type,
          voucherCode: detail?.voucher_code,
          promotionType: detail?.promotion_type,
          releaseDate: detail?.released_at
            ? moment(detail?.released_at).format('DD/MM/YYYY')
            : '-',
          deeplinkTypeAndroid: detail?.deeplink_type_android,
          deeplinkTypeIos: detail?.deeplink_type_ios,
          deeplinkUrlAndroid: detail?.deeplink_url_android,
          deeplinkUrlIos: detail?.deeplink_url_ios,
          deeplinkWeb: detail?.deeplink_web,
          deactiveDate:
            detail?.deactivated_at &&
            moment(detail?.deactivated_at).format('DD/MM/YYYY'),
        })

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
        batch(() => {
          dispatch(pageIsBackdropOpen(false))
          dispatch(
            pageShowSnackbar({
              severity: 'error',
              message: err?.message,
              vertical: 'top',
              horizontal: 'right',
            }),
          )
        })
      }
    }
  }, [router])

  useEffect(
    () => () => {
      setPayload(null)
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
  }
}

export default useDetail
