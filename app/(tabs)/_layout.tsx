import { View, Text, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from "../../constants";
import Icons from "react-native-vector-icons/Ionicons";
import Iconsplus from "react-native-vector-icons/AntDesign";
import home from "./home";
import bookmark from "./bookmark";
import profile from "./profile";
import Setting from "./settings";

const TabIcon = ({ icons, color, name, focused, size }) => {
  return (
    <View className="flex flex-col items-center justify-center w-full gap-2">
      <Image
        source={icons}
        tintColor={color}
        resizeMode="contain"
        className={size}
      />
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const Tabs = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#DC143C",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#DC143C",
          borderTopWidth: 2,
          height: 64,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        component={home}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icons={icons.home}
              color={color}
              name="Home"
              focused={focused}
              size="w-6 h-6"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        component={bookmark}
        options={{
          title: "Bookmarks",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icons={icons.bookmark}
              color={color}
              name="Bookmarks"
              focused={focused}
              size="w-6 h-6"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        component={profile}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icons={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
              size="w-6 h-6"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        component={Setting}
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icons={icons.menu}
              color={color}
              name="Settings"
              focused={focused}
              size="w-6 h-6"
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsLayout;
