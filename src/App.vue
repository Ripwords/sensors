<script lang="ts" setup>
import { ref } from 'vue'

const a = ref()
const b = ref()
const g = ref()
const x_grav = ref()
const y_grav = ref()
const z_grav = ref()
const x = ref()
const y = ref()
const z = ref()
const alphaRotate = ref()
const betaRotate = ref()
const gammaRotate = ref()

function requestMotion() {
  // feature detect
  if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
    (DeviceMotionEvent as any).requestPermission()
      .then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', (e: any) => {
            x_grav.value = e.accelerationIncludingGravity.x.toFixed(2)
            y_grav.value = e.accelerationIncludingGravity.y.toFixed(2)
            z_grav.value = e.accelerationIncludingGravity.z.toFixed(2)
            x.value = e.acceleration.x.toFixed(2)
            y.value = e.acceleration.y.toFixed(2)
            z.value = e.acceleration.z.toFixed(2)
            alphaRotate.value = e.rotationRate.alpha.toFixed(2)
            betaRotate.value = e.rotationRate.beta.toFixed(2)
            gammaRotate.value = e.rotationRate.gamma.toFixed(2)
          })
        }
      })
      .catch(console.error)
  } else {
    // handle regular non iOS 13+ devices
  }
}

function requestOrientation() {
  // feature detect
  if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    (DeviceOrientationEvent as any).requestPermission()
      .then((permissionState: any) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', (e: any) => {
            e.alpha && (a.value = e.alpha.toFixed(2))
            e.beta && (b.value = e.beta.toFixed(2))
            e.gamma && (g.value = e.gamma.toFixed(2))
          })
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
    window.addEventListener('deviceorientation', (e: any) => {
      e.alpha && (a.value = e.alpha.toFixed(2))
      e.beta && (b.value = e.beta.toFixed(2))
      e.gamma && (g.value = e.gamma.toFixed(2))
    })
  }
}

</script>

<template>
  <button @click="requestOrientation">Request</button>
  <div>
    <p>alpha: {{ a }}</p>
    <p>beta: {{ b }}</p>
    <p>gamma: {{ g }}</p>
  </div>
  <button @click="requestMotion">Request</button>
  <div>
    <p>x_grav: {{ x_grav }}</p>
    <p>y_grav: {{ y_grav }}</p>
    <p>z_grav: {{ z_grav }}</p>
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
    <p>z: {{ z }}</p>
    <p>alphaRotate: {{ alphaRotate }}</p>
    <p>betaRotate: {{ betaRotate }}</p>
    <p>gammaRotate: {{ gammaRotate }}</p>
  </div>
</template>