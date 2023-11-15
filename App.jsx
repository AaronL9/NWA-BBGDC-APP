import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { MenuProvider } from "react-native-popup-menu";

import Articles from "./screens/Articles";
import Report from "./screens/Report";
import Settings from "./screens/Settings";
import MenuBtn from "./components/Menu";
import { Colors } from "./constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavigator() {
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
          headerTitle: "Neighborhood Watch",
          headerRight: () => <MenuBtn />,
          tabBarActiveTintColor: 'white'
        }}
      >
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
          name="InfoDesk"
          component={Report}
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
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomNav"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
