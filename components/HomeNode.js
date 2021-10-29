import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Home } from './Home'
import { Favorite } from './Favorite'
import { colors } from '../assets/colors/colors'

export const HomeNode = ({ navigation }) => {
  const Drawer = createDrawerNavigator()

  return (
    <>
      <Drawer.Navigator
        drawerPosition={'right'}
        drawerStyle={{
          backgroundColor: colors.background,
          width: '60%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        drawerContentOptions={{
          activeTintColor: colors.primary,
        }}
        screenOptions={{}}>
        <Drawer.Screen
          name='Home'
          component={Home}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={
                  focused
                    ? 'arrow-right-drop-circle'
                    : 'arrow-right-drop-circle-outline'
                }
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen name='Favorite' component={Favorite} />
      </Drawer.Navigator>
    </>
  )
}
