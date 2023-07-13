import React, { useEffect, useState } from 'react'

import {
  PermissionsAndroid,
  Text,
} from 'react-native'

import Home from './src/screens/Home'

const App = () => {

  const [err, setErr] = useState(false)

  const accessLocation = async() => {
    try {
      const requestLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
        {
          title: 'Location Access',
          message: 'Needs access to location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
        if (requestLocation === PermissionsAndroid.RESULTS.GRANTED) {
          setErr(false)
          return console.log('OK')
        } else {
          setErr(true)
          return console.log('error')
        }
    } catch (error) {
      setErr(true)
      console.log(error)
    }
  }

  useEffect(() => {
    accessLocation()
  }, [])

  return (
    <>
      {err ? <Text>Let me geolocation</Text> :  <Home />}
    </>
  )
}

export default App
