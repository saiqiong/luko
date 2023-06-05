import React from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from 'src/theme/colors';
import { TFontStyle } from 'src/theme/fonts';
import { capitalizeFirstLetter } from 'src/utils/string';
import { Text } from '../text';

interface ITextButton {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  fontStyle?: TFontStyle;
}

const TextButton: React.FC<ITextButton> = ({
  text,
  onPress,
  disabled = false,
  color = colors.blue.main,
  fontStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text
        size={17}
        fontStyle={fontStyle}
        numberOfLines={1}
        color={disabled ? colors.grey[400] : color}>
        {capitalizeFirstLetter(text)}
      </Text>
    </TouchableOpacity>
  );
};

export { TextButton };
