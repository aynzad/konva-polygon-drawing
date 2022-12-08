import { CenterFocusStrong, Redo, Undo } from '@mui/icons-material'
import { Fade, Grid, List, Paper, ThemeProvider, useTheme } from '@mui/material'
import { useAppSelector } from '@src/store/hooks'
import { selectHasRedo, selectHasUndo } from '@src/tabs/editor/editorSlice'
import { darkTheme } from '@src/theme'

import { ToolboxItem } from './ToolboxItem'

interface Props {
  hidden?: boolean
  onUndo: () => void
  onRedo: () => void
  onResetZoom: () => void
}

export function Toolbox({ hidden, onRedo, onUndo, onResetZoom }: Props) {
  const theme = useTheme()
  const hasUndo = useAppSelector(selectHasUndo)
  const hasRedo = useAppSelector(selectHasRedo)

  return (
    <ThemeProvider theme={darkTheme}>
      <Fade in={!hidden}>
        <Grid
          sx={{
            position: 'absolute',
            zIndex: theme.zIndex.fab,
            top: theme.spacing(6),
            left: 0,
            margin: theme.spacing(2)
          }}
        >
          <Paper>
            <nav aria-label="toolbox">
              <List
                sx={{
                  maxWidth: theme.spacing(7),
                  ':hover': {
                    maxWidth: 'unset'
                  }
                }}
              >
                <ToolboxItem
                  disabled={!hasUndo || hidden}
                  onClick={onUndo}
                  shortcut="ctrl + z"
                  Icon={<Undo />}
                  text="Undo"
                />
                <ToolboxItem
                  disabled={!hasRedo || hidden}
                  onClick={onRedo}
                  shortcut="ctrl + y"
                  Icon={<Redo />}
                  text="Redo"
                />
                <ToolboxItem
                  disabled={hidden}
                  onClick={onResetZoom}
                  shortcut="ctrl + 0"
                  Icon={<CenterFocusStrong />}
                  text="Reset Zoom"
                />
              </List>
            </nav>
          </Paper>
        </Grid>
      </Fade>
    </ThemeProvider>
  )
}
