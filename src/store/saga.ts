import { all, put, select, takeLatest } from 'redux-saga/effects'

import { AnyAction } from '@reduxjs/toolkit'
import { hydrate } from '@src/layouts/editor/editorSlice'

import { RootState } from './index'
import { loadPersistedData, persistData } from './persist'

export const sagaActions = {
  LOAD_STATE_SAGA: 'LOAD_STATE_SAGA'
} as const

export function* persistStoreSaga(action: AnyAction) {
  const state: RootState = yield select()
  if (action.type !== sagaActions.LOAD_STATE_SAGA) {
    persistData(state)
  }
}

export function* hydrateEditorStateSaga() {
  const state: RootState | null = loadPersistedData()
  if (state) {
    yield put(hydrate(state.editor))
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest('*', persistStoreSaga),
    takeLatest(sagaActions.LOAD_STATE_SAGA, hydrateEditorStateSaga)
  ])
}
