import { get, post } from '~/utils/api'

const getCat = async () => {
  const output = { breeds: '', url: '' }

  try {
    const res = await get('https://api.thecatapi.com/v1/images/search', {
      limit: 1,
    })

    output.url = res.data[0].url
  } catch (error) {
    console.error(error)
  }

  return output
}

export default { getCat }
