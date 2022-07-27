import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts, Icons} from '../../constants';

export default function CustomInput({onPress, icon, ...props}) {
  const [focus, setFocus] = React.useState(props.focus);
  const [secure, setSecure] = React.useState(props.secure);
  const [leftIcon, setLeftIcon] = React.useState(props.leftIcon);
  const [leftPhoneIcon, setRightPhoneIcon] = React.useState(
    props.leftPhoneIcon,
  );
  const [rightIcon, setRightIcon] = React.useState(props.rightIcon);
  return (
    <View
      style={[
        styles.container,
        props.style,
        {
          borderColor: focus ? Colors.primary : Colors.darkWhite,
        },
      ]}>
      {props.leftIcon && (
        <Pressable onPress={onPress}>
          <Image
            style={{width: 16, height: 16, ...props.leftIconStyle}}
            source={icon}
            resizeMode="contain"
          />
        </Pressable>
      )}
      {props.leftPhoneIcon && (
        <Pressable
          onPress={onPress}
          style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            style={{width: 25, height: 25}}
            source={Icons.flag}
            resizeMode="contain"
          />
          <Text
            style={{
              ...Fonts.r3,
              color: Colors.lightBlack,
              marginStart: wp('2%'),
              marginTop: 3,
            }}>
            +91-
          </Text>
        </Pressable>
      )}
      <TextInput
        setFocus={focus}
        onChangeText={text => props.onChangeText(text)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        secureTextEntry={secure}
        style={[styles.textInput, props.textInputStyle]}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        selectionColor={Colors.primary}
        value={props.value}
        editable={props.editable}
        maxLength={props.maxLength}
        autoCapitalize={props.autoCapitalize}
        placeholderTextColor={Colors.lightGray}
        returnKeyType={props.returnKeyType}
      />
      {props.secure && (
        <Icon
          style={{marginRight: 10}}
          name={secure ? 'eye' : 'eye-off'}
          size={22}
          color={Colors.lightGray}
          onPress={() => setSecure(!secure)}
        />
      )}
      {props.rightIcon && (
        <Pressable onPress={onPress} style={{marginRight: 10}}>
          <Image
            style={{width: 16, height: 16}}
            source={icon}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    ...Fonts.r3,
    color: Colors.lightBlack,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  container: {
    backgroundColor: Colors.darkWhite,
    width: '100%',
    borderColor: Colors.darkWhite,
    height: 55,
    // marginTop: 10,
    // marginBottom: 2,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
