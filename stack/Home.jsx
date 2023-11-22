import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";
import { Colors } from "../constants/colors";

import Articles from "../screens/Articles";
import Report from "../screens/Report";
import Settings from "../screens/Settings";
import InfoDesk from "../screens/InfoDesk";
import MenuBtn from "../components/Menu";

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
        <Tab.Screen
          name="Training"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="model-training" size={size} color={color} />
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
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNav"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Home;