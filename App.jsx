import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import Articles from "./screens/Articles";
import Report from "./screens/Report";
import Settings from "./screens/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
        headerTitle: "Neighborhood Watch",
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
