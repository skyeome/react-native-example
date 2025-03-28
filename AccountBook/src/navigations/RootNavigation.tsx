import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      {/* Add your screens here */}
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
