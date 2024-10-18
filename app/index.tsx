import { Image, ScrollViewBase, ScrollViewComponent, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  SansitaSwashed_400Regular,
  SansitaSwashed_700Bold,
} from '@expo-google-fonts/sansita-swashed';
import { useFonts } from 'expo-font';
import { Redirect, router  } from 'expo-router';
import { Link, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import Ambulance from '../assets/icons/ambulance.svg'
SplashScreen.preventAutoHideAsync(); // to prevent hiding before all of the assests are loaded.

const index = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "SansitaSwashed-Black": require("../assets/fonts/SansitaSwashed-Black.ttf"),
    "SansitaSwashed-Bold": require("../assets/fonts/SansitaSwashed-Bold.ttf"),
    "SansitaSwashed-ExtraBold": require("../assets/fonts/SansitaSwashed-ExtraBold.ttf"),
    "SansitaSwashed-Light": require("../assets/fonts/SansitaSwashed-Light.ttf"),
    "SansitaSwashed-Medium": require("../assets/fonts/SansitaSwashed-Medium.ttf"),
    "SansitaSwashed-Regular": require("../assets/fonts/SansitaSwashed-Regular.ttf"),
    "SansitaSwashed-SemiBold": require("../assets/fonts/SansitaSwashed-SemiBold.ttf"),
    "Sansation-Regular": require("../assets/fonts/Sansation_Regular.ttf"),
    "Sansation-Bold": require("../assets/fonts/Sansation_Bold.ttf"),
    "Sansation-Light": require("../assets/fonts/Sansation_Light.ttf"),
  });

  //useEffect: allow us to perform some action while the page is loading
  useEffect(()=>{
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded,error])

  if(!fontsLoaded && !error) return null;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
      <ScrollView contentContainerStyle={{height:'100%',justifyContent:'center'
        }}>
        <View className='w-full justify-between items-center min-h-[80vh] p-10'>
          <View className='gap-10'>
            <View className='relative w-full gap-2 px-10'>
              <Text className='text-6xl text-white font-sanbold text-center'>emRoutes</Text>
              <Text className='text-xl text-white font-pmedium text-center'>An emergency Hotline App</Text>
            </View>
            <View className='justify-center items-center '>
              <Ambulance/>
            </View>
          </View>
          {/* <View className='w-full'><Text className='text-sm font-pregular mt-7 w-full text-gray-100 text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text></View> */}
          <CustomButton
          title="Get Started"
          handlePress={()=>router.push('/signin')}
          containerStyle='w-full mt-7' />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
      </GestureHandlerRootView>

    </SafeAreaView>
  )
}

export default index

// const styles = StyleSheet.create({
//     titleContainer:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//         gap:8,
//     }
// })
