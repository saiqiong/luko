import AsyncStorage from '@react-native-async-storage/async-storage';
import { IInventory } from './types';

const MAX_TOTAL_PRICE = 40000;

const getInventoryList = async () => {
  const list = await AsyncStorage.getItem('inventory');
  return list ? (JSON.parse(list) as IInventory[]) : [];
};

const addInventory = async (inventory: Omit<IInventory, 'id'>) => {
  const list = await getInventoryList();
  const totalAmount = list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0,
  );
  if (totalAmount > MAX_TOTAL_PRICE) {
    throw new Error('Total amount can be by pass 40000 euros');
  }
  const updateList = [{ ...inventory, id: `${list.length + 1}` }, ...list];
  await AsyncStorage.setItem('inventory', JSON.stringify(updateList));
};

export const inventoryService = { getInventoryList, addInventory };
