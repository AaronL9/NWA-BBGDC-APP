import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider, { AuthContext } from "./context/authContext.js";
import Authentication from "./stack/Authentication.jsx";
import Home from "./stack/Home.jsx";
import { useContext } from "react";
import ModalTester from "./components/PopUpModal.jsx";

function Root() {
  const authCtx = useContext(AuthContext);
  return authCtx.isAuthenticated && !authCtx.authenticating ? (
    <>
      <Home />
    </>
  ) : (
    <Authentication />
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </NavigationContainer>
    </>
  );
}
