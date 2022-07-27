import React from 'react';
import {Text, TouchableOpacity, Pressable} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../../constants';

const TextButton = ({label, customLabelStyle, onPress}) => {
  return (
    <Pressable
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Text
        style={{
          color: Colors.lightGray,
          ...Fonts.r2,
          ...customLabelStyle,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TextButton;
