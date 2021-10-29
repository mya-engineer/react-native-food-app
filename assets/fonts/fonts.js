import { useFonts } from 'expo-font'

export const fonts = () =>
  useFonts({
    'Montserrat-Regular': require('./Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('./Montserrat-Bold.ttf'),
  })
