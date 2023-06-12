import Taro from '@tarojs/taro'

const tokenKey = 'access-token'
const serverUrl = ''
const baseUrl = ''

// 例外不用token的地址
const exceptionAddrArr = []

const createHeader = url => {
  const header = {
    'content-type': 'application/json',
  }

  if (exceptionAddrArr.indexOf(url) === -1) {
    // 排除请求的地址不需要token的地址
    const token = Taro.getStorageSync(tokenKey)
    header[tokenKey] = token
  }

  return header
}

const createPromise = ({ url = '', params = {}, method = '' } = {}) =>
  new Promise((resolve, reject) => {
    Taro.request({
      url: serverUrl + baseUrl + url,
      data: params,
      header: createHeader(url),
      method,
      success: res => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: res => {
        reject(res)
      },
    })
  })

const get = (url: string, params: object | undefined = {}) =>
  createPromise({ url, params, method: 'GET' })

const post = (url: string, params: object = {}) => createPromise({ url, params, method: 'POST' })

const put = (url: string, params: object = {}) => createPromise({ url, params, method: 'PUT' })

const del = (url: string, params: object = {}) => createPromise({ url, params, method: 'DELETE' })

const wait = (period = 500) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, period)
  })

export { get, post, put, del, wait }
