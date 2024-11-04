import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo_eloquent.png")}
        style={{ width: "100%", height: 32, resizeMode: "contain" }}
      ></Image>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#3459fe",
    color: "#fff",
  },
});
