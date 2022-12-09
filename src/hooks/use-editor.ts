import { useCallback } from 'react'
import { KonvaEventObject } from 'konva/lib/Node'
import { useKey } from 'react-use'

import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import {
  addPointToActivePolygon,
  cancelDrawing,
  createHistoryNode,
  initialNewPolygon,
  movePoint,
  redo,
  selectActiveHistoryNode,
  selectIsDrawing,
  undo
} from '@src/tabs/editor/editorSlice'
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

    if (!position) {
      return
    }
    dispatch(createHistoryNode())
    dispatch(movePoint({ polygonId, pointId, position }))
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
    handleRedo
  }
}
