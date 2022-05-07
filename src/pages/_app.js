import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import Router from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { useDispatch, useStore } from 'react-redux'
import { wrapper } from '../redux/store'
import '../styles/globals.css'
import Layout from '../layouts/default'
import useShallowEqualSelector from '../hooks/useShallowEqualSelector'
import { parseJwt } from '../helpers/strings'
import { userSetHospitals, userSetRole } from '../redux/actions/user'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
})

function AlteaApp({ Component, pageProps }) {
  const { token } = useShallowEqualSelector((state) => state.user)
  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    if (token) {
      const resultJWT = parseJwt(token)

      if (resultJWT?.role) {
        dispatch(userSetRole(resultJWT.role))
      }

      if (resultJWT?.hospitals) {
        dispatch(userSetHospitals(resultJWT.hospitals))
      }
    }
  }, [token])

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })
    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
    })
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  )
}

AlteaApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
}

export default wrapper.withRedux(AlteaApp)
