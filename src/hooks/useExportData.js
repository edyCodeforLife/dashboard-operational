import { useDispatch } from 'react-redux'
const shortid = require('shortid-36')
const { convertArrayToCSV } = require('convert-array-to-csv')
import { pageShowSnackbar } from '../redux/actions/page'

const useExportData = () => {
  const dispatch = useDispatch()

  const exportCSV = ({ data = [], filename = '' }) => {
    if (data.length === 0) {
      dispatch(
        pageShowSnackbar({
          severity: 'error',
          message: 'Invalid Data Export!',
          vertical: 'top',
          horizontal: 'right',
        }),
      )

      return
    }

    const fileName = `${filename}-${shortid.generate()}.csv`
    const csvData = convertArrayToCSV(data)
    const encodedUri = encodeURI(csvData)
    const link = document.createElement('a')
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodedUri}`)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)

    link.click()

    dispatch(
      pageShowSnackbar({
        severity: 'success',
        message: 'Export data success!',
        vertical: 'top',
        horizontal: 'right',
      }),
    )
  }

  return {
    exportCSV,
  }
}

export default useExportData
