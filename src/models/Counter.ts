// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import { cat } from '~/services'

export default defineStore('Counter', {
  state: () => ({
    count: 0,
    url: '',
  }),
  getters: {},
  actions: {
    add() {
      this.count++
    },
    minus() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    async getCat() {
      const res = await cat.getCat()

      this.url = res.url
    },
  },
})
