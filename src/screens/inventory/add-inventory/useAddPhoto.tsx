import { useActionSheet } from '@expo/react-native-action-sheet';
import { useState } from 'react';
import { pickImage, takePhoto } from 'src/sdk/ImagePicker';

const useAddPhoto = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [photoUri, setPhotoUri] = useState('');

  const OPTIONS_BOTTOM_SHEEET = ['Take a photo', 'Photo library', 'Cancel'];

  const onSelection = async (buttonIndex: number) => {
    if (
      buttonIndex === OPTIONS_INDEX.TAKE_PHOTO ||
      buttonIndex === OPTIONS_INDEX.CHOOSE_FROM_PHOTO_LIBRARY
    ) {
      const photo =
        buttonIndex === OPTIONS_INDEX.TAKE_PHOTO
          ? await takePhoto()
          : await pickImage();
      const uri = photo?.assets && photo?.assets[0].uri;
      if (uri) {
        setPhotoUri(uri);
      }
    }
  };

  const showAddPhotoOptions = () => {
    showActionSheetWithOptions(
      {
        options: OPTIONS_BOTTOM_SHEEET,
        cancelButtonIndex: Object.values(OPTIONS_INDEX).findIndex(
          o => o === 'CANCEL',
        ),
      },
      buttonIndex => {
        if (buttonIndex !== undefined) {
          onSelection(buttonIndex);
        }
      },
    );
  };

  return { showAddPhotoOptions, photoUri, setPhotoUri };
};

enum OPTIONS_INDEX {
  TAKE_PHOTO,
  CHOOSE_FROM_PHOTO_LIBRARY,
  CANCEL,
}

export { useAddPhoto };
