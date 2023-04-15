import { Animated, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { useTheme } from "@react-navigation/native";

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = "#fff";
export const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
export const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OTPInputs = ({ otp, setOtp }) => {
  const { colors } = useTheme();

  const styles = getStyles({ colors });

  const ref = useBlurOnFulfill({ otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={otp}
        onChangeText={setOtp}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </SafeAreaView>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    codeFiledRoot: {
      height: CELL_SIZE,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    cell: {
      marginHorizontal: 8,
      height: CELL_SIZE,
      width: CELL_SIZE,
      lineHeight: CELL_SIZE - 5,
      fontSize: 30,
      textAlign: "center",
      borderRadius: CELL_BORDER_RADIUS,
      borderWidth: 1,
      borderColor: colors.primary,
      color: "#3759b8",
      backgroundColor: "#fff",

      // IOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      // Android
      elevation: 3,
    },

    // =======================

    root: {
      padding: 20,
    },
    title: {
      paddingTop: 50,
      color: "#000",
      fontSize: 25,
      fontWeight: "700",
      textAlign: "center",
      paddingBottom: 40,
    },
    icon: {
      width: 217 / 2.4,
      height: 158 / 2.4,
      marginLeft: "auto",
      marginRight: "auto",
    },
    subTitle: {
      paddingTop: 30,
      color: "#000",
      textAlign: "center",
    },
    nextButton: {
      marginTop: 30,
      borderRadius: 60,
      height: 60,
      backgroundColor: "#3557b7",
      justifyContent: "center",
      minWidth: 300,
      marginBottom: 100,
    },
    nextButtonText: {
      textAlign: "center",
      fontSize: 20,
      color: "#fff",
      fontWeight: "700",
    },
  });

export default OTPInputs;
