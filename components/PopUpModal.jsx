import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/authContext";

export default function ModalTester({ setModalVisible, isModalVisible }) {
  const { logout } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
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
        <Text style={{ fontSize: 18, color: "white" }}>
          Are you sure you want to log out?
        </Text>
        <View
          style={{
            alignItems: "stretch",
            width: "80%",
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              color: "black",
              paddingVertical: 8,
              borderRadius: 20,
              alignItems: "center",
            }}
            onPress={logout}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              borderRadius: 20,
              alignItems: "center",
            }}
            onPress={toggleModal}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
