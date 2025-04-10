/* eslint-disable react-native/no-inline-styles */
import {View, Image, Text, Dimensions} from 'react-native';
import React from 'react';
import ListItemType from './ListItem.types';

const ListItemView = ({item}: {item: ListItemType}) => {
  const width = Dimensions.get('window').width;
  return (
    <View>
      <Image
        resizeMode="cover"
        source={{uri: item.thumbnail}}
        style={{width, height: 200}}
      />
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 16}}>{item.title}</Text>
        <Text style={{fontSize: 12, color: '#666'}}>{item.channelTitle}</Text>
        <Text style={{fontSize: 12, color: '#666'}}>
          {item.viewCount} • {item.publishedAt}
        </Text>
      </View>
    </View>
  );
};

export default ListItemView;
