import { Text } from 'components/text';
import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { getLocalCurrency } from 'src/utils/currency';
import { SCREEN_WIDTH } from 'src/utils/platforms';
import { colors } from 'theme/colors';

const containerWidth = (SCREEN_WIDTH - 60) / 2;

interface ICard {
  containerStyle?: ViewStyle;
  name: string;
  imageUrl: string;
  price: number;
}

const Card: React.FC<ICard> = ({ name, imageUrl, price, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.info}>
          <Text size={19} color={colors.grey[900]} numberOfLines={2}>
            {name}
          </Text>
          <Text size={15} color={colors.grey[700]}>
            {getLocalCurrency(price)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: containerWidth,
    height: 265,
    borderRadius: 14,
    backgroundColor: colors.grey.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: colors.grey[900],
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 14,
  },
  image: {
    width: containerWidth,
    height: containerWidth,
  },
  info: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});

export default Card;
