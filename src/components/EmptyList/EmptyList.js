import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Icons} from '../../constants';

const EmptyList = ({
  mainLabel,
  subLabel,
  icon,
  customMainLabelStyle,
  customSubLabelStyle,
  iconStyle,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={icon}
        style={{width: wp('60%'), height: wp('60%'), ...iconStyle}}
        resizeMode="contain"
      />
      <View style={{marginHorizontal: wp('15%')}}>
        <Text
          style={{
            color: Colors.lightBlack,
            textAlign: 'center',
            ...Fonts.s2,
            ...customMainLabelStyle,
          }}>
          {mainLabel}
        </Text>
        <Text
          style={{
            color: Colors.lightGray,
            textAlign: 'center',
            marginTop: hp('2%'),
            ...Fonts.m1,
            ...customSubLabelStyle,
          }}>
          {subLabel}
        </Text>
      </View>
    </View>
  );
};

export default EmptyList;
