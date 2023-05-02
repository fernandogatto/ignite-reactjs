import styled from 'styled-components';

export const CheckoutFormContainer = styled.div`
  h2 {
    font-size: 1.125rem;
    margin-bottom: 0.938rem;
  }

  .form-card {
    background-color: ${(props) => props.theme['gray-100']};
    padding: 2.5rem;
    border-radius: 6px;

    & + .form-card {
      margin-top: 0.75rem;
    }
  }
`
