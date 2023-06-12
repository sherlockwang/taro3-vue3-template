<template>
  <view>
    <text class="title">{{ value }}</text>
    <view class="button" @tap="onClick">Click to rest</view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
})

const onClick = () => {
  props.onClick()
}
</script>

<style>
.title {
  font-size: 32px;
}
.button {
  border: 1px solid lightgray;
  padding: 5px 10px;
}
</style>
