export const requestDeviceOrientation = () => {
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
  (DeviceOrientationEvent as any).requestPermission()
  .then((permissionState: any) => {
    if (permissionState === 'granted') {
      console.log("DeviceOrientationEvent permission granted")
      return true
    }
  })
  .catch(console.error);
  } else {
    return false
  }
  return false
}