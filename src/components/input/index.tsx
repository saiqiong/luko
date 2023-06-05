import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from 'src/theme/colors';
import { fonts } from 'src/theme/fonts';
import { formatNumberString } from 'src/utils/number';
import { Text } from '../text';

interface IInput
  extends Pick<
    TextInputProps,
    'value' | 'keyboardType' | 'placeholder' | 'multiline'
  > {
  value: string;
  label?: string;
  onChangeValue: (value: string) => void;
  contentRight?: string;
  type?: 'text' | 'number';
  containerStyle?: ViewStyle;
}

const Input: React.FC<IInput> = ({
  value,
  label,
  placeholder,
  onChangeValue,
  contentRight,
  multiline = false,
  type = 'text',
  containerStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnTextChange = (text: string) => {
    if (type === 'number') {
      const formated = formatNumberString(text);
      onChangeValue(formated);
    } else {
      onChangeValue(text);
    }
  };

  return (
    <View style={containerStyle}>
      {label && (
        <View style={styles.label}>
          <Text size={13} color={colors.grey[900]}>
            {label}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          multiline ? { height: 128, flexDirection: 'column' } : {},
          isFocused && styles.focused,
        ]}>
        <TextInput
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.grey[300]}
          keyboardType={type === 'text' ? 'default' : 'numeric'}
          style={{ ...styles.input, width: contentRight ? '80%' : '100%' }}
          onChangeText={handleOnTextChange}
          {...(multiline ? { multiline: true } : {})}
        />
        {contentRight && (
          <View style={styles.contentRight}>
            <Text size={17} color={colors.grey[700]}>
              {contentRight}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: fonts.regular,
    color: colors.grey[900],
    flexGrow: 1,
    alignSelf: 'flex-start',
    textAlignVertical: 'top',
  },
  container: {
    backgroundColor: colors.grey.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.grey[100],
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    shadowRadius: 0,
  },
  focused: {
    borderColor: colors.blue.main,
    shadowColor: colors.blue.main,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 4,
  },
  label: {
    paddingBottom: 5,
  },
  contentRight: {
    paddingLeft: 5,
  },
});

export { Input };
