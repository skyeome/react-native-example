/* eslint-disable react-native/no-inline-styles */
import {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Header} from '../components/Header/Header';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getAddressFromCoords} from '../utils/GeoUtils';

export const MainScreen: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.566482,
    longitude: 126.978292,
  });

  const [address, setAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback(
    async (latitude: number, longitude: number) => {
      setCurrentPosition({
        latitude,
        longitude,
      });

      getAddressFromCoords(latitude, longitude).then(setAddress);
    },
    [],
  );

  const getMyLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(info => {
      onChangeLocation(info.coords.latitude, info.coords.longitude);
    });
  }, [onChangeLocation]);

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
        region={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
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
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{address}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
