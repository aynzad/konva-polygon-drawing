import { Typography } from '@mui/material'

export function Logo() {
  return (
    <Typography
      sx={{
        px: 2,
        fontWeight: 'bold',
        fontSize: {
          xs: '0.6rem',
          sm: '1rem',
          md: '1.25rem'
        }
      }}
      color="primary"
      variant="h6"
      component="h1"
    >
      🔹 Konva Polygon Drawing
    </Typography>
  )
}
