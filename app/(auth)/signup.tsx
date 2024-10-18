import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormFeild from "@/components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const getOtp = () => {
    if (!form.phone) {
      Alert.alert("Error", "Please enter your phone number first");
      return;
    }
    Alert.alert(
      "OTP Sent",
      "OTP has been sent to your registered phone number!"
    );
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (!form.phone || !form.otp || !form.username || !form.email) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      // Alert.alert("Success", "OTP verified successfully!");
      router.replace("/home");
      setIsSubmitting(false);
    }, 2000);
  };

  const isSignUpDisabled =
    !form.username || !form.email || !form.phone || !form.otp;

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <View className="w-full h-full justify-center p-4 my-auto">
          <Text className="text-6xl text-white font-sanbold text-center">
            emRoutes
          </Text>
          <Text className="text-2xl text-white font-psemibold text-center mt-10">
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

          <View className="flex flex-row justify-between items-center mt-7">
            <FormFeild
              title="Phone Number"
              value={form.phone}
              handleChangeText={(e) => setForm({ ...form, phone: e })}
              otherStyles="flex-1"
              keyboardType="phone-pad"
            />
            <CustomButton
              title="Get OTP"
              containerStyle="ml-3 w-1/3 mt-auto"
              handlePress={getOtp}
              disabled={!form.phone}
            />
          </View>

          {otpSent && (
            <>
              <FormFeild
                title="Enter OTP"
                value={form.otp}
                handleChangeText={(e) => setForm({ ...form, otp: e })}
                otherStyles="mt-7"
                keyboardType="numeric"
              />
            </>
          )}

          {isSubmitting ? (
            <ActivityIndicator size="large" color="#ffffff" className="mt-7" />
          ) : (
            <CustomButton
              title="Sign Up"
              containerStyle="mt-7"
              handlePress={verifyOtp}
              disabled={isSignUpDisabled}
            />
          )}

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg font-pregular text-gray-100">
              Already have an account?
            </Text>
            <Link href="/signin" className="text-white font-psemibold text-lg">
              Sign In
            </Link>
          </View>
        </View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#D7423F"
          translucent={false}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default signup;
