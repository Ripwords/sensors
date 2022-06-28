<script lang="ts" setup>
  import { ref } from "vue"
  const vid = ref<any>()
  const startCam = async () => {
    let cam_stream = await navigator.mediaDevice.getUserMedia({ video: true })
    vid.srcObject = cam_stream
  }
</script>

<template>
  <button @click="">
    Start Camera
  </button>
  <video ref="vid" width="320" height="240" autoplay></video>
  <button>
    Stop Camera
  </button>
</template>