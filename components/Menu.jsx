import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function MenuBtn() {
  const navigation = useNavigation();
  return (
    <Menu>
      <MenuTrigger
        children={<MaterialIcons name="more-vert" size={24} color="white" />}
        customStyles={{ triggerOuterWrapper: { marginRight: 5 } }}
      />
      <MenuOptions>
        <MenuOption
          onSelect={() => navigation.navigate("Settings")}
          text="Settings"
        />
        <MenuOption
          onSelect={() => Alert.alert("logout", "You have been logout")}
          text="Logout"
        />
      </MenuOptions>
    </Menu>
  );
}
