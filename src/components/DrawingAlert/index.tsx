import { Alert, Chip } from '@mui/material'

export function DrawingAlert() {
  return (
    <Alert
      sx={{
        position: 'absolute',
        top: theme => theme.spacing(8),
        right: theme => theme.spacing(2),
        zIndex: 'drawer',
        userSelect: 'none',
        '&:hover': {
          opacity: 0.1
        }
      }}
      severity="info"
    >
      Your'e drawing a polygon, press
      <Chip
        size="small"
        sx={{
          borderRadius: 1,
          bgcolor: 'text.secondary',
          color: 'white',
          mx: 1
        }}
        label="esc"
      />
      to cancel
    </Alert>
  )
}
