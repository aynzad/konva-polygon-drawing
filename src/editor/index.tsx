import { useRef } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import type { Stage as StageType } from 'konva/lib/Stage'
import { Layer, Stage } from 'react-konva'

import { useZoomStage } from '@src/hooks/use-zoom-stage'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { generateRandomColor } from '@src/utils/generate-random-color'

import {
  addPointToActivePolygon,
  createHistoryNode,
  dragPointMove,
  dragPointStart,
  initialNewPolygon,
  selectActiveHistoryNode,
  selectIsDrawing
} from './editorSlice'
import { Polygon } from './Polygon'

export function Editor() {
  const stageRef = useRef<StageType | null>(null)
  const { scale, position, reset } = useZoomStage({ stage: stageRef?.current })

  const scene = useAppSelector(selectActiveHistoryNode)
  const isDrawing = useAppSelector(selectIsDrawing)
  const dispatch = useAppDispatch()

  const handleAddPoint = (event: KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage()
    const position = stage?.getRelativePointerPosition()

    if (!position) {
      return
    }

    if (isDrawing) {
      dispatch(addPointToActivePolygon({ position }))
      return
    }

    dispatch(createHistoryNode())
    dispatch(initialNewPolygon({ position, fill: generateRandomColor() }))
  }

  const handleDragPointMove = (
    event: KonvaEventObject<DragEvent>,
    polygonId: number,
    pointId: number
  ) => {
    const stage = event.target.getStage()
    const position = stage?.getRelativePointerPosition()

    if (!position) {
      return
    }

    dispatch(dragPointMove({ polygonId, pointId, position }))
  }

  const handleDragPointStart = (
    event: KonvaEventObject<DragEvent>,
    polygonId: number,
    pointId: number
  ) => {
    const stage = event.target.getStage()
    const position = stage?.getRelativePointerPosition()

    if (!position) {
      return
    }
    dispatch(createHistoryNode())
    dispatch(dragPointStart({ polygonId, pointId, position }))
  }

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleAddPoint}
      onDblClick={reset}
      scale={scale}
      position={position}
    >
      <Layer>
        {scene.map(polygon => (
          <Polygon
            key={polygon.id}
            onDragPointMove={handleDragPointMove}
            onDragPointStart={handleDragPointStart}
            isDrawing={isDrawing}
            {...polygon}
          />
        ))}
      </Layer>
    </Stage>
  )
}
