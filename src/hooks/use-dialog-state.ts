import { useCallback, useState } from 'react'

type UseDialogState = [open: boolean, onOpen: () => void, onClose: () => void]

export function useDialogState(initialState: boolean = false): UseDialogState {
  const [open, setOpen] = useState(initialState)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  return [open, onOpen, onClose]
}
