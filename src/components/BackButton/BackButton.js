import React from 'react';
import {Image, StyleSheet, Pressable} from 'react-native';
import {Icons} from '../../constants';

const BackButton = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={Icons.backarrow} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default BackButton;
