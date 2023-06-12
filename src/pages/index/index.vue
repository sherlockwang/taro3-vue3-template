<template>
  <view class="index">
    <view>
      <img :src="counter.url" />
    </view>
    {{ msg }}
    <nut-divider>{{ counter.count }}</nut-divider>
    <view class="btn">
      <nut-row type="flex" justify="center">
        <nut-col :span="6">
          <view class="flex-content"><nut-button type="primary" @click="onAdd">+</nut-button></view>
        </nut-col>
        <nut-col :span="6">
          <view class="flex-content flex-content-light"
            ><nut-button type="primary" @click="onMinus">-</nut-button></view
          >
        </nut-col>
        <nut-col :span="6">
          <view class="flex-content"
            ><nut-button type="primary" @click="onReset">Reset</nut-button></view
          >
        </nut-col>
      </nut-row>
    </view>
    <Demo :value="counter.count" :on-click="onReset" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { counter as useCounter } from '~/models'
import Demo from '~/components/Demo.vue'

const msg = '欢迎使用 NutUI4.0 开发小程序'
const counter = useCounter()

onMounted(() => {
  counter.getCat()
})

const onAdd = () => {
  counter.count++
}

const onMinus = () => {
  counter.count--
}

const onReset = () => {
  counter.count = 0
  counter.getCat()
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
