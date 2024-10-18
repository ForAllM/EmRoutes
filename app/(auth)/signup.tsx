import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollViewComponent,
  ViewComponent,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { images } from "../../constants";
import FormFeild from "@/components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import SelectButton from "@/components/SelectButton";

// import { useSignup } from "@/hooks/authHooks/useSignup";

const signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "",phone:"" });
  //   const { signUpUser, loading, error } = useSignup();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleSignup = async () => {
  //     console.log("Sign up...");
  //     const signupData = {
  //       name: "John Doe",
  //       email: "john@example.com",
  //       phoneNumber: "1234567890",
  //       password: "password123",
  //       role: "USER",
  //     };

  //     await signUpUser(signupData);
  //   };

  const options = ["Admin", "Guard"];

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <ScrollView>
          <View className="w-full min-h-[100vh] justify-center p-4 my-20">
            <Text className='text-6xl text-white font-sanbold text-center'>emRoutes</Text>
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Register to emRoutes
            </Text>

            <FormFeild
              title="Driver Name"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7"
            />
            <FormFeild
              title="Vehicle Number"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormFeild
              title="Phone Number"
              value={form.phone}
              handleChangeText={(e) => setForm({ ...form, phone: e })}
              otherStyles="mt-7"
              keyboardType="phone-pad"
            />
            <View className='flex justify-center items-center'>
            <CustomButton title='Get OTP' containerStyle='mt-7 w-1/3' handlePress={()=>router.push('/home')} ></CustomButton>
            </View>
            <FormFeild
              title="Enter OTP"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <View className='flex justify-center items-center'>
            <CustomButton title='Verify' containerStyle='mt-7 w-1/3' handlePress={()=>router.push('/home')} ></CustomButton>
            </View>
            {/* <SelectButton
              title="Select your Role"
              containerStyle="mt-7"
              options={options}
              optionStyle="bg-secondary"
            /> */}
            <CustomButton title="Sign Up" containerStyle="mt-7" handlePress={()=>router.push('/home')} />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular text-gray-100">
                Already have an account?
              </Text>
              <Link
                href="/signin"
                className="text-white font-psemibold text-lg"
              >
                SignIn
              </Link>
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
  );
};

export default signup;

// com.aman.aora
