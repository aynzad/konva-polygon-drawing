import { useEffectOnce } from 'react-use'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useDialogState } from '@src/hooks/use-dialog-state'
import { useAppDispatch } from '@src/store/hooks'
import { hasPersistedData, removePersistedData } from '@src/store/persist'
import { sagaActions } from '@src/store/saga'

export default function RestoreDialog() {
  const dispatch = useAppDispatch()
  const [open, handleOpen, handleClose] = useDialogState(false)

  useEffectOnce(() => {
    const isPreviousSessionExist = hasPersistedData()
    if (isPreviousSessionExist) {
      handleOpen()
    }
  })

  const handleRestore = () => {
    dispatch({ type: sagaActions.LOAD_STATE_SAGA })
    handleClose()
  }

  const handleNewSession = () => {
    removePersistedData()
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="restore-dialog-title"
        aria-describedby="restore-dialog-description"
      >
        <DialogTitle id="restore-dialog-title">
          I can restore your last session! 🧞‍♂️
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="restore-dialog-description">
            Would you like to restore the previous session or create a new one?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleNewSession}>
            Create new
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleRestore}
            autoFocus
          >
            Restore The Session
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
