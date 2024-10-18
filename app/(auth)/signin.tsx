import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import {images} from '../../constants'
import FormFeild from '../../components/FormFeild'
import CustomButton from '../../components/CustomButton'
import { Link, router, useNavigation } from 'expo-router'
// import { signIn } from '../../lib/appwrite'
const signin = () => {
 const [form,setForm] = useState({email:'',password:''});
 const [isSubmitting, setIsSubmitting] = useState(false);
 const navigation = useNavigation();
//  const handleSignin = () => {
//   console.log('Go to Home page');
//   navigation.navigate('home'); // Navigate to the Home screen
// };
//  const submit= async () =>{
//   if(!form.email||!form.password){
//     Alert.alert('Error','Please fill in all the feilds')
//   }
//   setIsSubmitting(true);
//   try {
//     await signIn(form.email,form.password)

//     router.replace('/home')

//   } catch (error) {
//     Alert.alert('Error',error.message)
//   }finally{
//     setIsSubmitting(false);
//   }

//  }


  return (
    <SafeAreaView className='bg-primary h-full'>
      <GestureHandlerRootView>
      <ScrollView contentContainerStyle={{height:'100%'
        }}>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Text className='text-6xl text-white font-sanbold text-center'>emRoutes</Text>
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to emRoutes</Text>

          <FormFeild
          title='Vehicle Number'
          value={form.email}
          handleChangeText={(e)=>setForm({...form,email:e})}
          otherStyles='mt-7'
          keyboardType='email-address' />

          <View className='flex justify-center items-center'>
            <CustomButton title='Get OTP' containerStyle='mt-7 w-1/3' handlePress={()=>router.push('/home')} ></CustomButton>
          </View>

          <FormFeild
          title='Enter OTP'
          value={form.password}
          handleChangeText={(e)=>setForm({...form,password:e})}
          otherStyles='mt-7' />
          <CustomButton title='Sign In' containerStyle='mt-7' handlePress={()=>router.push('/home')} ></CustomButton>
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg font-pregular text-gray-100'>
                Don't have account?
            </Text>
            <Link href='/signup' className='text-white font-psemibold text-lg'>SignUp</Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar
        barStyle="light-content" // For light text/icons
        backgroundColor="#D7423F" // Custom background color
        translucent={false} // Set to true if you want content to appear under the status bar
      />
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default signin
