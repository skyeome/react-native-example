/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';

const MonthlyAverageScren = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MonthlyAverage" />
      </Header>
    </View>
  );
};
export default MonthlyAverageScren;
