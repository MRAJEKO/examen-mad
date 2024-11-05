import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StatusBar,
  StyleSheet,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard } from "react-native";

interface IProps {
  newChat: () => void;
}

const Header = ({ newChat }: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headerHeight = useRef(new Animated.Value(56)).current;
  const logoScale = useRef(new Animated.Value(1)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;

  const screenHeight = Dimensions.get("window").height;

  const insets = useSafeAreaInsets();

  const handlePress = () => {
    setIsExpanded(true);

    Keyboard.dismiss();

    setTimeout(() => {
      newChat();
    }, 500);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerHeight, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(logoTranslateY, {
          toValue: -(insets.top / 2),
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(headerHeight, {
          toValue: 56,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ]).start(() => {
      setIsExpanded(false);
    });
  };

  return (
    <>
      <StatusBar animated showHideTransition={"fade"} hidden={isExpanded} />
      <Animated.View style={[styles.container, { height: headerHeight }]}>
        <Animated.Image
          source={require("@/assets/images/logo_eloquent.png")}
          style={[
            styles.logo,
            {
              transform: [{ translateY: logoTranslateY }, { scale: logoScale }],
            },
          ]}
        />
        <Pressable style={styles.new} onPress={handlePress}>
          <RemixIcon name="chat-new-line" size={24} color="#fff" />
        </Pressable>
      </Animated.View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3459fe",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 32,
    resizeMode: "contain",
  },
  new: {
    position: "absolute",
    right: 20,
    top: 12,
  },
});
