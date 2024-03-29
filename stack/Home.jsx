import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import { Colors } from "../constants/colors";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import News from "../screens/news/News";
import NewsView from "../screens/news/NewsView";
import Report from "../screens/Report";
import Settings from "../screens/Settings";
import InfoDesk from "../screens/info_desk/InfoDesk";
import MenuBtn from "../components/Menu";
import { Image } from "react-native";
import Map from "../screens/Map";
import { useContext, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../context/authContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const BottomNavigator = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
            backgroundColor: Colors.primary400,
          },
          headerStyle: { backgroundColor: Colors.primary400 },
          headerTintColor: "white",
          headerTitle: "Neighborhood Watch",
          headerRight: () => <MenuBtn />,
          headerLeft: () => (
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 35, height: 35, marginLeft: 14 }}
            />
          ),
          tabBarActiveTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="smartphone" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14 },
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="article" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14 },
          }}
        />
        <Tab.Screen
          name="Hotlines"
          component={InfoDesk}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="info" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14 },
          }}
        />
      </Tab.Navigator>
    </MenuProvider>
  );
};

export default function Home() {
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      firestore()
        .collection("user_push_token")
        .doc(userData.uid)
        .set({ token }, { merge: true });
    });

    const subscription1 = Notifications.addNotificationReceivedListener(() => {
      console.log("NOTIFICATION RECEIVED HANDLED");
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      () => {
        console.log("NOTIFICATION RESPONSE HANLDED");
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: Colors.primary400 },
      }}
    >
      <Stack.Screen
        name="BottomNav"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="NewsView"
        component={NewsView}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
}
