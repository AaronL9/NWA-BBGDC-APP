import { Text, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/colors";

export default function ProgressModal({ progress }) {
  return (
    <Modal
      isVisible={!!progress}
      animationIn="bounceIn"
      animationOut="bounceOut"
    >
      <View
        style={{
          width: "90%",
          height: "20%",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 12,
          backgroundColor: Colors.bgPrimaary300,
          alignSelf: "center",
          borderRadius: 16,
        }}
      >
        <Text style={{ fontSize: 16, color: "white" }}>
          Video is being compressed due to its size. Please wait.
        </Text>
        <Text style={{ color: "white", fontSize: 18 }}>{progress}</Text>
      </View>
    </Modal>
  );
}
