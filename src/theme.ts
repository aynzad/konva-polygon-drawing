import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default lightTheme
