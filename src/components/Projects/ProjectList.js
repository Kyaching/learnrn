import {
  FlatList,
  Image,
  ImageBackground,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {projects} from '../../data/projects';
import CardImg from '../../assets/img/card.png';
import moment from 'moment';
import TaskView from '../TaskView/TaskView';

const Card = ({
  id,
  label,
  name,
  description,
  image,
  startDate,
  selectedCard,
  setSelectedCard,
}) => {
  return (
    <TouchableOpacity onPress={() => setSelectedCard(id)} style={styles.card}>
      <ImageBackground
        style={[
          styles.imageBackground,
          selectedCard === id ? {opacity: 1} : {opacity: 0.6},
        ]}
        resizeMode="stretch"
        source={CardImg}>
        <View style={styles.cardContent}>
          <View style={{flexDirection: 'row', gap: 4}}>
            {image && <Image source={image} style={{height: 28, width: 28}} />}
            <Text style={[styles.text, {fontSize: 16}]}>{label}</Text>
          </View>
          <Text
            style={[
              styles.text,
              {marginTop: 20, fontSize: 30, fontWeight: 'bold'},
            ]}>
            {name}
          </Text>
          <Text
            style={[
              styles.text,
              {
                bottom: 0,
                position: 'absolute',
                paddingVertical: 10,
                paddingHorizontal: 15,
              },
            ]}>
            {moment(startDate).format('MMMM Do YYYY')}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ProjectList = () => {
  const [selectedCard, setSelectedCard] = useState('');

  const taskGroup = useMemo(() => {
    const tasks = projects?.find(project => project.id === selectedCard)?.tasks;
    const group = {};
    tasks?.map(task => {
      const existingItem = task?.status;
      if (group[existingItem]) {
        group[existingItem] = [...group[existingItem], task];
      } else {
        group[task.status] = [task];
      }
    });
    const groupArray = Object.keys(group).map(key => {
      return {
        label: key,
        data: group[key],
      };
    });

    return groupArray;
  }, [selectedCard]);

  return (
    <View style={{flex: 1, marginTop: 20}}>
      <FlatList
        style={{padding: 10}}
        contentContainerStyle={{gap: 20, marginRight: 10}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            {...item}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      />
      {selectedCard && (
        <SectionList
          style={{paddingHorizontal: 20, paddingVertical: 10}}
          sections={taskGroup}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <TaskView {...item} />}
          renderSectionHeader={({section: {label}}) => (
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>{label}</Text>
          )}
        />
      )}
    </View>
  );
};

export default ProjectList;

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 220,
    borderRadius: 16,
  },
  imageBackground: {
    height: '100%',
  },
  cardContent: {
    position: 'absolute',
    padding: 20,
    height: '100%',
  },
  text: {
    color: 'white',
  },
});
