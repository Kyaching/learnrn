import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../components/Button/Button';
import Drawer from '../../assets/img/drawer.png';
import Profile from '../../assets/img/profile.png';
import Categories from '../../components/Categories/Categories';
import ProjectList from '../../components/Projects/ProjectList';

const HomeScreen = ({navigation}) => {
  const renderHeader = () => (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}>
          <Image source={Drawer} style={styles.menuIcon} />
        </Button>
        <Button style={styles.menuButton}>
          <Image source={Profile} style={styles.menuIcon} />
        </Button>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Hello, Jhon</Text>
        <Text>Have a nice day!</Text>
      </View>
      <Categories />
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={[]}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={<ProjectList />}
      renderItem={null}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuButton: {
    backgroundColor: 'transparent',
    width: 24,
    margin: 10,
  },
  menuIcon: {
    width: 28,
    height: 28,
  },
});
