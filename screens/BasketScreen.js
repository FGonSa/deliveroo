import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import {removeFromBasket, selectBasketItems, selectBasketTotal} from '../features/basketSlice'
import {selectRestaurant} from '../features/restaurantSlice'
import {XCircleIcon} from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch()
    const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([])
    const basketTotal = useSelector(selectBasketTotal)
    const deliveryFee = 3.99

    useEffect(() =>{
      const groupedItems = items.reduce((results,item) =>{
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {})

      setgroupedItemsInBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView className="bg-white">
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

        <View className="flex-row items-center space-x-3 bg-white my-4 py-3 px-5">
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

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items])=> (
            <View 
            className="flex-row items-center space-x-3 bg-white py-2 px-5"
            key={key}
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image 
              source={{ uri: urlFor(items[0]?.image).url() }}
              className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-500">
                <Currency quantity={items[0]?.price} currency="EUR" />
              </Text>

              <TouchableOpacity>
                <Text 
                onPress={() => dispatch(removeFromBasket({id: key}))}
                className="text-[#00BBCC] text-xs" >Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4" >
          <View className="flex-row justify-between" >
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="EUR" />
            </Text>
          </View>

          
          <View className="flex-row justify-between" >
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={deliveryFee} currency="EUR" />
            </Text>
            </View>

            <View className="flex-row justify-between" >
            <Text >Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + deliveryFee} currency="EUR" />
            </Text>
            </View>

            <TouchableOpacity 
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4">
              <Text className="text-center text-white text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          


        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen