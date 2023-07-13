import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'

import Geolocation from '@react-native-community/geolocation'

import { lightTheme, darkTheme } from '../res/colors'
import { fonts } from '../res/fonts'

import { WindSVG } from '../components/Sprites'
import { IconFilter } from '../components/IconFilter'

import { Forecast } from '../components/Forecast'

import { API_KEY } from "@env"

const Home = () => {

  const [coords, setCoords] = useState({ lat: 0, lon: 0 })
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [currentTemp, setCurrentTemp] = useState(0)
  const [currentWeather, setCurrentWeather] = useState('')
  const [windSpeed, setWindSpeed] = useState(0)
  const [weatherId, setWeatherId] = useState(0)
  const [isNight, setIsNight] = useState(false)
  const [loader, setLoader] = useState(true)

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(info => {
      setCoords({
        lat: info.coords.latitude,
        lon: info.coords.longitude
      })
    }
    )
  }

  const isDay = (iconId: string) => {
    const sign = iconId.charAt(iconId.length - 1)
    if (sign === 'n') {
      setIsNight(true)
    } else {
      setIsNight(false)
    }
  }

  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`

  const fetchWeather = async () => {
    await fetch(api).then(res => res.json()).then(data => {
      setCountry(data.sys.country)
      setCity(data.name)
      setCurrentTemp(Math.round(data.main.temp))
      setCurrentWeather(data.weather[0].main)
      setWindSpeed(Math.round(data.wind.speed))
      setWeatherId(data.weather[0].id)
      isDay(data.weather[0].icon)
      setLoader(false)
    })
  }

  useEffect(() => {
    getLocation()
    fetchWeather()
  }, [coords.lat, coords.lon])

  return (
    <View style={[styles.container, isNight ? styles.backgroundDark : styles.backgroundLight]}>
      {loader ? 
      <ActivityIndicator size={70} color={lightTheme.text} />
      : 
      <>
        <Text style={[styles.locationName, isNight ? styles.textLight : styles.textDark]}>{city}, {country}</Text>
        <View style={[styles.flexItem, styles.gap]}>
          <View style={styles.flexItem}>
            <IconFilter weatherId={weatherId} iconSize={80} fill={isNight ? darkTheme.text : lightTheme.text} />
            <Text style={[styles.temp, isNight ? styles.textLight :  styles.textDark]}>{currentTemp}°</Text>
          </View>
          <Text style={[styles.locationName, isNight ? styles.textLight : styles.textDark]}>{currentWeather}</Text>
          <View style={[styles.flexItem, styles.padding]}>
            <Text style={[styles.fontWeight, isNight ? styles.textLight : styles.textDark]}>Wind</Text>
            <View style={styles.flexItemRow}>
              <WindSVG width={60} height={60} fill={isNight ? darkTheme.text : lightTheme.text} />
              <Text style={[styles.fontWeight, isNight ? styles.textLight : styles.textDark]}>{windSpeed} m/s</Text>
            </View>
          </View>
        </View>
        <View>
          <Forecast coords={coords} isNight={isNight} />
        </View>
      </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundLight: {
    backgroundColor: lightTheme.background,
  },
  backgroundDark: {
    backgroundColor: darkTheme.background,
  },
  textDark: {
    color: lightTheme.text
  },
  textLight: {
    color: darkTheme.text
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    gap: 60,
  },
  locationName: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  temp: {
    fontSize: 92,
    fontFamily: fonts.bold,
    lineHeight: 130,
  },
  fontWeight: {
    fontSize: 18,
    fontFamily: fonts.bold,
  },
  flexItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexItem: {
    alignItems: 'center',
  },
  gap: {
    gap: 25,
  },
  padding: {
    paddingTop: 30,
  },
})

export default Home
