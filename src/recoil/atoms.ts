import { atom } from 'recoil';
import { Money, Drink, PaymentMode } from '@/types';

export const walletState = atom<Money[]>({
  key: 'walletState',
  default: [],
});

export const walletTotalAmountState = atom<number>({
  key: 'walletTotalAmountState',
  default: 0,
});

export const insertedAmountState = atom<number>({
  key: 'insertedAmountState',
  default: 0,
});

export const paymentModeState = atom<PaymentMode>({
  key: 'paymentModeState',
  default: 'WAITING',
});

export const drinksState = atom<Drink[]>({
  key: 'drinksState',
  default: [],
});

export const selectedState = atom<Drink | null>({
  key: 'selectedState',
  default: null,
});

export const isProcessingState = atom<boolean>({
  key: 'isProcessingState',
  default: false,
});
