import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@src/store'
import { IPolygon } from '@src/types'

export interface EditorState {
  activePolygonId: number | null
  history: IPolygon[][]
  activeIndex: number
}

const initialState: EditorState = {
  activePolygonId: null,
  history: [],
  activeIndex: 0
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    undo: state => {
      state.activeIndex = state.activeIndex > 0 ? state.activeIndex - 1 : 0
    },
    redo: state => {
      state.activeIndex =
        state.history.length > state.activeIndex + 1
          ? state.activeIndex + 1
          : state.activeIndex
    },
    setActivePolygonId: (state, action: PayloadAction<number | null>) => {
      state.activePolygonId = action.payload
    }
  }
})

export const selectActiveStep = (state: RootState) =>
  state.editor.history[state.editor.activeIndex]

export const { undo, redo, setActivePolygonId } = editorSlice.actions

export default editorSlice.reducer
