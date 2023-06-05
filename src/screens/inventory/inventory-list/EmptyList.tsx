import Empty from 'assets/svg/empty-inventory.svg';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components/text';
import { colors } from 'src/theme/colors';

export const EmptyList: React.FC = () => {
  return (
    <View style={styles.root}>
      <Empty width={160} height={160} />

      <Text size={17} color={colors.grey[600]} align="center">
        There is no inventory yet.
      </Text>
      <View style={styles.subText}>
        <Text size={15} align="center" color={colors.grey[500]}>
          You can add up to total value of 4000 euro inventory, give it a try!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginTop: 60,
    paddingVertical: 32,
    backgroundColor: colors.grey.white,
  },
  subText: {
    paddingTop: 8,
  },
});
