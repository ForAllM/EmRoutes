import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";

const signin = () => {
  const [form, setForm] = useState({ vehicleNumber: "", otp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const submit = () => {
    if (!form.vehicleNumber || !form.otp) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      router.replace("/home");
      setIsSubmitting(false);
    }, 2000);
  };

  const getOtp = () => {
    if (!form.vehicleNumber) {
      Alert.alert("Error", "Please enter your vehicle number first");
      return;
    }
    Alert.alert("OTP Sent", "OTP has been sent to your registered number!");
    setOtpSent(true);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full min-h-[85vh] justify-center px-4 my-6">
            <Text className="text-6xl text-white font-sanbold text-center">
              emRoutes
            </Text>
            <Text className="text-2xl text-white font-psemibold text-center mt-5">
              Log in to emRoutes
            </Text>

            <FormFeild
              title="Vehicle Number"
              value={form.vehicleNumber}
              handleChangeText={(e) => setForm({ ...form, vehicleNumber: e })}
              otherStyles="mt-7"
              keyboardType="default"
            />

            {/* Display OTP and Resend OTP button in a row if OTP is sent */}
            {otpSent ? (
              <View className="flex flex-row items-center mt-7">
                <FormFeild
                  title="Enter OTP"
                  value={form.otp}
                  handleChangeText={(e) => setForm({ ...form, otp: e })}
                  otherStyles="flex-1 mr-3"
                  keyboardType="numeric"
                />
                <CustomButton
                  title="Resend OTP"
                  containerStyle="w-1/3 mt-auto"
                  handlePress={getOtp}
                />
              </View>
            ) : (
              <View className="flex items-center">
                <CustomButton
                  title="Get OTP"
                  containerStyle="mt-7 w-1/3"
                  handlePress={getOtp}
                  disabled={!form.vehicleNumber}
                />
              </View>
            )}

            {/* Sign In Button */}
            {otpSent &&
              (isSubmitting ? (
                <ActivityIndicator
                  size="large"
                  color="#ffffff"
                  className="mt-7"
                />
              ) : (
                <CustomButton
                  title="Sign In"
                  containerStyle="mt-7"
                  handlePress={submit}
                  disabled={!form.vehicleNumber || !form.otp}
                />
              ))}

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular text-gray-100">
                Don't have an account?
              </Text>
              <Link
                href="/signup"
                className="text-white font-psemibold text-lg"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>

        <StatusBar
          barStyle="light-content"
          backgroundColor="#D7423F"
          translucent={false}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default signin;
