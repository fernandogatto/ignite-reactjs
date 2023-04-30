import { NavLink } from 'react-router-dom'

import { MapPin, ShoppingCart } from 'phosphor-react'

import logo from '@assets/logo.svg'

import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <NavLink to="/" title="Home">
        <img src={logo} alt="Logo" />
      </NavLink>

      <div>
        <nav>
          <div id="pin-container">
            <MapPin size={22} weight="fill" />

            <p>Porto Alegre</p>
          </div>

          <NavLink to="/checkout" title="Carrinho">
            <ShoppingCart size={22} weight="fill" />
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
