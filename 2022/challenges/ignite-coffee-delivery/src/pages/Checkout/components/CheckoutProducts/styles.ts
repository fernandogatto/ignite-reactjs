import styled from 'styled-components';

export const CheckoutProductsContainer = styled.div`
  h2 {
    font-size: 1.125rem;
    margin-bottom: 0.938rem;
  }

  .products-card {
    background-color: ${(props) => props.theme['gray-100']};
    padding: 2.5rem;
    border-radius: 6px 44px;
  }
`
