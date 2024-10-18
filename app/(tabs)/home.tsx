import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Alert from "../../assets/icons/alert.svg";
import Avatar from "../../assets/icons/avatar.svg";
const Home = () => {

  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView className="bg-gray h-screen">
      {/* You must start your coding after this */}
      <GestureHandlerRootView>
        <ScrollView>
          <View className="flex flex-col justify-top items-center h-screen p-10">
            <View className='rounded-xl shadow-lg bg-white flex flex-row justify-between items-center w-full h-[12vh] px-4 py-1'>
              <View className='h-full flex flex-col'>
              <Text className='font-satlight text-xl'>Welcome Back,</Text>
              <Text className='font-satbold text-3xl'>Linda Myers</Text>
              </View>
              <View>
              <Avatar width={100} height={100}/>
              </View>
              
              
            </View>


            <View className="flex flex-col justify-between mt-[8vh] items-center w-full min-h-[50vh]">
              <View className='flex flex-col justify-center items-center'>
                <Text className="text-4xl text-black font-satbold">
                  Having an emergency?
                </Text>
                <Text className="text-xl text-black font-satlight">Press the button below</Text>
              </View>
              <View className=''>
              <TouchableOpacity onPress={handleToggle}>
              <Alert />
              </TouchableOpacity>
                
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar
          barStyle="dark-content" 
          backgroundColor="#FFFFFF" 
          translucent={false} 
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Home;
