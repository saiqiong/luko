import { useNavigation } from '@react-navigation/core';
import { Camera, Trash } from 'components/icons';
import { Input } from 'components/input';
import { Text } from 'components/text';
import { TextButton } from 'components/text-button';
import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { useAsync } from 'src/hooks/useAsync';
import { inventoryService } from 'src/services/inventory';
import { colors } from 'theme/colors';
import { useAddPhoto } from './useAddPhoto';

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
);

export default function AddItemScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const { showAddPhotoOptions, photoUri, setPhotoUri } = useAddPhoto();
  const { run, isLoading, isSuccess } = useAsync();

  const itemIsReadyToAdd = name && price && photoUri;

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  const addInventory = () => {
    run(
      inventoryService.addInventory({
        name,
        description,
        price: Number(price),
        url: photoUri,
      }),
    );
  };

  const clearPhotoUri = () => {
    setPhotoUri('');
  };

  return (
    <AnimatedKeyboardAwareScrollView
      extraScrollHeight={50}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.content}>
        <>
          <View style={styles.buttonsContainer}>
            <TextButton text="cancel" onPress={() => navigation.goBack()} />
            <TextButton
              text="add"
              disabled={!itemIsReadyToAdd || isLoading}
              onPress={addInventory}
            />
          </View>
          <TouchableOpacity
            disabled={!!photoUri}
            style={[styles.circle, photoUri ? styles.photoWrapper : {}]}
            activeOpacity={0.4}
            onPress={showAddPhotoOptions}>
            {photoUri ? (
              <Animated.View entering={ZoomIn.duration(500)} exiting={ZoomOut}>
                <Image
                  source={{ uri: photoUri }}
                  style={styles.photo}
                  resizeMode="cover"
                />
                <TouchableOpacity style={styles.icon} onPress={clearPhotoUri}>
                  <Trash />
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <>
                <View style={styles.camera}>
                  <Camera />
                </View>
                <Text size={17} color={colors.grey.black}>
                  Add photo
                </Text>
              </>
            )}
          </TouchableOpacity>
          <Input
            label="Name"
            placeholder="Name"
            containerStyle={styles.inputContainer}
            value={name}
            onChangeValue={setName}
          />
          <Input
            label="Price"
            placeholder="Price"
            containerStyle={styles.inputContainer}
            value={price}
            onChangeValue={setPrice}
            type="number"
            contentRight="€"
          />
          <Input
            label="Description"
            placeholder="Description"
            containerStyle={styles.inputContainer}
            value={description}
            onChangeValue={setDescription}
            multiline
          />
        </>
      </TouchableWithoutFeedback>
    </AnimatedKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    // backgroundColor: colors.grey.background,
    paddingTop: 10,
    backgroundColor: 'red',
    // flex: 1,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingBottom: 26,
  },
  circle: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 75,
    borderColor: colors.grey[300],
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  photoWrapper: {
    borderRadius: 0,
    borderWidth: 0,
  },
  camera: {
    paddingBottom: 14,
  },
  inputContainer: {
    paddingTop: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  icon: {
    width: 32,
    height: 32,
    backgroundColor: colors.red.light,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
