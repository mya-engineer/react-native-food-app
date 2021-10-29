import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { categories } from '../assets/data/categoriesData'
import { popular } from '../assets/data/popularData'
import { colors } from '../assets/colors/colors'
import { fonts } from '../assets/fonts/fonts'

export const Home = ({ navigation }) => {
  let [fontsLoaded] = fonts()

  const [selected, setSelected] = useState(categories)
  const [popularChoosen, setPopularChoosen] = useState(
    popular.find(
      item => item.category === selected.find(selItem => selItem.selected).id
    ).data
  )

  useEffect(() => {
    setPopularChoosen(
      popular.find(
        item => item.category === selected.find(selItem => selItem.selected).id
      ).data
    )
  }, [selected])

  const categoryPressHandler = item => {
    if (item.id !== selected.find(selItem => selItem.selected).id) {
      setSelected(prev =>
        prev.map(obj => {
          return { ...obj, selected: obj.id === item.id ? true : false }
        })
      )
    }
  }

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.categoryItemWrapper,
          {
            backgroundColor: item.selected ? colors.primary : colors.white,
            marginLeft: item.id === '1' ? 20 : 0,
          },
        ]}
        onPress={() => categoryPressHandler(item)}>
        <Image source={item.image} style={styles.categoryItemImage} />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
        <View
          style={[
            styles.categorySelectWrapper,
            {
              backgroundColor: item.selected ? colors.white : colors.secondary,
            },
          ]}>
          <Ionicons
            name='ios-chevron-forward-outline'
            size={16}
            color={item.selected ? colors.black : colors.white}
            style={styles.categorySelectIcon}
          />
        </View>
      </TouchableOpacity>
    )
  }

  if (!fontsLoaded) {
    return (
      <View>
        <Text>LOADING</Text>
        <Text>LOADING</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <SafeAreaView>
            <View style={styles.headerWrapper}>
              <Image
                style={styles.profileImage}
                source={require('../assets/images/profile.png')}
              />
              <Ionicons
                name='ios-menu-outline'
                size={24}
                color={colors.textDark}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          </SafeAreaView>

          {/* Titles */}
          <View style={styles.titlesWrapper}>
            <Text style={styles.titlesSubtitle}>Food</Text>
            <Text style={styles.titlesTitle}>Delivery</Text>
          </View>

          {/* Search */}
          <View style={styles.searchWrapper}>
            <Ionicons name='ios-search' size={24} color='black' />
            <View style={styles.search}>
              <Text style={styles.searchText}>Search</Text>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.categoriesWrapper}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <View style={styles.categoriesListWrapper}>
              <FlatList
                data={selected}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          {/* Popular */}
          <View
            style={{
              shadowColor: colors.black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.08,
              shadowRadius: 10,
              elevation: 2,
            }}>
            <View style={styles.popularWrapper}>
              <Text style={styles.popularTitle}>Popular</Text>
              {popularChoosen.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('Details', { item: item })
                  }>
                  <View
                    style={[
                      styles.popularCardWrapper,
                      {
                        marginTop: item.id === '1' ? 10 : 20,
                        marginBottom: categories[index + 1] ? 0 : 10,
                      },
                    ]}>
                    <View>
                      <View>
                        <View style={styles.popularTopWrapper}>
                          <MaterialCommunityIcons
                            name='crown'
                            size={12}
                            color={colors.primary}
                          />
                          <Text style={styles.popularTopText}>
                            Top of the week
                          </Text>
                        </View>
                        <View style={styles.popularTitlesWrapper}>
                          <Text style={styles.popularTitlesTitle}>
                            {item.title}
                          </Text>
                          <Text style={styles.popularTitlesWeight}>
                            Weight {item.weight}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.popularCardBottom}>
                        <View style={styles.addPizzaButton}>
                          <MaterialCommunityIcons
                            name='plus'
                            size={14}
                            color={colors.textDark}
                          />
                        </View>
                        <View style={styles.ratingWrapper}>
                          <MaterialCommunityIcons
                            name='star'
                            size={12}
                            color={colors.textDark}
                          />
                          <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.popularCardRight}>
                      <Image
                        source={item.image}
                        style={styles.popularCardImage}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.textDark,
  },
  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textDark,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-SemiBold',
    color: colors.textLight,
    marginBottom: 5,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {},
  categoryItemWrapper: {
    backgroundColor: 'yellow',
    marginBottom: 20,
    marginTop: 15,
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 20,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
  },
})
