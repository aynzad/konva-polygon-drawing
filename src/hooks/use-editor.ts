import { useCallback } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { useKey } from 'react-use'

import {
  addPointToActivePolygon,
  cancelDrawing,
  createHistoryNode,
  initialNewPolygon,
  movePoint,
  movePolygon,
  redo,
  selectActiveHistoryNode,
  selectIsDrawing,
  undo
} from '@src/layouts/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { changeStageCursor } from '@src/utils/change-stage-cursor'
import { generateRandomColor } from '@src/utils/generate-random-color'

export function useEditor() {
  const polygons = useAppSelector(selectActiveHistoryNode)
  const isDrawing = useAppSelector(selectIsDrawing)
  const dispatch = useAppDispatch()

  const handleCancelDrawing = () => {
    dispatch(cancelDrawing())
  }

  useKey('Escape', handleCancelDrawing)

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

    dispatch(movePoint({ polygonId, pointId, position }))
  }

  const handleDragPointStart = (
    event: KonvaEventObject<DragEvent>,
    polygonId: number,
    pointId: number
  ) => {
    const stage = event.target.getStage()
    const position = stage?.getRelativePointerPosition()

    if (!stage || !position) {
      return
    }

    changeStageCursor(event, 'grabbing')

    dispatch(createHistoryNode())
    dispatch(movePoint({ polygonId, pointId, position }))
  }

  const handleDragPolygonStart = (event: KonvaEventObject<DragEvent>) => {
    if (event.target.name() !== 'polygon') {
      return
    }

    changeStageCursor(event, 'grabbing')
  }

  const handleDragPolygonEnd = (
    event: KonvaEventObject<DragEvent>,
    polygonId: number
  ) => {
    const stage = event.target.getStage()

    // check for target name to deal with event bubbling
    if (!stage || event.target.name() !== 'polygon') {
      return
    }

    const movement = event.target._lastPos

    dispatch(createHistoryNode())
    dispatch(
      movePolygon({
        polygonId,
        movement
      })
    )

    changeStageCursor(event)

    event.target.position({ x: 0, y: 0 }) // to reset polygon group position
  }

  const handleRedo = useCallback(() => {
    dispatch(redo())
  }, [dispatch])

  const handleUndo = useCallback(() => {
    dispatch(undo())
  }, [dispatch])

  return {
    isDrawing,
    polygons,
    handleAddPoint,
    handleDragPointMove,
    handleDragPointStart,
    handleUndo,
    handleRedo,
    handleDragPolygonStart,
    handleDragPolygonEnd
  }
}
