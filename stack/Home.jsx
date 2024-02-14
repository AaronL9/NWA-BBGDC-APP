import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import { Colors } from "../constants/colors";

import Articles from "../screens/articles/Articles";
import ArticleView from "../screens/articles/ArticleView";
import Report from "../screens/Report";
import Settings from "../screens/Settings";
import InfoDesk from "../screens/info_desk/InfoDesk";
import MenuBtn from "../components/Menu";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
              source={require("../assets/logo.png")}
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
          name="Articles"
          component={Articles}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="article" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14 },
          }}
        />
        <Tab.Screen
          name="InfoDesk"
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

const Home = () => {
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
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ArticleView" component={ArticleView} />
    </Stack.Navigator>
  );
};

export default Home;
