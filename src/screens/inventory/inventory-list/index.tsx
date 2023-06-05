import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { RootTabScreenProps } from 'navigation/types';
import { useCallback, useState } from 'react';
import Animated, { Layout } from 'react-native-reanimated';
import Card from 'src/components/card';
import { Title } from 'src/components/text';
import { useAsync } from 'src/hooks/useAsync';
import { inventoryService } from 'src/services/inventory';
import { IInventory } from 'src/services/inventory/types';
import { colors } from 'src/theme/colors';
import { AddButton } from './AddButton';
import { EmptyList } from './EmptyList';

export default function InventoryScreen({
  navigation,
  route,
}: RootTabScreenProps<'Inventory'>) {
  const handleAddButtonPress = () => navigation.navigate('AddItem');
  const { data, run, isLoading } = useAsync<IInventory[]>();
  const [showAddText, setShowAddText] = useState(true);

  const getList = () => {
    run(inventoryService.getInventoryList());
  };

  useFocusEffect(
    useCallback(() => {
      getList();
    }, []),
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const listScrollingY = event.nativeEvent.contentOffset.y;

    if (listScrollingY > 100) {
      setShowAddText(false);
    } else {
      setShowAddText(true);
    }
  };

  if (!data) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <AddButton onPress={handleAddButtonPress} showText={showAddText} />
      <Animated.FlatList
        data={data}
        ListEmptyComponent={<EmptyList />}
        onRefresh={getList}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        refreshing={isLoading}
        onScroll={handleScroll}
        contentContainerStyle={
          data.length ? styles.content : styles.emptyConntent
        }
        ListHeaderComponent={<Title>{route.name}</Title>}
        ListHeaderComponentStyle={styles.title}
        layout={Layout}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            name={(item as IInventory).name}
            imageUrl={(item as IInventory).url}
            price={(item as IInventory).price}
            containerStyle={styles.itemStyle}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.grey.background,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  emptyConntent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  content: {
    paddingBottom: 20,
  },
  itemStyle: {
    marginTop: 20,
  },
  title: {
    width: '100%',
    paddingTop: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 99,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
});
