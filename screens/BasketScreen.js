import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {selectBasketItems} from '../features/basketSlice'
import {selectRestaurant} from '../features/restaurantSlice'
import {XCircleIcon} from 'react-native-heroicons/solid'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch()
    const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([])

    useEffect(() =>{
      const groupedItems = items.reduce((results,item) =>{
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {})

      setgroupedItemsInBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView>
      <View className="flex-1 bg-gray-100" >
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs" >
          <View>
            <Text className="text-lg font-bold text-center" >Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity 
          onPress={navigation.goBack}
          className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>
        </View>

        <View>
          <Image 
          source={{ 
            uri: "https://links.papareact.com/wru"
           }}
           className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 30-45 min</Text>
            <TouchableOpacity>
              <Text className="text-[#00CCBB]">Change</Text>
            </TouchableOpacity>
        </View>

        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen