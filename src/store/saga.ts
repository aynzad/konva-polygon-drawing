import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { AnyAction } from '@reduxjs/toolkit'
import { hydrate } from '@src/editor/editorSlice'

import { RootState } from './index'
import { load, save } from './persist'

export const sagaActions = {
  LOAD_STATE_SAGA: 'LOAD_STATE_SAGA'
} as const

export function* persistStoreSaga(action: AnyAction) {
  const state: RootState = yield select()
  if (
    action.type !== sagaActions.LOAD_STATE_SAGA &&
    action.type !== hydrate.type
  ) {
    yield call(() => save(state))
  }
}

export function* hydrateEditorStateSaga() {
  const state: RootState = yield load()
  console.log('loading data', state)
  yield put(hydrate(state.editor))
}

export default function* rootSaga() {
  yield all([
    takeLatest('*', persistStoreSaga),
    takeLatest(sagaActions.LOAD_STATE_SAGA, hydrateEditorStateSaga)
  ])
}
