import * as Localization from 'expo-localization';
import { isIos } from './platforms';

interface ICurrencyOption {
  currency?: string;
  maximumFractionDigits?: number;
}

export const getLocalCurrency = (
  amount: number,
  { currency = 'EUR', maximumFractionDigits = 0 }: ICurrencyOption = {},
) => {
  if (isIos) {
    return new Intl.NumberFormat(Localization.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits,
    }).format(amount);
  }
  //TODO make a proper solution for android
  return `€${amount.toFixed(maximumFractionDigits)}`;
};
