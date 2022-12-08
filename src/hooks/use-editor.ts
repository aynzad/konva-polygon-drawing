import { KonvaEventObject } from 'konva/lib/Node'

import {
  addPointToActivePolygon,
  createHistoryNode,
  dragPointMove,
  dragPointStart,
  initialNewPolygon,
  redo,
  selectActiveHistoryNode,
  selectIsDrawing,
  undo
} from '@src/editor/editorSlice'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { generateRandomColor } from '@src/utils/generate-random-color'

export function useEditor() {
  const polygons = useAppSelector(selectActiveHistoryNode)
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

  const handleRedo = () => {
    dispatch(redo())
  }

  const handleUndo = () => {
    dispatch(undo())
  }

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
