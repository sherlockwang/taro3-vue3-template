import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'

const tmpIds = ['']

export default defineStore('Auth', {
  state: () => ({
    login: false,
    code: '',
    appId: '',
    openId: '',
    sessionKey: '',
    hasAccessToUserInfo: false,
    subscribed: false,
  }),
  actions: {
    async getLoginCode(options) {
      this.getParamsByScene(options)

      const res = await Taro.login()

      if (res.errMsg === 'login:ok') {
        this.checkSubscriptionStatus()

        this.code = res.code
        this.appId = Taro.getAccountInfoSync().miniProgram.appId

        const params = {
          appId: this.appId,
          code: this.code,
        }

        try {
          // custom user system logic
          // const authInfo = yield post('miniapp/users', params)
          // this.openId = authInfo.data.openId
          // this.sessionKey = authInfo.data.sessionKey
          // Taro.setStorage({ key: 'openId', data: this.openId })
          // Taro.setStorage({ key: 'sessionKey', data: this.sessionKey })
        } catch (error) {
          console.log(error)
        }

        // logged in
        this.login = true
      } else {
        this.login = false
      }
    },
    async checkSubscriptionStatus(cb: Function = () => {}) {
      await Taro.getSetting({
        withSubscriptions: true,
        success(res) {
          let itemSettingsKeys: String[] = []

          if (typeof res.subscriptionsSetting.itemSettings === 'object') {
            itemSettingsKeys = Object.keys(res.subscriptionsSetting.itemSettings)
          }

          if (res.authSetting['scope.userInfo']) {
            this.hasAccessToUserInfo = true
          }

          this.subscribed = tmpIds.every(item => itemSettingsKeys.includes(item))

          cb()
        },
      })
    },
    setUserInfo(res) {
      if (res.detail.errMsg === 'getUserInfo:ok') {
        this.hasAccessToUserInfo = true
      }

      if (this.hasAccessToUserInfo) {
        // set custom user system info
      }
    },
    async getSubscribeMessageAuth(cb: Function) {
      await Taro.requestSubscribeMessage({
        tmplIds: tmpIds,
        success(res) {
          // 成功
          console.log(res)

          if (res[tmpIds[0]] === 'accept') {
            this.checkSubscriptionStatus(cb)
          }
        },
      })
    },
    getParamsByScene(options) {
      // 订阅消息进入
      if (`${options.scene}` === '1014') {
      }
    },
  },
})
