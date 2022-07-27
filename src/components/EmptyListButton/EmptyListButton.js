import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Icons} from '../../constants';

const EmptyListButton = ({
  mainLabel,
  subLabel,
  icon,
  customMainLabelStyle,
  customSubLabelStyle,
  iconStyle,
  onPressYes,
  onPressNo,
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
      <View
        style={{
          marginHorizontal: wp('15%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp('2%'),
        }}>
        <Pressable
          style={{
            width: wp('20%'),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            borderRadius: 10,
            backgroundColor: Colors.primary,
          }}
          onPress={onPressYes}>
          <Text
            style={{
              color: Colors.white,
              ...Fonts.s3,
            }}>
            Yes
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: wp('20%'),
            justifyContent: 'center',
            marginStart: wp('15%'),
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            borderRadius: 10,
            backgroundColor: Colors.red,
          }}
          onPress={onPressNo}>
          <Text
            style={{
              color: Colors.white,
              ...Fonts.s3,
            }}>
            No
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EmptyListButton;
