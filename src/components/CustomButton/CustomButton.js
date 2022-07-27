import React from 'react';
import {Text, TouchableOpacity, Pressable, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../../constants';

const CustomButton = ({
  label,
  customContainerStyle,
  customLabelStyle,
  onPress,
  icon,
  iconTrue,
  type = 'PRIMARY',
  ...props
}) => {
  return (
    <Pressable
      disabled={iconTrue ? false : type === 'PRIMARY' ? false : true}
      style={{
        width: wp('90%'),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 45,
        borderRadius: 10,
        backgroundColor: type === 'PRIMARY' ? Colors.primary : Colors.darkWhite,
        ...customContainerStyle,
      }}
      onPress={onPress}
      {...props}>
      {icon && (
        <Image
          style={
            type === 'PRIMARY'
              ? {
                  width: 20,
                  height: 20,
                  marginEnd: wp('2%'),
                  tintColor: Colors.white,
                }
              : {width: 20, height: 20, marginEnd: wp('2%')}
          }
          source={icon}
          resizeMode="contain"
        />
      )}
      <Text
        style={{
          color: type === 'PRIMARY' ? Colors.white : Colors.lightGray,
          ...Fonts.s3,
          ...customLabelStyle,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
