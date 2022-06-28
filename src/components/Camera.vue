<script lang="ts" setup>
  import { ref, onMounted } from "vue"
  const vid = ref<any>()
  let startCam = () => {}
  onMounted(() => {
    startCam = async () => {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      vid.value.srcObject = stream
    }
  })
</script>

<template>
  <button @click="startCam">
    Start Camera
  </button>
  <video ref="vid" width="320" height="240" autoplay></video>
  <button>
    Stop Camera
  </button>
</template>