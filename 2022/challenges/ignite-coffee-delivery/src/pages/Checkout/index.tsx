import { useForm, FormProvider } from 'react-hook-form';

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
    }
  })

  const { handleSubmit, reset } = newForm

  function onSubmit(data: any) {
    console.log(data);
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
