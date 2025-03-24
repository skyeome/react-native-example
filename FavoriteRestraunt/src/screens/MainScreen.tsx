/* eslint-disable react-native/no-inline-styles */
import {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigations/RootNavigations';
import {getAddressFromCoords} from '../utils/GeoUtils';
import {getRestrauntList} from '../utils/RealTimeDataBaseUtils';

export interface Restraunt {
  title: string;
  latitude: number;
  longitude: number;
  address: string;
}

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation<'Main'>();
  const [isMapReady, setIsMapReady] = useState(false);
  const [restrauntList, setRestrauntList] = useState<Restraunt[]>([]);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.566482,
    longitude: 126.978292,
    latitudeDelta: 0.003,
    longitudeDelta: 0.0025,
  });

  const [address, setAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback(
    async (latitude: number, longitude: number) => {
      setCurrentPosition(prevState => ({
        ...prevState,
        latitude,
        longitude,
      }));

      getAddressFromCoords(latitude, longitude).then(setAddress);
    },
    [],
  );

  const onPressBottomAddress = useCallback(() => {
    if (address === null) {
      return;
    }
    navigation.push('Add', {
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
      address,
    });
  }, [navigation, currentPosition, address]);

  const getMyLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(
      info => {
        onChangeLocation(info.coords.latitude, info.coords.longitude);
      },
      error => {
        console.error(error);
      },
    );
  }, [onChangeLocation]);

  const onMapReady = useCallback(() => {
    setIsMapReady(true);
    getRestrauntList().then(result => {
      console.log('result', result);
      setRestrauntList(result);
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);

  return (
    <View style={{position: 'relative', flex: 1}}>
      <Header>
        <Header.Title title="MAIN" />
      </Header>

      <MapView
        style={{flex: 1}}
        onMapReady={onMapReady}
        region={currentPosition}
        onLongPress={e => {
          onChangeLocation(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          );
        }}>
        <Marker
          coordinate={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          }}
          title="현재 계신 위치"
        />
        {isMapReady &&
          restrauntList.map(item => {
            return (
              <Marker
                title={item.title}
                description={item.address}
                pinColor="blue"
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
              />
            );
          })}
      </MapView>

      {address && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}
            onPress={onPressBottomAddress}>
            <Text style={{fontSize: 16, color: 'white'}}>{address}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
