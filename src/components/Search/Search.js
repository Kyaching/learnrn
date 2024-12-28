import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../Button/Button';
import SearchArrow from '../../assets/img/search.png';
const Search = () => {
  return (
    <Button style={{backgroundColor: 'transparent', width: 32, height: 32}}>
      <Image style={{width: 28, height: 28}} source={SearchArrow} />
    </Button>
  );
};

export default Search;

const styles = StyleSheet.create({});
