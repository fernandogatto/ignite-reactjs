import { ThemeProvider } from 'styled-components'

import { defaultTheme } from '@styles/themes/default'

import AppProvider from '@hooks'

import Router from '@routes'

import { GlobalStyle } from '@styles/global'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppProvider>
        <Router />
      </AppProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
