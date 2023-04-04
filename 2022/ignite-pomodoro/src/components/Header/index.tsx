import { NavLink } from 'react-router-dom'

import { Scroll, Timer } from 'phosphor-react'

import logo from '@assets/logo.svg'

import { HeaderContainer } from './styles'

function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={logo} alt="" />
      </span>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}

export default Header
