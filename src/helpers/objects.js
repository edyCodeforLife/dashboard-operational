export const mapResponseExternalHistory = (response) => {
  let result = response

  if (response.message) {
    const splitData = response.message.split(' | ')
    result = {
      message: splitData[0],
    }
    if (splitData[1]) {
      result.response = JSON.parse(
        Buffer.from(splitData[1], 'base64').toString('ascii'),
      )
    }
  }

  return result
}
