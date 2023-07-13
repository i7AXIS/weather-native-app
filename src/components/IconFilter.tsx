
import { FC } from 'react'
import {
  View,
} from 'react-native'

import {
  CloudySVG,
  RainSVG,
  ClearSVG,
  ClearNightSVG,
  PartlyCloudyNightSVG,
  PartlyCloudySVG,
  SnowSVG,
  OvercastClouds,
  LightRain,
  LightRainNight,
  ThunderSVG,
  FogSVG,
} from './Sprites'


import { IconFilterProps } from '../../types/props'

export const IconFilter: FC<IconFilterProps> = ({ iconSize, weatherId, fill }) => {

  function showIcon() {
    if (weatherId >= 200 && weatherId <= 232) {
      return <ThunderSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId >= 300 && weatherId <= 321) {
      return <RainSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId >= 500 && weatherId <= 504) {
      return <LightRain width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId >= 520 && weatherId <= 531) {
      return <RainSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId === 511 || weatherId >= 600 && weatherId <= 622) {
      return <SnowSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId >= 701 && weatherId <= 781) {
      return <FogSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId === 800) {
      return <ClearSVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId === 801) {
      return <PartlyCloudySVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId === 802) {
      return <CloudySVG width={iconSize} height={iconSize} fill={fill} />
    }
    if (weatherId === 803 || weatherId === 804) {
      return <OvercastClouds width={iconSize} height={iconSize} fill={fill} />
    }
    return <CloudySVG width={iconSize} height={iconSize} fill={fill} />
  }

  return (
    <View>
      {showIcon()}
    </View>
  )
}