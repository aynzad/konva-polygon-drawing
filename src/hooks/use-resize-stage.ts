import { useState } from 'react'
import { useEffectOnce } from 'react-use'

interface IUseResizeStage {
  height: number
  width: number
}

export function useResizeStage(
  initialHeight = window.innerWidth,
  initialWidth = window.innerHeight
): IUseResizeStage {
  const [size, setSize] = useState<IUseResizeStage>({
    height: initialHeight,
    width: initialWidth
  })

  const resize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffectOnce(() => {
    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  })

  return size
}
