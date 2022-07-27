import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  CustomButton,
  TextButton,
  CustomInput,
  EmptyList,
} from '../../components';
import {Colors, Fonts, Icons, Images} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {Searchbar} from 'react-native-paper';
import debounce from 'lodash.debounce';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';

const FirebaseScreen = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = React.useState('');
  const [groceryName, setGroceryName] = useState('');
  const [listData, setListData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const subscriber = firestore()
      .collection('grocery')
      .orderBy('name')
      .onSnapshot(
        querySnapshot => {
          /*
            A QuerySnapshot allows you to inspect the collection,
            such as how many documents exist within it,
            access to the documents within the collection,
            any changes since the last query and more.
          */
          let temp = [];
          console.log('Total grocery: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            console.log('grocery Id in subscriber: ', documentSnapshot.id);
            /*
              A DocumentSnapshot belongs to a specific document,
              With snapshot you can view a documents data,
              metadata and whether a document actually exists.
            */
            let groceryDetails = {};
            // Document fields
            groceryDetails = documentSnapshot.data();
            // All the document related data
            groceryDetails['id'] = documentSnapshot.id;
            temp.push(groceryDetails);
          });
          setListData(temp);
        },
        error => {
          console.log('error', error);
        },
      );

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const addGroceryInFireStore = () => {
    if (groceryName !== '') {
      firestore()
        .collection('grocery')
        .add({
          name: groceryName,
        })
        .then(() => {
          setGroceryName('');
          toast.show('Grocery added successfully.', {
            type: 'success',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
        })
        .catch(error => {
          toast.show(error.toString(), {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
        });
    } else {
      toast.show('Please add grocery name first', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  };

  const deleteGroceryFromFireStore = groceryId => {
    if (groceryId) {
      firestore()
        .collection('grocery')
        .doc(groceryId)
        .delete()
        .then(() => {
          setSearch('');
          toast.show('Item deleted successfully.', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
        })
        .catch(error => {
          toast.show(error.toString(), {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
        });
    } else {
      toast.show(error.toString(), {
        type: 'danger',
        placement: 'top',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  };

  const searchGroceryItem = itemName => {
    setSearch(itemName);
    firestore()
      .collection('grocery')
      .orderBy('name')
      .startAt(itemName)
      .endAt(itemName + '\uf8ff')
      .get()
      .then(
        querySnapshot => {
          let temp = [];
          console.log('Total grocery: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            console.log('grocery Id: ', documentSnapshot.id);

            /*
              A DocumentSnapshot belongs to a specific document,
              With snapshot you can view a documents data,
              metadata and whether a document actually exists.
            */
            let groceryDetails = {};
            // Document fields
            groceryDetails = documentSnapshot.data();
            // All the document related data
            groceryDetails['id'] = documentSnapshot.id;

            temp.push(groceryDetails);
          });
          console.log(JSON.stringify(temp));
          setListData(temp);
        },
        error => {
          console.log('error', error);
        },
      );
  };

  const debouncedSave = useCallback(
    debounce(nextValue => searchGroceryItem(nextValue), 1000),
    [], // will be created only once initially
  );

  const handleChange = name => {
    setSearch(name);
    // Even though handleChange is created on each render and executed
    // it references the same debouncedSave that was created initially
    debouncedSave(name);
  };

  const emptyList = () => {
    return (
      <EmptyList
        mainLabel="This gorcery is not added."
        subLabel="Please add the grocery name first."
        icon={Images.order_failed}
        containerStyle={{marginTop: hp('15%')}}
      />
    );
  };

  const renderGroceryItem = ({item, index}) => {
    // console.log('render category item', index);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.primary,
          paddingHorizontal: wp('2%'),
          paddingVertical: hp('1.5%'),
          borderRadius: 10,
          marginBottom: 5,
        }}>
        <View>
          <Text style={{...Fonts.b4, color: Colors.white}}>{item.name}</Text>
        </View>
        <Pressable onPress={() => deleteGroceryFromFireStore(item.id)}>
          <View>
            <Image
              style={{width: 30, height: 30}}
              source={Icons.negative}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.topSpace}>
          <Text style={styles.mainHeadingStyle}>Grocery List </Text>
          <Text style={styles.subHeadingStyle}>Add your grocery list</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: wp('3%'),
          }}>
          <CustomInput
            onChangeText={value => setGroceryName(value)}
            placeholder="Enter Grocery Name"
            value={groceryName}
            autoCapitalize="words"
            maxLength={30}
            style={{width: wp('65%')}}
          />
          <CustomButton
            label={'ADD'}
            onPress={() => addGroceryInFireStore()}
            type={'PRIMARY'}
            customContainerStyle={{
              width: wp('20%'),
              height: 55,
            }}
          />
        </View>
        <View
          style={{
            marginVertical: hp('1%'),
            marginTop: hp('2%'),
            marginHorizontal: wp('3%'),
          }}>
          <Searchbar
            placeholder="Search your item"
            onChangeText={value => handleChange(value)}
            value={search}
            style={{
              backgroundColor: Colors.darkWhite,
              width: wp('90%'),
              height: 55,
              borderColor: Colors.darkWhite,
              elevation: 1,
            }}
            iconColor={Colors.darkParret}
            inputStyle={{
              color: Colors.lightBlack,
            }}
            selectionColor={Colors.lightGray}
            placeholderTextColor={Colors.lightGray}
          />
        </View>
        <View style={{marginHorizontal: wp('3%'), marginTop: hp('2%')}}>
          <FlatList
            data={listData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGroceryItem}
            ListEmptyComponent={emptyList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2%'),
  },
  topSpace: {
    marginTop: hp('5%'),
    paddingHorizontal: wp('2%'),
  },
  headingSpace: {
    marginTop: hp('5%'),
  },
  mainHeadingStyle: {
    ...Fonts.b5,
    color: Colors.black,
    height: 25,
  },
  subHeadingStyle: {
    marginTop: hp('1%'),
    ...Fonts.r3,
    color: Colors.lightGray,
  },
  buttonSpace: {
    marginTop: hp('3%'),
    alignItems: 'center',
  },
  inputTextHeadingStyle: {
    ...Fonts.m2,
    color: Colors.lightBlack,
  },
  spaceStyle: {
    marginTop: hp('10%'),
  },
});

export default FirebaseScreen;
