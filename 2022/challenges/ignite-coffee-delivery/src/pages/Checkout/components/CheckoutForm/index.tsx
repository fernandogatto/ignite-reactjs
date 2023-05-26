import { useForm, useFormContext, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';

import { CurrencyDollar, MapPinLine } from 'phosphor-react';

import { defaultTheme } from '@styles/themes/default';

import { CheckoutFormContainer } from './styles';

interface IFormInput {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export function CheckoutForm() {
  const { register, control, setValue } = useFormContext()

  function checkCep(event: any) {
    const cep = event.target.value.replace(/\D/g, '')

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json()).then((data) => {
      console.log(data)

      setValue('street', data.logradouro)
      setValue('neighborhood', data.logradouro)
      setValue('city', data.localidade)
      setValue('state', data.uf)
    })
  }

  return (
    <CheckoutFormContainer>
      <h2>Complete seu pedido</h2>

      <div className="form-card">
        <div className="message-container">
          <MapPinLine size={22} color={defaultTheme['yellow-700']} />

          <div>
            <p className="title">Endereço de Entrega</p>

            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </div>

        <div className="form-row">
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, ref } }) => (
              <InputMask
                placeholder="CEP"
                mask="99.999-999"
                onBlur={checkCep}
                onChange={onChange}
                inputRef={ref}
              />
            )}
          />
        </div>

        <div className="form-row">
          <input
            {...register("street")}
            placeholder="Rua"
            id="street"
          />
        </div>

        <div className="form-row">
          <input
            {...register("number")}
            placeholder="Número"
            id="number"
          />
          <input
            {...register("complement")}
            placeholder="Complemento"
            id="complement"
          />
        </div>

        <div className="form-row">
          <input
            {...register("neighborhood")}
            placeholder="Bairro"
            id="neighborhood"
          />
          <input
            {...register("city")}
            placeholder="Cidade"
            id="city"
          />
          <input
            {...register("state")}
            placeholder="Estado"
            id="state"
          />
        </div>
      </div>

      <div className="form-card">
        <div className="message-container">
          <CurrencyDollar  size={22} color={defaultTheme['purple-500']} />

          <div>
            <p className="title">Pagamento</p>

            <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </div>
      </div>
    </CheckoutFormContainer>
  )
}
