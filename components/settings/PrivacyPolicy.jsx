import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { policyListing } from "../../util/staticData";

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.aboutUsButton}
        onPress={() => setOpen(true)}
      >
        <Text>Privacy Policy</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide">
        <ScrollView>
          <TouchableOpacity
            style={{ alignItems: "flex-end", padding: 12 }}
            onPress={() => setOpen(false)}
          >
            <AntDesign name="circledown" size={24} color={Colors.primary400} />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 18, gap: 18 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Privacy Policy
            </Text>
            <Text style={{ textAlign: "justify", lineHeight: 21 }}>
              Welcome to the Neighborhood Watch App. This Privacy Policy
              outlines how we collect, use, disclose, and protect your personal
              information when you use our mobile application.
            </Text>
          </View>
          <View style={{ paddingHorizontal: 18, marginTop: 20, gap: 18 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Information We Collect and How We Use It:
            </Text>
            <View style={{ gap: 18 }}>
              {policyListing.map((policy, index) => (
                <View key={index} style={{ margin: 0 }}>
                  <Text style={{ fontWeight: "500", fontSize: 16 }}>
                    {policy.label}
                  </Text>
                  <Text style={{ textAlign: "auto", lineHeight: 20 }}>
                    {policy.description}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
