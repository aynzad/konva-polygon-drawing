import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPolygon } from '@src/types'

export interface EditorState {
  activePolygonId: number | null
  history: IPolygon[][]
  activeStep: number
}

const initialState: EditorState = {
  activePolygonId: null,
  history: [],
  activeStep: 0
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    undo: state => {
      state.activeStep = state.activeStep > 0 ? state.activeStep - 1 : 0
    },
    redo: state => {
      state.activeStep =
        state.history.length > state.activeStep + 1
          ? state.activeStep + 1
          : state.activeStep
    },
    setActivePolygonId: (state, action: PayloadAction<number | null>) => {
      state.activePolygonId = action.payload
    }
  }
})

export const { undo, redo, setActivePolygonId } = editorSlice.actions

export default editorSlice.reducer
