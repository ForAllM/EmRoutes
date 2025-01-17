import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      activeOpacity={0.7}
    >
      <Text className={`text-red-700 font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
