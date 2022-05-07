import useOption from './useOption'

const useValidator = () => {
  const { merchants } = useOption()

  const validateDeeplink = (payload) => {
    const inputAndroid = document.querySelectorAll('[name="android"]')[0]
    const inputIos = document.querySelectorAll('[name="ios"]')[0]

    const androidType = payload?.deeplinkTypeAndroid
    const iosType = payload?.deeplinkTypeIos

    if (androidType && androidType === 'ANDROID' && inputAndroid) {
      inputAndroid?.removeAttribute('disabled')
    }

    if (androidType && androidType !== 'ANDROID' && inputAndroid) {
      inputAndroid.value = ''
      inputAndroid?.setAttribute('disabled', true)
    }

    // ios condition
    if (iosType && iosType === 'IOS' && inputIos) {
      inputIos?.removeAttribute('disabled')
    }

    if (iosType && iosType !== 'IOS' && inputIos) {
      inputIos.value = ''
      inputIos?.setAttribute('disabled', true)
    }
  }

  const validateMerchantName = (payload, setUseHospital) => {
    setUseHospital(false)
    const type = payload?.merchantType
    const inputName = document.querySelectorAll('[name="merchantName"]')[0]
    const selected = merchants.find((item) => item.value === type)

    if (inputName) inputName.removeAttribute('readOnly')

    if (selected?.label?.toLowerCase() === 'alteacare') {
      inputName?.setAttribute('readOnly', true)
    }

    if (selected?.label?.toLowerCase() === 'hospital') {
      setUseHospital(true)
    }
  }

  return { validateDeeplink, validateMerchantName }
}

export default useValidator
