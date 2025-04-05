/* eslint-disable react-native/no-inline-styles */
import {View, Text, Platform} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Button} from '../components/Button';

const TakePhotoScreen = () => {
  const navigation = useRootNavigation<'TakePhoto'>();
  const route = useRootRoute<'TakePhoto'>();
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const onPressTakePhoto = useCallback(async () => {
    const result = await cameraRef.current?.takePhoto();
    const path = `${Platform.OS === 'android' ? 'file://' : ''}${result?.path}`;
    if (result) {
      console.log('result path: ', result.path);
      // 사진을 찍은 후, CameraRoll에 저장합니다.
      await CameraRoll.saveAsset(path, {type: 'photo', album: 'Camera'});
      // onTakePhoto callback을 호출합니다. (state에 저장)
      route.params.onTakePhoto(path);
      // 사진을 찍은 후, 화면을 닫습니다.
      navigation.goBack();
    }
  }, [navigation, route.params]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    requestCameraPermission();
  }, [hasPermission, requestPermission]);

  if (device == null) {
    return <Text>카메라를 열지 못했습니다.</Text>;
  }
  if (!hasPermission) {
    return <Text>카메라 권한이 필요합니다.</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 찍기" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={cameraRef}
              device={device}
              isActive={true}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              photo
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}>
          <Button onPress={onPressTakePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'white',
              }}
            />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TakePhotoScreen;
