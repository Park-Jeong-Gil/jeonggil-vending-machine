import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  drinksState,
  insertedAmountState,
  paymentModeState,
  selectedState,
  isProcessingState,
  walletState,
  walletTotalAmountState,
} from '@/recoil/atoms';
import { PAYMENT_STATUS, Drink } from '@/types';
import drinksData from '@/db/drinks.json';
import DrinkItems from './DrinkItems';

import '@/style/components/VendingMachine.scss';

// 음료 배출 애니메이션 시간
const DISPENSING_DURATION = 2000;

export default function VendingMachine() {
  // Recoil 상태 관리
  const [drinks, setDrinks] = useRecoilState(drinksState);
  const [insertedAmount, setInsertedAmount] =
    useRecoilState(insertedAmountState);
  const [paymentMode, setPaymentMode] = useRecoilState(paymentModeState);
  const [selectedDrink, setSelectedDrink] = useRecoilState(selectedState);
  const [isProcessing, setIsProcessing] = useRecoilState(isProcessingState);
  const [, setWallet] = useRecoilState(walletState);
  const [, setWalletTotalAmount] = useRecoilState(walletTotalAmountState);

  // 초기 음료 데이터 로드
  useEffect(() => {
    setDrinks(drinksData);
  }, []);

  // 음료 선택 처리
  const handleDrinkSelection = (drink: Drink) => {
    // 구매 불가 조건 체크
    if (isProcessing) return;
    if (drink.stock === 0) return;
    if (paymentMode === 'CASH' && drink.price > insertedAmount) return;

    // 상태 업데이트
    setSelectedDrink(drink);
    setIsProcessing(true);

    // 재고 감소
    setDrinks((prev) =>
      prev.map((d) => (d.id === drink.id ? { ...d, stock: d.stock - 1 } : d)),
    );

    // 현금 결제 시 금액 차감
    if (paymentMode === 'CASH') {
      setInsertedAmount((prev) => prev - drink.price);
    }

    // 배출 애니메이션 시작
    setPaymentMode('DISPENSING');

    // 배출 완료 상태로 전환
    setTimeout(() => {
      setPaymentMode('COMPLETED');
    }, DISPENSING_DURATION); // 2초
  };

  // 거스름돈 반환 처리
  const handleReturnChange = () => {
    if (insertedAmount > 0) {
      // 거스름돈을 100원 단위로 반환
      const change = Math.floor(insertedAmount / 100);

      // 지갑의 100원 동전 수량 증가
      setWallet((prev) =>
        prev.map((money) =>
          money.price === 100
            ? { ...money, stock: money.stock + change }
            : money,
        ),
      );

      // 지갑 총액에 거스름돈 추가
      setWalletTotalAmount((prev) => prev + change * 100);

      // 자판기 상태 초기화
      setInsertedAmount(0);
      setPaymentMode('WAITING');
    }
  };

  // 음료 수령 처리
  const handleDrinkPickup = () => {
    if (paymentMode === 'COMPLETED') {
      // 선택된 음료 초기화
      setSelectedDrink(null);
      setIsProcessing(false);

      // 잔액에 따른 상태 전환
      if (insertedAmount === 0) {
        setPaymentMode('WAITING');
      } else {
        setPaymentMode('CASH');
      }
    }
  };

  return (
    <section className="vending-machine-container">
      <h2 className="blind">Vending Machine</h2>
      <div className="vending-machine-body">
        {/* 음료 목록 */}
        <ul className="drinks-list">
          {drinks.map((drink) => (
            <DrinkItems
              key={drink.id}
              {...drink}
              handleDrinkSelection={handleDrinkSelection}
            />
          ))}
        </ul>

        {/* 디스플레이 화면 */}
        <p className="digital-screen">
          <span className="payment-status">{PAYMENT_STATUS[paymentMode]}</span>
          {paymentMode === 'CASH' && (
            <span className="inserted-cash">
              현재 금액 {insertedAmount.toLocaleString()}원
            </span>
          )}
        </p>

        {/* 거스름돈 반환 버튼 */}
        <button
          className="exchange-btn"
          onClick={handleReturnChange}
          disabled={paymentMode !== 'CASH' || insertedAmount === 0}
          aria-label="거스름돈 반환"
        />

        {/* 음료 배출구 */}
        <p className="out-container">
          {selectedDrink &&
            (paymentMode === 'DISPENSING' || paymentMode === 'COMPLETED') && (
              <button
                className={`discharge-item ${selectedDrink.name} ${paymentMode.toLowerCase()}`}
                onClick={handleDrinkPickup}
                aria-label={`${selectedDrink.name} 수령하기`}
              />
            )}
        </p>
      </div>
    </section>
  );
}
