import useDotAnimation from "@/hooks/useDotAnimation";
import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const Loading = () => {
  const dot1Animation = useDotAnimation(0);
  const dot2Animation = useDotAnimation(200);
  const dot3Animation = useDotAnimation(400);

  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <Animated.View
          style={[styles.dot, { transform: [{ translateY: dot1Animation }] }]}
        />
        <Animated.View
          style={[styles.dot, { transform: [{ translateY: dot2Animation }] }]}
        />
        <Animated.View
          style={[styles.dot, { transform: [{ translateY: dot3Animation }] }]}
        />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1f1f1f", // Replace with your Colors.$accent-background
    paddingVertical: 12,
    paddingTop: 16,
    paddingHorizontal: 10,
    maxWidth: "95%",
    alignSelf: "flex-start",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginBottom: 12,
  },
  loading: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: "#fff", // Replace with your Colors.$accent-text
  },
});
