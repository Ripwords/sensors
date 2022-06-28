<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Quaternion from 'Quaternion'
import { store } from './store'
import { useIntervalFn, useTimeout } from '@vueuse/core'
import { export2json } from './functions/export2json'
import Orient from './components/Orient.vue';

const s = store()
const showExport = ref(false)
const pollRate = ref(50) //ms
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
const time = ref(10) //seconds

const requestMotion = () => {
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
}

const requestOrientation = () => {
  if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    (DeviceOrientationEvent as any).requestPermission()
      .then((permissionState: any) => {
        if (permissionState === 'granted') {
          let phone: any = document.querySelector(".phone");
          let mat: any = document.querySelector("#mat");
          let dom: any = {}
          dom.w = document.querySelector("#w");
          dom.x = document.querySelector("#x");
          dom.y = document.querySelector("#y");
          dom.z = document.querySelector("#z");
          window.addEventListener('deviceorientation', (ev: any) => {
            let q: any = Quaternion.fromEuler((ev.alpha) * rad, (ev.beta) * rad, ev.gamma * rad, 'ZXY');
            Object.keys(q).map((k) => {
              dom[k].innerHTML = q[k];
            });
            let matData = q.conjugate().toMatrix();
            matData.forEach((val: any, idx: any) => {
              const row = mat.children[Math.floor(idx / 3)];
              const col = row.children[idx % 3];
              col.innerHTML = val.toFixed(3);
            });
            phone.style.transform = "matrix3d(" + q.conjugate().toMatrix4() + ")";
            ev.alpha && (a.value = ev.alpha.toFixed(2))
            ev.beta && (b.value = ev.beta.toFixed(2))
            ev.gamma && (g.value = ev.gamma.toFixed(2))
          })
        }
      })
      .catch(console.error);
  } else {
    let phone: any = document.querySelector(".phone");
    let mat: any = document.querySelector("#mat");
    let dom: any = {}
    dom.w = document.querySelector("#w");
    dom.x = document.querySelector("#x");
    dom.y = document.querySelector("#y");
    dom.z = document.querySelector("#z");
    window.addEventListener('deviceorientation', (ev: any) => {
      let q: any = Quaternion.fromEuler((ev.alpha) * rad, (ev.beta) * rad, ev.gamma * rad, 'ZXY');
      Object.keys(q).map((k) => {
        dom[k].innerHTML = q[k];
      });
      let matData = q.conjugate().toMatrix();
      matData.forEach((val: any, idx: any) => {
        const row = mat.children[Math.floor(idx / 3)];
        const col = row.children[idx % 3];
        col.innerHTML = val.toFixed(3);
      });
      phone.style.transform = "matrix3d(" + q.conjugate().toMatrix4() + ")";
      ev.alpha && (a.value = ev.alpha.toFixed(2))
      ev.beta && (b.value = ev.beta.toFixed(2))
      ev.gamma && (g.value = ev.gamma.toFixed(2))
    })
  }
}

const request = () => {
  requestMotion()
  requestOrientation()
}

const startLog = () => {
  const t = time.value
  const { ready, start } = useTimeout(t * 1000, { controls: true })
  start()
  const { pause } = useIntervalFn(() => {

    if (!ready.value) {
      time.value -= (pollRate.value / 1000)
      s.data.motion.aRot.push(alphaRotate.value)
      s.data.motion.bRot.push(betaRotate.value)
      s.data.motion.gRot.push(gammaRotate.value)
      s.data.motion.x_grav.push(x_grav.value)
      s.data.motion.y_grav.push(y_grav.value)
      s.data.motion.z_grav.push(z_grav.value)
      s.data.motion.x.push(x.value)
      s.data.motion.y.push(y.value)
      s.data.motion.z.push(z.value)
      s.data.orientation.alpha.push(a.value)
      s.data.orientation.beta.push(b.value)
      s.data.orientation.gamma.push(g.value)
    } else {
      pause()
      showExport.value = true
      time.value = 10
      return
    }
  }, pollRate.value)
}


let rad = Math.PI / 180;

onMounted(() => {

})
</script>

<template>
  <button @click="request">Request</button>
  <div class="grid">
    <div>
      <div>
        <p>&alpha;: {{ a }}</p>
        <p>&beta;: {{ b }}</p>
        <p>&gamma;: {{ g }}</p>
      </div>
      <br>
      <div>
        <p>x&kappa;: {{ x_grav }}</p>
        <p>y&kappa;: {{ y_grav }}</p>
        <p>z&kappa;: {{ z_grav }}</p>
      </div>
    </div>
    <div>
      <div>
        <p>x: {{ x }}</p>
        <p>y: {{ y }}</p>
        <p>z: {{ z }}</p>
      </div>
      <br>
      <div>
        <p>&alpha;&theta;: {{ alphaRotate }}</p>
        <p>&beta;&theta;: {{ betaRotate }}</p>
        <p>&gamma;&theta;: {{ gammaRotate }}</p>
      </div>
    </div>
  </div>
  <br>
  <br>
  <!-- Input amount of time to log data -->
  <div>
    <p>Data Log Period:</p>
    <input type="number" v-model="time" />s
    <button @click="startLog">Start</button>
  </div>
  <!-- Polling Rate of data -->
  <div>
    <p>Polling Rate:</p>
    <input type="number" v-model="pollRate" />ms
  </div>
  <!-- Export data -->
  <div v-if="showExport">
    <button v-if="showExport" @click="export2json(s.data)">Export</button>
  </div>
  <br>
  <br>
  <Orient />
</template>

<style>
/* CSS 2 Column grid layout */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>