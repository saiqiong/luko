import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'components/text';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';

import { colors } from 'theme/colors';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface IAddButton extends Pick<TouchableOpacityProps, 'onPress'> {
  showText?: boolean;
}

const AddButton: React.FC<IAddButton> = ({ onPress, showText }) => {
  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      style={styles.button}
      layout={Layout}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          color={colors.grey.white}
        />
      </View>
      {showText && (
        <View style={styles.addText}>
          <Text size={17} color={colors.grey.white} fontStyle="bold">
            Add
          </Text>
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    height: 48,
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.blue.main,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 99,
  },
  icon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    paddingRight: 16,
  },
});

export { AddButton };
