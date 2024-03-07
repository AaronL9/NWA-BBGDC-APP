import { StyleSheet, Text, TouchableOpacity, Modal, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { members } from "../../util/staticData";

export default function AboutUs() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.aboutUsButton}
        onPress={() => setOpen(true)}
      >
        <Text>About us</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide">
        <TouchableOpacity
          style={{ alignItems: "flex-end", padding: 12 }}
          onPress={() => setOpen(false)}
        >
          <AntDesign name="circledown" size={24} color={Colors.primary400} />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 18, gap: 18 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About Us</Text>
          <Text style={{ textAlign: "justify", lineHeight: 21 }}>
            Welcome to the Neighborhood Watch App, developed as part of our
            capstone project at the University of Pangasinan. We, a group of IT
            students, created this app to make reporting in your barangay easy
            and quick for you. With just a few clicks, share details, photos, or
            videos. It helps law enforcement or assigned barangay tanod respond
            faster. Our app is currently in beta for testing, and we appreciate
            your support and feedback.
          </Text>
        </View>
        <View style={{ paddingHorizontal: 18, marginTop: 20, gap: 18 }}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            GROUP MEMBERS:
          </Text>
          {members.map((member) => (
            <View key={member.name}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: 8,
                }}
              >
                <Octicons name="dot" size={12} color="black" />
                <Text style={{ fontWeight: "500" }}>{member.name}</Text>
              </View>
              <Text style={{ marginLeft: 35, fontSize: 12 }}>
                <Text style={{ fontStyle: "italic" }}>Role: {member.role}</Text>
              </Text>
            </View>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  aboutUsButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 6,
  },
});
