export const getFileNameByFilters = (filters = []) =>
  Object.keys(filters)
    .map((key) => {
      if (
        ![
          'schedule_date_start',
          'schedule_date_end',
          'date_start',
          'date_end',
          'canceled_date_start',
          'canceled_date_end',
          'keyword',
        ].includes(key)
      ) {
        return null
      }

      const filter = filters[key]

      if (!filter) {
        return null
      }

      return `${key}-${filter}`
    })
    .filter((val) => val !== null)
    .join('_')

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export const getHighlightedText = (text, highlight = '') => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <span>
      {' '}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { fontWeight: 'bold', color: 'green' }
              : {}
          }
        >
          {part}
        </span>
      ))}{' '}
    </span>
  )
}
