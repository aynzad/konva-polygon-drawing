import { ReactNode } from 'react'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useComboShortcut } from '@src/hooks/use-combo-shortcut'

interface Props {
  text: string
  shortcut: string
  Icon: ReactNode
  disabled?: boolean
  onClick: () => void
}
export function ToolboxItem({
  onClick,
  disabled,
  shortcut,
  Icon,
  text
}: Props) {
  useComboShortcut(shortcut, onClick, disabled)

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick} disabled={disabled} title={shortcut}>
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText sx={{ whiteSpace: 'nowrap' }} primary={text} />
      </ListItemButton>
    </ListItem>
  )
}
