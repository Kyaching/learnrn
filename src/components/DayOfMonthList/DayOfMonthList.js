import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

const DateItemView = ({day, date, fullDate, selectedDate, setSelectedDate}) => {
  const isSelected = date?.toDateString() === selectedDate?.toDateString();
  return (
    <TouchableOpacity
      onPress={() => setSelectedDate(date)}
      style={[styles.dayItem, isSelected && styles.selectedDayItem]}>
      <Text style={[isSelected && styles.selectedDate]}>{day}</Text>
      <Text style={[styles.dateText, isSelected && styles.selectedDate]}>
        {date?.getDate()}
      </Text>
    </TouchableOpacity>
  );
};

const DayOfMonthList = ({date}) => {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const flatListRef = useRef(null);

  const generateDays = useMemo(() => {
    const date = selectedDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArr = [];
    for (let i = 0; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      daysArr.push({
        date,
        day: date.toLocaleString('en-us', {weekday: 'short'}),
        fullDate: date?.toLocaleDateString(),
      });
    }
    setDays(daysArr);
    setTimeout(() => {
      handleScroll(selectedDate, daysArr);
    }, 100);
  }, [selectedDate]);

  const handleScroll = useCallback((selectedDate, days) => {
    const index = days.findIndex(
      day => day?.date?.toDateString() === selectedDate?.toDateString(),
    );
    if (flatListRef.current && index >= 0) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  }, []);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={days}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}) => (
          <DateItemView
            {...item}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        onScrollToIndexFailed={info => {
          const promise = new Promise(resolve => setTimeout(resolve, 500));
          promise.then(() => {
            if (flatListRef?.current) {
              flatListRef.current.scrollToIndex({
                index: info?.index,
                animated: true,
              });
            }
          });
        }}
      />
    </View>
  );
};

export default DayOfMonthList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dayItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: 54,
    height: 70,
    marginHorizontal: 5,
    gap: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDate: {
    color: 'white',
  },
  selectedDayItem: {
    backgroundColor: '#176FF2',
  },
});
