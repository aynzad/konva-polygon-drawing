import { useEffect } from 'react'
import useKeyboardJs from 'react-use/lib/useKeyboardJs'

export function useComboShortcut(
  combination: string | string[],
  callback: () => void,
  disabled?: boolean
) {
  const [isPressed] = useKeyboardJs(combination)

  useEffect(() => {
    if (isPressed && !disabled) {
      callback()
    }
  }, [callback, disabled, isPressed])
}
