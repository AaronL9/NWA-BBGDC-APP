import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AuthContext } from "../context/authContext";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function MenuBtn() {
  const authCtx = useContext(AuthContext);

  const navigation = useNavigation();
  return (
    <Menu>
      <MenuTrigger
        children={<MaterialIcons name="more-vert" size={24} color="white" />}
        customStyles={{ triggerOuterWrapper: { marginRight: 5 } }}
      />
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: "#f5f5f5",
            borderRadius: 12,
          },
        }}
      >
        <MenuOption
          onSelect={() => navigation.navigate("Settings")}
          children={<MenuOptionChildren icon={"settings"} text={"Settings"} />}
        />
        <MenuOption
          onSelect={authCtx.logout}
          children={<MenuOptionChildren icon={"exit"} text={"Logout"} />}
        />
      </MenuOptions>
    </Menu>
  );
}

function MenuOptionChildren({ icon, text }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
      <Ionicons name={icon} size={24} color={Colors.primary400} />
      <Text style={{ color: Colors.primary400, fontWeight: "bold" }}>
        {text}
      </Text>
    </View>
  );
}
