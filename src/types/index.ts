// 지갑의 화폐 타입
export interface Money {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// 음료 타입
export interface Drink {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// 결제 모드 타입
export type PaymentMode =
  | 'WAITING'
  | 'CASH'
  | 'CARD'
  | 'DISPENSING'
  | 'COMPLETED';

// 결제 상태 메시지
export const PAYMENT_STATUS = {
  WAITING: '판매 대기중...',
  CASH: '현금 결제',
  CARD: '카드 결제',
  DISPENSING: '배출 중...',
  COMPLETED: '음료를 꺼내 주세요.',
} as const;
