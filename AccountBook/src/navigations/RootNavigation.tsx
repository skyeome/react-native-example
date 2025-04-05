import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory';
import AddUpdateScreen from '../screens/AddUpdateScreen';
import CalenderSelectScreen from '../screens/CalenderSelectScreen';
import DetailScreen from '../screens/DetailScreen';
import MainScreen from '../screens/MainScreen';
import MonthlyAverageScren from '../screens/MonthlyAverageScren';
import TakePhotoScreen from '../screens/TakePhotoScreen';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: {item: AccountBookHistory};
  Detail: {item: AccountBookHistory};
  MonthlyAverage: undefined;
  Calendar: {selected: number; onSelectDate: (date: number) => void};
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator<ScreenParams>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="MonthlyAverage" component={MonthlyAverageScren} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Calendar" component={CalenderSelectScreen} />
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
