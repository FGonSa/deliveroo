import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow'
import createClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  //En cuanto cargue la navegación, oculto el Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  //En cuanto se cargue el componente, hago fetch del Backend
  useEffect(() => {
    try{
      createClient.fetch(
        `
        *[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
    }catch(error){
      console.log("Ha ocurrido un error")
    }
  },[])


  return (
    <SafeAreaView className="bg-white pt-5">
      
      {/* Header */ }
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image  source={{
          uri: 'https://links.papareact.com/wru'
        }}
        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
      

    <View className="flex-1">
      <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
      <Text className="font-bold text-xl">Current Location
        <ChevronDownIcon size={20} color="#00CCBB" />
      </Text>
    </View>

    <UserIcon size={35} color="#00CCBB" />
    </View>

    {/* Search Bar */ }
    <View className="flex-row items-center space-x-2 pb-2 mx-4">
      <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
        <MagnifyingGlassIcon  color="gray" size={20} />
        <TextInput 
        placeholder="Restaurants"
        keyboardType="default"
        />
      </View>

      <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Contenido Scroll */ }
      {/* //////////////// */ }
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ 
          paddingBottom: 100,
         }}
          >
          {/* Categorías */ }
          <Categories />

          {/* Destacado */ }

          {featuredCategories?.map(category=> (
            <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            />
          ))}
          
      </ScrollView>
  

  </SafeAreaView>
  );
};

export default HomeScreen;