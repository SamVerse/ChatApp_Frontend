import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { store } from './store/store'
import Chat from './components/Chat'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
    background: {
      default: '#000000', // Change this to black
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000', // Changed background color to match theme
        },
      },
    },
  },
})


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Chat />
      </ThemeProvider>
    </Provider>
  )
}

export default App