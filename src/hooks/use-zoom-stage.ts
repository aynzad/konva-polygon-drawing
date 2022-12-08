import { useCallback, useEffect, useState } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import type { Stage } from 'konva/lib/Stage'
import { Vector2d } from 'konva/lib/types'

import {
  DEFAULT_SCALE_BY,
  INITIAL_POSITION,
  INITIAL_SCALE
} from '@src/constants'

interface Props {
  stage: Stage | null
  initialScale?: Vector2d
  initialPosition?: Vector2d
  scaleBy?: number
}

interface IUseZoomStage {
  scale: Vector2d
  position: Vector2d
  reset: () => void
}

export function useZoomStage({
  stage,
  initialScale = INITIAL_SCALE,
  initialPosition = INITIAL_POSITION,
  scaleBy = DEFAULT_SCALE_BY
}: Props): IUseZoomStage {
  const [scale, setScale] = useState<Vector2d>(initialScale)
  const [position, setPosition] = useState<Vector2d>(initialPosition)

  const reset = useCallback(() => {
    setScale(initialScale)
    setPosition(INITIAL_POSITION)
  }, [initialScale])

  useEffect(() => {
    if (stage) {
      stage.on('wheel', (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault()

        const scale = stage?.scaleX()
        const pointer = stage?.getRelativePointerPosition()

        if (!stage || !scale || !pointer) {
          return
        }

        const mousePointTo = {
          x: (pointer.x - stage.x()) / scale,
          y: (pointer.y - stage.y()) / scale
        }

        // how to scale? Zoom in? Or zoom out?
        let direction = event.evt.deltaY > 0 ? 1 : -1

        // when we zoom on trackpad, e.evt.ctrlKey is true
        // in that case lets revert direction
        if (event.evt.ctrlKey) {
          direction = -direction
        }

        const newScale = direction > 0 ? scale * scaleBy : scale / scaleBy

        setScale({ x: newScale, y: newScale })

        const newPos = {
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        }
        setPosition(newPos)
      })
    }
  }, [scaleBy, stage])

  return { scale, position, reset }
}
