import { useState, useEffect } from 'react';
import money from '@/db/money.json';
import WalletItems from './WalletItems';

import '@/style/components/Wallet.scss';

export default function Wallet() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = money.reduce((acc, money) => acc + money.price, 0);
    setTotal(total);
  }, []);

  return (
    <section className="wallet-container">
      <div className="wallet-header">
        <h2>My Wallet</h2>
        <strong>total: {total}원</strong>
      </div>
      <ul className="wallet-content">
        <li>
          <button className="wallet-item credit-card">
            <strong className="wallet-item-text">
              <span>credit card</span>
            </strong>
          </button>
        </li>
        {money.map((money) => (
          <WalletItems
            key={money.id}
            {...money}
          />
        ))}
      </ul>
    </section>
  );
}
