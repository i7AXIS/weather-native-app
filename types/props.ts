export type ForecastProps = {
  coords: {
    lat: number;
    lon: number;
  },
  isNight: boolean
}

export type IconFilterProps = {
  weatherId: number,
  iconSize: number,
  fill: string
}

export type SpritesProps = {
  width: number,
  height: number,
  fill: string
}