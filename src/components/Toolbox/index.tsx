import {
  CenterFocusStrong,
  IosShare,
  Redo,
  SystemUpdateAlt,
  Undo
} from '@mui/icons-material'
import { Grid, List, Paper, ThemeProvider, useTheme } from '@mui/material'
import { useDialogState } from '@src/hooks/use-dialog-state'
import { selectHasRedo, selectHasUndo } from '@src/layouts/editor/editorSlice'
import { useAppSelector } from '@src/store/hooks'
import { darkTheme } from '@src/theme'

import { ImportExport } from './ImportExport'
import { ToolboxItem } from './ToolboxItem'

interface Props {
  disabled?: boolean
  onUndo: () => void
  onRedo: () => void
  onResetZoom: () => void
}

export function Toolbox({ disabled, onRedo, onUndo, onResetZoom }: Props) {
  const hasUndo = useAppSelector(selectHasUndo)
  const hasRedo = useAppSelector(selectHasRedo)
  const [isOpenExportDialog, onOpenExportDialog, onCloseExportDialog] =
    useDialogState(false)
  const [isOpenImportDialog, onOpenImportDialog, onCloseImportDialog] =
    useDialogState(false)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Grid
          sx={{
            opacity: disabled ? 0.3 : 1,
            transition: '0.4s opacity ease',
            position: 'absolute',
            zIndex: 'fab',
            top: theme => theme.spacing(6),
            left: 0,
            margin: 2
          }}
        >
          <Paper>
            <nav aria-label="toolbox">
              <List
                sx={{
                  maxWidth: theme => theme.spacing(7),
                  overflow: 'hidden',
                  pointerEvents: disabled ? 'none' : 'auto',
                  ':hover': {
                    maxWidth: 'unset'
                  }
                }}
              >
                <ToolboxItem
                  disabled={!hasUndo || disabled}
                  onClick={onUndo}
                  shortcut="ctrl + z"
                  Icon={<Undo />}
                  text="Undo"
                />
                <ToolboxItem
                  disabled={!hasRedo || disabled}
                  onClick={onRedo}
                  shortcut="ctrl + y"
                  Icon={<Redo />}
                  text="Redo"
                />
                <ToolboxItem
                  disabled={disabled}
                  onClick={onOpenExportDialog}
                  shortcut="ctrl + s"
                  Icon={<IosShare />}
                  text="Export"
                />
                <ToolboxItem
                  disabled={disabled}
                  onClick={onOpenImportDialog}
                  shortcut="ctrl + o"
                  Icon={<SystemUpdateAlt />}
                  text="Import"
                />
                <ToolboxItem
                  disabled={disabled}
                  onClick={onResetZoom}
                  shortcut="ctrl + 0"
                  Icon={<CenterFocusStrong />}
                  text="Reset Zoom"
                />
              </List>
            </nav>
          </Paper>
        </Grid>
      </ThemeProvider>

      <ImportExport
        isOpenExportDialog={isOpenExportDialog}
        onCloseExportDialog={onCloseExportDialog}
        isOpenImportDialog={isOpenImportDialog}
        onCloseImportDialog={onCloseImportDialog}
      />
    </>
  )
}
