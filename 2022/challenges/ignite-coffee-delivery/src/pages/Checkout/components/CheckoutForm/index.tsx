import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import InputMask from 'react-input-mask';

import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from 'phosphor-react';

import { useCart } from '@contexts/CartContext';
import { defaultTheme } from '@styles/themes/default';

import { CheckoutFormContainer, CheckboxContainer } from './styles';

export function CheckoutForm() {
  const { register, control, setValue } = useFormContext()

  const { typePayment, setTypePaymentValue } = useCart()

  function checkCep(event: any) {
    const cep = event.target.value.replace(/\D/g, '')

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json()).then((data) => {
      setValue('street', data.logradouro)
      setValue('neighborhood', data.logradouro)
      setValue('city', data.localidade)
      setValue('state', data.uf)
    })
  }

  useEffect(() => {
    setValue('typePayment', typePayment)
  }, [typePayment])

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

        <div className="form-row">
          <CheckboxContainer
            onClick={() => setTypePaymentValue("credit")}
            active={typePayment === "credit"}
          >
            <CreditCard size={22} />
            <input
              type="checkbox"
              placeholder="Cartão de crédito"
              checked={typePayment === "credit"}
              name="credit"
              defaultChecked={typePayment === "credit"}
            />
            <label htmlFor="credit">Cartão de crédito</label>
          </CheckboxContainer>

          <CheckboxContainer
            onClick={() => setTypePaymentValue("debit")}
            active={typePayment === "debit"}
          >
            <Bank size={22} />
            <input
              type="checkbox"
              placeholder="Cartão de débito"
              checked={typePayment === "debit"}
              name="debit"
              defaultChecked={typePayment === "debit"}
            />
            <label htmlFor="debit">Cartão de débito</label>
          </CheckboxContainer>

          <CheckboxContainer
            onClick={() => setTypePaymentValue("money")}
            active={typePayment === "money"}
          >
            <Money size={22} />
            <input
              type="checkbox"
              placeholder="Dinheiro"
              checked={typePayment === "money"}
              name="money"
              defaultChecked={typePayment === "money"}
            />
            <label htmlFor="money">Dinheiro</label>
          </CheckboxContainer>
        </div>
      </div>
    </CheckoutFormContainer>
  )
}
