import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { icons } from "../../constants";
import Patient1 from "../../assets/icons/patient.svg";
import PhoneIcon from "../../assets/icons/phoneIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../../assets/icons/avatar.svg";
import * as ImagePicker from 'expo-image-picker';  // Use Expo's ImagePicker

const Profile = () => {
  // Change the state type to string | null
  const [imageUri, setImageUri] = useState<string | null>(null);

  const details = [
    {
      name: "Somesh Mishra",
      bloodGroup: "A+",
      age: 40,
      gender: "Male",
      insuranceId: "INS123XXXXX",
      phone: "789-456-XXX",
      address: "51, South Block, Noida",
    },
  ];

  // Camera launch using Expo's ImagePicker
  const handleCameraLaunch = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Ensure result is not canceled and that assets exist
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);  // Set URI as string
    }
  };

  return (
    <SafeAreaView className="bg-gray h-screen">
      <GestureHandlerRootView>
        <ScrollView>
          <View className="justify-between items-center h-screen p-7">
            <View className="flex flex-col justify-between h-[55vh] w-full">
              <View className="flex flex-row justify-between w-full p-4 items-center">
                <View>
                  <Patient1 />
                </View>
                <View>
                  <Text className="font-satbold text-2xl">Emergency contact</Text>
                  <View className="flex flex-row">
                    <PhoneIcon width={25} height={25} />
                    <Text className="font-satbold text-2xl">123-456-XXX</Text>
                  </View>
                </View>
                <View>
                  <Image
                    source={icons.menu}
                    tintColor="#000000"
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </View>
              </View>
              <View className="flex flex-col items-center space-y-4">
                <View>
                  <Text className="font-satbold text-4xl">Patient Details</Text>
                </View>
                <View className="bg-white shadow-xl shadow-black space-x-2 rounded-xl flex flex-row justify-between w-full p-4">
                <View className="relative">
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        className="w-20 h-20 rounded-full"
                      />
                    ) : (
                      <Avatar />
                    )}
                    {/* Camera Button */}
                    <TouchableOpacity 
                      onPress={handleCameraLaunch}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full items-center justify-center"
                    >
                      <Image 
                        source={require('../../assets/icons/camera.png')} // Ensure you have a camera icon in assets
                        className="w-4 h-4"
                        tintColor="white"
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="">
                    {details.map((items, index) => (
                      <View key={index}>
                        <Text className="font-satbold text-3xl">
                          {items.name}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">Blood Group: </Text>
                          {items.bloodGroup}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">Age: </Text>
                          {items.age}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">Gender: </Text>
                          {items.gender}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">InsuranceID: </Text>
                          {items.insuranceId}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">Phone: </Text>
                          {items.phone}
                        </Text>
                        <Text className="font-satbold text-xl">
                          <Text className="font-satlight">Address: </Text>
                          {items.address}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default Profile;
