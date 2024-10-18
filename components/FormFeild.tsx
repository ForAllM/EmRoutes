import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { icons } from '../constants';
const FormFeild = ({title,value,placeholder, handleChangeText, otherStyles,...props}) => {

    const [showPassword,setShowPassword]=useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-white font-pmedium'>{title}</Text>
      <View className='border-2 border-primary flex-row rounded-2xl w-full h-16 px-4 bg-white focus:border-primary items-center '>
            <TextInput className='flex-1 text-red-700 font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            keyboardType={title === 'Phone Number' ? 'phone-pad' : 'default'}
            secureTextEntry={title==='Enter OTP' && !showPassword} />

            {title==='Enter OTP' && (<TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
            </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormFeild
