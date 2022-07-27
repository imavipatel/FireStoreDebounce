import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors, Fonts} from '../../constants';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  const [focus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {
                borderColor: focus
                  ? Colors.primary
                  : error
                  ? 'red'
                  : Colors.darkWhite,
              },
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              placeholder={placeholder}
              placeholderTextColor={Colors.lightGray}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkWhite,
    width: '100%',
    borderColor: Colors.darkWhite,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    ...Fonts.r3,
    color: Colors.lightBlack,
  },
});

export default CustomInput;
