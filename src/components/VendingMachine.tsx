import drinks from '@/db/drinks.json';
import DrinkItems from './DrinkItems';

import '@/style/components/VendingMachine.scss';

function VendingMachine() {
  return (
    <section className="vending-machine-container">
      <h2 className="blind">Vending Machine</h2>
      <div className="vending-machine-body">
        <ul className="drink-menu-container">
          {drinks.map((drinks) => (
            <DrinkItems
              key={drinks.id}
              {...drinks}
            />
          ))}
        </ul>
        <div className="digital-screen">
          <span className="payment-status">대기중...</span>
          <span className="left-money"></span>
        </div>
        <button className="exchange-btn">
          <span className="blind">거스름돈 받기</span>
        </button>
        <div className="out-container">
          <span className="discharge-item"></span>
          <span className="cover"></span>
        </div>
      </div>
    </section>
  );
}

export default VendingMachine;
