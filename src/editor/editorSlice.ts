import { Vector2d } from 'konva/lib/types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@src/store'
import { IPolygon } from '@src/types'
import { isProximate } from '@src/utils/is-proximate'

export interface EditorState {
  activePolygonId: number | null
  history: IPolygon[][]
  activeHistoryNodeIndex: number
}

const initialState: EditorState = {
  activePolygonId: null,
  history: [[]],
  activeHistoryNodeIndex: 0
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    undo: state => {
      state.activeHistoryNodeIndex =
        state.activeHistoryNodeIndex > 0 ? state.activeHistoryNodeIndex - 1 : 0
    },
    redo: state => {
      state.activeHistoryNodeIndex =
        state.history.length > state.activeHistoryNodeIndex + 1
          ? state.activeHistoryNodeIndex + 1
          : state.activeHistoryNodeIndex
    },
    // Clone last scene into new history node
    createHistoryNode: state => {
      // remove possible ahead nodes in case the user hit undo button
      state.history = state.history.slice(0, state.activeHistoryNodeIndex + 1)
      // clone last node
      const previousNode = state.history[state.history.length - 1]
      state.history.push(previousNode)
      // oint the active history node to the just-created one
      state.activeHistoryNodeIndex = state.activeHistoryNodeIndex + 1
    },
    // Add new polygon to the active scene
    initialNewPolygon: (
      state,
      action: PayloadAction<{ position: Vector2d; fill: string }>
    ) => {
      const activeHistoryNode = state.history[state.history.length - 1]

      const newPolygonId = activeHistoryNode.length
      activeHistoryNode.push({
        id: newPolygonId,
        fill: action.payload.fill,
        closed: false,
        points: [{ id: 0, ...action.payload.position }]
      })
      state.activePolygonId = newPolygonId
    },
    // Add new point to the active polygon
    addPointToActivePolygon: (
      state,
      action: PayloadAction<{ position: Vector2d }>
    ) => {
      const activeHistoryNode = state.history[state.activeHistoryNodeIndex]

      if (state.activePolygonId !== null) {
        const activePolygon = activeHistoryNode[state.activePolygonId]
        const firstDot = activePolygon.points[0]

        const shouldClosePolygon = isProximate(
          action.payload.position,
          firstDot
        )
        if (shouldClosePolygon) {
          activePolygon.closed = true
          state.activePolygonId = null
          return
        }

        activePolygon.points.push({
          id: activePolygon.points.length,
          ...action.payload.position
        })
      }
    },
    // Edit polygon by moving a point
    movePoint: (
      state,
      action: PayloadAction<{
        polygonId: number
        pointId: number
        position: Vector2d
      }>
    ) => {
      const activeHistoryNode = state.history[state.activeHistoryNodeIndex]

      const polygon = activeHistoryNode.find(
        ({ id }) => id === action.payload.polygonId
      )
      const point = polygon?.points.find(
        ({ id }) => id === action.payload.pointId
      )

      if (point) {
        point.x = action.payload.position.x
        point.y = action.payload.position.y
      }
    }
  }
})

export const selectActiveHistoryNode = (state: RootState) =>
  state.editor.history[state.editor.activeHistoryNodeIndex]

export const selectIsDrawing = (state: RootState) =>
  typeof state.editor.activePolygonId === 'number'

export const selectHasUndo = (state: RootState) =>
  state.editor.activeHistoryNodeIndex > 0

export const selectHasRedo = (state: RootState) =>
  state.editor.history.length > state.editor.activeHistoryNodeIndex + 1

export const {
  undo,
  redo,
  createHistoryNode,
  initialNewPolygon,
  addPointToActivePolygon,
  movePoint
} = editorSlice.actions

export default editorSlice.reducer
