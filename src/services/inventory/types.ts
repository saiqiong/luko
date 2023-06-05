export interface IInventory {
  id: string;
  name: string;
  price: number;
  description?: string;
  url: string;
}

export type TLocalStorageKeys = 'inventory';
