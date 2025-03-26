import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  walletState,
  walletTotalAmountState,
  paymentModeState,
  insertedAmountState,
} from '@/recoil/atoms';
import { Money } from '@/types';
import moneyData from '@/db/money.json';
import WalletItems from './WalletItems';

import '@/style/components/Wallet.scss';

export default function Wallet() {
  // Recoil 상태 관리
  // 현금 목록, 지갑 총액, 결제 모드, 자판기 투입 금액
  const [wallet, setWallet] = useRecoilState(walletState);
  const [walletTotalAmount, setWalletTotalAmount] = useRecoilState(
    walletTotalAmountState,
  );
  const [paymentMode, setPaymentMode] = useRecoilState(paymentModeState);
  const [, setInsertedAmount] = useRecoilState(insertedAmountState);

  //지갑의 총액을 계산하고 상태를 업데이트
  const calculateWalletAmount = (money: Money[]) => {
    const total = money.reduce((sum, item) => sum + item.price * item.stock, 0);
    setWalletTotalAmount(total);
  };

  // 카드 선택 시
  const handleCardSelection = () => {
    if (paymentMode !== 'WAITING') return; // 대기 상태가 아니면 선택 불가
    setPaymentMode('CARD'); // 카드 결제 모드로 전환
  };

  // 현금 선택 시
  const handleMoneySelection = (money: Money) => {
    if (money.stock === 0) return; // 재고가 없는 경우 선택 불가
    if (paymentMode !== 'WAITING' && paymentMode !== 'CASH') return; // 대기, 현금 결제가 아니면 선택 불가

    setPaymentMode('CASH'); // 현금 결제 모드로 전환
    setInsertedAmount((prev) => prev + money.price); // 자판기에 현금 투입
    setWalletTotalAmount((prev) => prev - money.price); // 지갑 총액에서 차감

    // 현금 수량 수정
    setWallet((prev) =>
      prev.map((m) => (m.id === money.id ? { ...m, stock: m.stock - 1 } : m)),
    );
  };

  useEffect(() => {
    setWallet(moneyData);
    calculateWalletAmount(moneyData);
  }, []);

  return (
    <section className="wallet-container">
      <div className="wallet-header">
        <h2>My Wallet</h2>
        <strong>total: {walletTotalAmount.toLocaleString()}원</strong>
      </div>

      <ul className="wallet-content">
        {/* 신용카드 버튼 */}
        <li>
          <button
            className="wallet-item credit-card"
            onClick={handleCardSelection}
            disabled={paymentMode !== 'WAITING'}>
            <strong className="wallet-item-text">
              <span>Credit card</span>
            </strong>
          </button>
        </li>

        {/* 현금 목록 */}
        {wallet.map((money) => (
          <WalletItems
            key={money.id}
            {...money}
            onSelect={() => handleMoneySelection(money)}
            disabled={
              money.stock === 0 || // 재고가 없거나
              (paymentMode !== 'WAITING' && paymentMode !== 'CASH') // 적절한 결제 모드가 아닐 때 비활성화
            }
          />
        ))}
      </ul>
    </section>
  );
}
