import * as ExpoImagePicker from 'expo-image-picker';
import * as IntentLauncher from 'expo-intent-launcher';
import { Alert, Linking } from 'react-native';
import { isIos } from 'src/utils/platforms';

export const takePhoto: () => Promise<
  ExpoImagePicker.ImagePickerResult | undefined
> = async () => {
  const { granted } = await ExpoImagePicker.requestCameraPermissionsAsync();
  // not supported on iOS simulator, you can use MediaLibrary with pickImage method instead
  if (granted) {
    const pickerResult = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return pickerResult;
  }
  Alert.alert(
    'Luko needs to access your camera',
    'Please allow access to your camera in your phone settings to be able to add inventory',
    [
      {
        text: 'Cancel',
      },
      {
        text: 'Go to settings',
        onPress: openAppSettings,
        style: 'cancel',
      },
    ],
  );

  return undefined;
};

export const pickImage: () => Promise<
  ExpoImagePicker.ImagePickerResult | undefined
> = async () => {
  const { granted } =
    await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

  if (granted) {
    const pickerResult = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return pickerResult;
  }
  Alert.alert(
    'Luko needs to access your photo library',
    'Please allow access to your photo library in your phone settings to be able to add inventory',
    [
      {
        text: 'Cancel',
      },
      {
        text: 'Go to settings',
        onPress: openAppSettings,
        style: 'cancel',
      },
    ],
  );
  return undefined;
};

const openAppSettings = () => {
  if (isIos) {
    Linking.openURL('app-settings:');
  } else {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.USAGE_ACCESS_SETTINGS,
      {
        data: 'package:host.exp.exponent',
      },
    );
  }
};

export const ImagePicker = {
  takePhoto,
  pickImage,
};
