<script lang="ts" setup>
  import { ref } from "vue"
  const vid = ref<any>()
  const startCam = async () => {
    let cam_stream = await navigator.mediaDevices.getUserMedia({ video: true })
    vid.value.src = cam_stream
  }
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