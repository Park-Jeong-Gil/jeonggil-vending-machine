import { Drink } from '@/types';
import { useRecoilValue } from 'recoil';
import {
  paymentModeState,
  insertedAmountState,
  isProcessingState,
} from '@/recoil/atoms';

interface DrinkItemsProps extends Drink {
  handleDrinkSelection: (drink: Drink) => void;
}

export default function DrinkItems({
  id,
  name,
  price,
  stock,
  handleDrinkSelection,
}: DrinkItemsProps) {
  // 전역 상태 구독
  const paymentMode = useRecoilValue(paymentModeState);
  const insertedAmount = useRecoilValue(insertedAmountState);
  const isProcessing = useRecoilValue(isProcessingState);

  // 음료 버튼 비활성화 조건
  const isOutOfStock = stock === 0;
  const isWaiting = paymentMode === 'WAITING';
  const isNotEnoughMoney = paymentMode === 'CASH' && price > insertedAmount;

  const isDisabled =
    isProcessing || isOutOfStock || isWaiting || isNotEnoughMoney;

  // 음료 버튼 활성화 조건
  const canBuyWithCard = paymentMode === 'CARD' && !isOutOfStock;
  const canBuyWithCash =
    paymentMode === 'CASH' && price <= insertedAmount && !isOutOfStock;
  const isActive = !isWaiting && (canBuyWithCard || canBuyWithCash);

  // 음료 선택
  const drinkSelected = () => {
    handleDrinkSelection({ id, name, price, stock });
  };

  return (
    <li className={`drink-content ${name}`}>
      <span className="drink-price">{price.toLocaleString()}원</span>
      <button
        className={`drink-button drink-name ${isActive ? 'active' : ''}`}
        onClick={drinkSelected}
        disabled={isDisabled}>
        <span className="drink-name">{isOutOfStock ? '품절' : name}</span>
      </button>
    </li>
  );
}
