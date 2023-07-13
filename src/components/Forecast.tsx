import React, {FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { lightTheme, darkTheme } from '../res/colors'
import { fonts } from '../res/fonts'
import { IconFilter } from './IconFilter'

import moment from 'moment'

import { API_KEY } from "@env"

import { ForecastProps } from '../../types/props'

export const Forecast: FC<ForecastProps> = ({ coords, isNight }) => {

  const [tempMax, setTempMax] = useState([])

  const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`

  const fetchWeather = async () => {
    await fetch(api).then(res => res.json()).then(data => {
      const dates = data.daily.slice(1,5).map((date: any) => date)
      setTempMax(dates)
    })
  }

  useEffect(() => {
    fetchWeather()
  }, [coords.lat, coords.lon])

  return (
    <View style={[styles.flexRow, styles.w100px]}>
        <View style={[styles.textView, styles.w100px]}>
          {tempMax.map((item: any) => 
          <View style={[styles.flexRow, styles.flexSpace]} key={item.dt}>
            <View style={[styles.flexRow, styles.gap4px, styles.widthDate]}>
              <Text style={[[styles.textView, isNight ? styles.textLight : styles.textDark]]}>
                {moment.unix(item.dt).format('ddd')},
              </Text>
              <Text style={[styles.textView, isNight ? styles.textLight : styles.textDark]}>
                {moment.unix(item.dt).format('MMM')}
              </Text>
              <Text style={[styles.textView, isNight ? styles.textLight : styles.textDark]}>
                {moment.unix(item.dt).format('DD')}
              </Text>
            </View>
            <View>
              <IconFilter key={item.dt} weatherId={item.weather[0].id} iconSize={30} fill={isNight ? darkTheme.text : lightTheme.text} />
            </View>
            <View style={[styles.flexRow, styles.gap4px]}>
              <Text style={[styles.textView, isNight ? styles.textLight : styles.textDark]}>{Math.round(item.temp.max)}°</Text>
              <Text style={[styles.textView, isNight ? styles.textLight : styles.textDark]}>{Math.round(item.temp.min)}°</Text>
            </View>
          </View>
          )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textDark: {
    color: lightTheme.text
  },
  textLight: {
    color: darkTheme.text
  },
  flexSpace: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    fontFamily: fonts.bold,
    gap: 16,
    fontSize: 18,
  },
  gap: {
    gap: 40,
  },
  w100px: {
    width: '100%'
  },
  gap4px: {
    gap: 4,
  },
  widthDate: {
    flex: 0.33
  },
})
