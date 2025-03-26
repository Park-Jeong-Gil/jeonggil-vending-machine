interface DrinkItemsProps {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function DrinkItems(drinks: DrinkItemsProps) {
  return (
    <li className={`drink-content ${drinks.name}`}>
      <span className="drink-price">{drinks.price}원</span>
      <button className={`drink-button drink-name ${drinks.name}`}>
        <span>{drinks.name}</span>
      </button>
    </li>
  );
}
