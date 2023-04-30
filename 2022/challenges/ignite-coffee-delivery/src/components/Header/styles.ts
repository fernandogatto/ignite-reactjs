import styled from 'styled-components';

export const HeaderContainer = styled.div`
  padding: 2rem 0.938rem;
  max-width: 1200px;
  width: 100%;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 10px;

    #pin-container {
      background-color: ${(props) => props.theme['purple-300']};
      padding: 0.625rem;
      border-radius: 6px;
      color: ${(props) => props.theme['purple-700']};

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: ${(props) => props.theme['purple-700']};
      }
    }

    a {
      background-color: ${(props) => props.theme['yellow-300']};
      padding: 0.625rem;
      border-radius: 6px;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: .3s ease all;

      &:hover {
        background-color: ${(props) => props.theme['yellow-500']};
      }

      svg {
        color: ${(props) => props.theme['yellow-700']};
      }
    }
  }
`
