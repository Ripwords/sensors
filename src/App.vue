<script lang="ts" setup>
import { requestDeviceOrientation } from './functions/DeviceOrientation'
import { useDeviceOrientation } from '@vueuse/core'
import { ref } from 'vue'

const a = ref()
const b = ref()
const g = ref()
const msg = ref("")

const request = () => {
  if (requestDeviceOrientation()) {
    const { alpha, beta, gamma } = useDeviceOrientation()
    a.value = alpha
    b.value = beta
    g.value = gamma
    msg.value = "Device orientation requested"
  } else {
    msg.value = "Device orientation not supported"
  }
}
</script>

<template>
  <button @click="request">Request</button>
  <div>
    <p>alpha: {{ a }}</p>
    <p>beta: {{ b }}</p>
    <p>gamma: {{ g }}</p>
  </div>
  <p>{{ msg }}</p>
</template>