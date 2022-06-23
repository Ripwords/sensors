export const requestDeviceOrientation = () => {
  if (typeof DeviceOrientationEvent !== 'undefined') {
  (DeviceOrientationEvent as any).requestPermission()
    .then((permissionState: any) => {
      if (permissionState === 'granted') {
        console.log("DeviceOrientationEvent permission granted")
        return true
      }
    })
    .catch(console.error);
  } else {
    console.log('o')
    return false
  }
  return false
}