import { useRef, useState } from 'react'
import produce from 'immer'
import { KonvaEventObject } from 'konva/lib/Node'
import type { Stage as StageType } from 'konva/lib/Stage'
import { Layer, Stage } from 'react-konva'

import { useZoomStage } from '@src/hooks/use-zoom-stage'
import { IPolygon } from '@src/types'
import { generateRandomColor } from '@src/utils/generate-random-color'
import { isProximate } from '@src/utils/is-proximate'

import { Polygon } from './Polygon'

export function Editor() {
  const stageRef = useRef<StageType | null>(null)
  const { scale, position, reset } = useZoomStage({ stage: stageRef?.current })

  const [polygons, setPolygons] = useState<IPolygon[]>([])
  const [activePolygonId, setActivePolygonId] = useState<number | null>(null)
  const isDrawing = !!activePolygonId

  const handleClick = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage()
    const pos = stage?.getRelativePointerPosition()

    if (!pos) {
      return
    }

    if (activePolygonId) {
      setPolygons(
        produce(draft => {
          const activePolygon = draft.find(({ id }) => id === activePolygonId)
          const firstDot = activePolygon?.dots[0]

          if (activePolygon && firstDot) {
            const closed = isProximate(pos, firstDot)

            if (closed) {
              activePolygon.closed = true
              setActivePolygonId(null)
            } else {
              activePolygon.dots.push({
                id: activePolygon.dots.length,
                x: pos.x,
                y: pos.y
              })
            }
          }
        })
      )
    } else {
      const newActivePolygonId = polygons.length + 1
      setActivePolygonId(newActivePolygonId)

      setPolygons(
        produce(draft => {
          draft.push({
            id: newActivePolygonId,
            fill: generateRandomColor(),
            closed: false,
            dots: [{ id: 0, x: pos.x, y: pos.y }]
          })
        })
      )
    }
  }

  const handleDragDot = (
    event: KonvaEventObject<DragEvent>,
    shapeId: number,
    dotId: number
  ) => {
    const stage = event.target.getStage()
    const pos = stage?.getRelativePointerPosition()

    if (!pos) {
      return
    }

    setPolygons(
      produce(draft => {
        const shape = draft.find(({ id }) => id === shapeId)
        const dot = shape?.dots.find(({ id }) => id === dotId)

        if (shape && dot) {
          dot.x = pos.x
          dot.y = pos.y
        }
      })
    )
  }

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleClick}
      onDblClick={reset}
      scale={scale}
      position={position}
    >
      <Layer>
        {polygons.map(polygon => (
          <Polygon
            key={polygon.id}
            onDragDot={handleDragDot}
            isDrawing={isDrawing}
            {...polygon}
          />
        ))}
      </Layer>
    </Stage>
  )
}
