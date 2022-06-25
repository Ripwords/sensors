import { defineStore } from 'pinia'

export const store = defineStore('store', {
  state: () => ({
    data: {
      motion: {
        x: [] as any,
        y: [] as any,
        z: [] as any,
        x_grav: [] as any,
        y_grav: [] as any,
        z_grav: [] as any,
        aRot: [] as any,
        bRot: [] as any,
        gRot: [] as any
      },
      orientation: {
        alpha: [] as any,
        beta: [] as any,
        gamma: [] as any
      }
    }
  })
})
