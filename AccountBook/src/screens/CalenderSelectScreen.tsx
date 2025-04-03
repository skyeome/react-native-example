/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import CalendarPicker from 'react-native-calendar-picker';

const CalenderSelectScreen = () => {
  const navigation = useRootNavigation<'Calendar'>();
  const routes = useRootRoute<'Calendar'>();

  console.log(routes);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <View style={{flex: 1}}>
        <CalendarPicker
          initialDate={
            routes.params.selected !== 0
              ? new Date(routes.params.selected)
              : undefined
          }
          onDateChange={item => {
            // const selectedDate = new Date(item);

            routes.params.onSelectDate(item.valueOf());
            navigation.goBack();
            // item.valueOf();
          }}
        />
      </View>
    </View>
  );
};
export default CalenderSelectScreen;
