import React, { useState } from "react";
import { TouchableWithoutFeedback, Animated } from "react-native";
import { Text } from "native-base";
import styles from "./styles";

const AnimatedButton = ({ text, onPress, disabled = false }) => {
  const [buttonAnimation] = useState(new Animated.Value(1));
  const animationIn = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const animationOut = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {
    transform: [{ scale: buttonAnimation }],
  };
  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      delayPressIn={1}
      onPressIn={() => animationIn()}
      onPressOut={() => animationOut()}
      onPress={() => onPress()}
    >
      <Animated.View style={[styles.btnAdd, animationStyle]}>
        <Text style={styles.textAdd}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;
