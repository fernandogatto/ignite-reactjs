import { useForm, FormProvider } from 'react-hook-form';

import { useCart } from '@contexts/CartContext';

import { CheckoutForm, CheckoutProducts } from './components'

import { CheckoutContainer } from './styles'

interface IFormInput {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  typePayment: string
}

export function Checkout() {
  const newForm = useForm<IFormInput>({
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      typePayment: '',
    }
  })

  const { handleSubmit, reset } = newForm

  const { setTypePaymentValue } = useCart()

  function onSubmit(data: any) {
    console.log(data);

    reset()
    setTypePaymentValue("")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...newForm}>
        <CheckoutContainer>
          <CheckoutForm />

          <CheckoutProducts />
        </CheckoutContainer>
      </FormProvider>
    </form>
  )
}
