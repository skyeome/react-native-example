import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import ListItemView from './ListItemView';
import useYoutubeData from './useYoutubeData';

const ListView = () => {
  const {data, fetchYoutubeData, fetchYoutubeDataMore} = useYoutubeData();

  useEffect(() => {
    fetchYoutubeData(); // Replace with actual URL
  }, [fetchYoutubeData]);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
      keyExtractor={(item, idx) => item.publishedAt + idx.toString()}
      onEndReached={fetchYoutubeDataMore}
      onEndReachedThreshold={0.1}
    />
  );
};

export default ListView;
