/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar} from 'react-native';

import {RootNavigations} from './src/navigations/RootNavigations';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootNavigations />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
