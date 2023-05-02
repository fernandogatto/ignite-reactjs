import { CheckoutForm, CheckoutProducts } from './components'

import { CheckoutContainer } from './styles'

export function Checkout() {
  return (
    <CheckoutContainer>
      <CheckoutForm />

      <CheckoutProducts />
    </CheckoutContainer>
  )
}
