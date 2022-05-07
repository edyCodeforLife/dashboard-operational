import React from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

export const Breadcrumb = () => {
  const router = useRouter()
  const pathnames = router.pathname.split('/').filter((x) => x)

  const breadcrumbNameMap = {
    '/login': 'Login',
    '/appointment/ongoing': 'Appointment Ongoing',
    '/appointment/canceled': 'Appointment Canceled',
    '/appointment/history': 'Appointment Completed',
    '/appointment/refunded': 'Appointment Refunded',
    '/appointment/[appointmentId]': 'Appointment Detail',
    '/meet-specialist': 'Set Meet Specialist',
    '/confirm-payment': 'Confirm Manual Transfer',
    '/user/list': 'User List',
    '/user/[userId]': 'User Detail',
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        if (!breadcrumbNameMap[to]) {
          return null
        }

        return last ? (
          <Typography color="textPrimary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link color="inherit" href={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
