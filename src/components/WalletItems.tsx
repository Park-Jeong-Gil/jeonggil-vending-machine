interface WalletItemsProps {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function WalletItems(money: WalletItemsProps) {
  return (
    <li>
      <button className={`wallet-item price-${money.price}won`}>
        <strong className="wallet-item-text">
          {money.name}
          <span className="wallet-item-stock"> X {money.stock}</span>
        </strong>
      </button>
    </li>
  );
}
