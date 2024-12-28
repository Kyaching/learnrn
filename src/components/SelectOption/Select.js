import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../Button/Button';
import Check from '../../assets/img/check.png';

const RenderItem = ({user, Onpress, selectedUser}) => (
  <Pressable
    onPress={Onpress}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginVertical: 5,
    }}>
    <Text>{user.user_name}</Text>
    {selectedUser.includes(user.user_name) && (
      <Image source={Check} style={{width: 20, height: 20}} />
    )}
  </Pressable>
);

const Select = ({receivers, selectedUser, setSelectedUser}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectedUser = user_name => {
    setSelectedUser(prevSelected =>
      prevSelected.includes(user_name)
        ? prevSelected.filter(item => item !== user_name)
        : [user_name, ...prevSelected],
    );
  };
  return (
    <View style={styles.container}>
      <Button
        onPress={() => setSelected(prev => !prev)}
        label={'Select Recipient'}
        style={{width: '30%', marginTop: 0}}
      />
      <View
        style={{
          height: 60,
          width: '65%',
        }}>
        <ScrollView>
          {selectedUser.map((user, index) => (
            <Text key={index}>{user}</Text>
          ))}
        </ScrollView>
      </View>
      {selected && (
        <View style={styles.dropArea}>
          <FlatList
            data={receivers}
            renderItem={({item}) => (
              <RenderItem
                selectedUser={selectedUser}
                Onpress={() => handleSelectedUser(item.user_name)}
                user={item}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    overflow: 'visible',
    justifyContent: 'space-between',
  },
  dropArea: {
    position: 'absolute',
    width: '70%',
    height: 200,
    borderRadius: 5,
    marginTop: 50,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    zIndex: 10,
  },
});
