import { ReactNode } from 'react'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

interface Props {
  text: string
  tooltip?: string
  Icon: ReactNode
  disabled?: boolean
  onClick?: () => void
}
export function ToolboxItem({ onClick, disabled, tooltip, Icon, text }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick} disabled={disabled} title={tooltip}>
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText sx={{ whiteSpace: 'nowrap' }} primary={text} />
      </ListItemButton>
    </ListItem>
  )
}
