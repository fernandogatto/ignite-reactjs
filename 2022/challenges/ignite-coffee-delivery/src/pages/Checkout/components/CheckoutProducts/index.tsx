import { CheckoutCoffeeItem } from '@components';

import { CheckoutProductsContainer } from './styles';
import { useCart } from '@contexts/CartContext';

export function CheckoutProducts() {
  const { products } = useCart()

  return (
    <CheckoutProductsContainer>
      <h2>Cafés selecionados</h2>

      <div className="products-card">
        {products.length > 0 && products.map((item) => (
          <CheckoutCoffeeItem
            key={item.id}
            data={item}
          />
        ))}

        {products.length === 0 && (
          <p>Nenhum item foi selecionado</p>
        )}
      </div>
    </CheckoutProductsContainer>
  )
}
