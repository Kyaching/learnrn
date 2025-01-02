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
import {TextInput} from 'react-native-gesture-handler';

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
  const [searchUser, setSearchUser] = useState('');
  const [filterUsers, setFilterUsers] = useState(receivers);

  const handleSelectedUser = user_name => {
    setSelectedUser(prevSelected =>
      prevSelected.includes(user_name)
        ? prevSelected.filter(item => item !== user_name)
        : [user_name, ...prevSelected],
    );
  };

  const handleSelectAll = () => {
    setSelectedUser(receivers.map(user => user.user_name));
  };

  const filterUsersOptions = text => {
    setSearchUser(text);
    setFilterUsers(
      receivers.filter(user =>
        user.user_name.toLowerCase().includes(text.toLowerCase()),
      ),
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
          <TextInput
            placeholder="Search"
            value={searchUser}
            onChangeText={filterUsersOptions}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 4,
            }}
            inputMode="text"
            autoCapitalize="none"
          />
          <Pressable
            onPress={() => handleSelectAll()}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginVertical: 5,
            }}>
            <Text>All</Text>
            {/* <Image source={Check} style={{width: 20, height: 20}} /> */}
          </Pressable>
          <FlatList
            data={filterUsers}
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
