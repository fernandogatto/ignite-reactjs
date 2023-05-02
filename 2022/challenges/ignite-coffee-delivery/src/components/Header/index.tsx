import { NavLink } from 'react-router-dom'

import { MapPin, ShoppingCart } from 'phosphor-react'

import { useCart } from '@contexts/CartContext'

import logo from '@assets/logo.svg'

import { HeaderContainer } from './styles'

export function Header() {
  const { quantityInCart } = useCart()

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

            <div className="notification">
              <span>{quantityInCart}</span>
            </div>
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
