import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors, Fonts} from '../../constants';
const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: Colors.primary,
  },

  container_SECONDARY: {
    borderColor: Colors.darkWhite,
    backgroundColor: Colors.darkWhite,
    borderWidth: 1,
  },

  container_TERTIARY: {},

  text: {
    ...Fonts.s3,
    color: 'white',
  },

  text_SECONDARY: {
    color: Colors.lightGray,
  },

  text_TERTIARY: {
    color: 'gray',
    ...Fonts.r1,
  },
});

export default CustomButton;
