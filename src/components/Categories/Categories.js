import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const data = [
  {
    label: 'My Task',
    id: 1,
  },
  {
    label: 'In-Progress',
    id: 2,
  },
  {
    label: 'Completed',
    id: 3,
  },
];

const Chip = ({label, id, index, selectedCategory, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      key={index}
      style={[
        styles.chip,
        selectedCategory.includes(id) ? {backgroundColor: '#176FF2'} : {},
      ]}>
      <Text style={selectedCategory.includes(id) ? {color: 'white'} : {}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const onSelect = id => {
    if (selectedCategory.includes(id)) {
      setSelectedCategory(selectedCategory.filter(item => item !== id));
    } else {
      setSelectedCategory([...selectedCategory, id]);
    }
  };
  return (
    <ScrollView
      style={{width: '100%'}}
      horizontal
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}>
      {data.map((item, index) => (
        <Chip
          key={item.id}
          {...item}
          index={index}
          selectedCategory={selectedCategory}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  listContainer: {
    gap: 16,
    paddingLeft: 20,
    marginTop: 20,
  },
  chip: {
    backgroundColor: '#F1F4FF',
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    padding: 10,
  },
});
