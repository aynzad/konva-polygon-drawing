import { CenterFocusStrong, Redo, Undo } from '@mui/icons-material'
import { Fade, Grid, List, Paper, ThemeProvider, useTheme } from '@mui/material'
import { selectHasRedo, selectHasUndo } from '@src/editor/editorSlice'
import { useAppSelector } from '@src/store/hooks'
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
            margin: theme.spacing(2),
            height: '100%'
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
                  disabled={!hasUndo}
                  onClick={onUndo}
                  tooltip="cmd/ctrl + Z"
                  Icon={<Undo />}
                  text="Undo"
                />
                <ToolboxItem
                  disabled={!hasRedo}
                  onClick={onRedo}
                  tooltip="cmd/ctrl + Y"
                  Icon={<Redo />}
                  text="Redo"
                />
                <ToolboxItem
                  onClick={onResetZoom}
                  tooltip="cmd/ctrl + 0"
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
