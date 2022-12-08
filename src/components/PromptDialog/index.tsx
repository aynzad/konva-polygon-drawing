import { ChangeEvent, useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'

interface Props {
  open: boolean
  title: string
  description: string
  textBoxInitialValue?: string
  textBoxReadonly?: boolean
  buttonText: string
  onApply: (json: string) => void
  onClose: () => void
}
export default function PromptDialog({
  open,
  title,
  description,
  textBoxInitialValue = '',
  textBoxReadonly = false,
  buttonText,
  onApply,
  onClose
}: Props) {
  const [json, setJson] = useState<string>(textBoxInitialValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJson(event.target.value)
  }

  const handleApply = () => {
    onApply(json)
    onClose()
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="prompt-dialog-title"
      aria-describedby="prompt-dialog-description"
    >
      <DialogTitle id="prompt-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          size="small"
          value={json}
          onChange={handleChange}
          InputProps={{
            readOnly: textBoxReadonly
          }}
          multiline
          name="json"
          autoFocus
          margin="dense"
          id="json"
          type="text"
          fullWidth
          rows={12}
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleApply}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
