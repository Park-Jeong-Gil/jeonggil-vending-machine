import { Money } from '@/types';

interface WalletItemsProps extends Money {
  onSelect: () => void;
  disabled: boolean;
}

export default function WalletItems({
  price,
  stock,
  onSelect,
  disabled,
}: WalletItemsProps) {
  return (
    <li>
      <button
        className={`wallet-item price-${price}won`}
        onClick={onSelect}
        disabled={disabled}>
        <strong className="wallet-item-text">
          <span>{price.toLocaleString()}원</span>
          <span className="stock"> X {stock}</span>
        </strong>
      </button>
    </li>
  );
}
