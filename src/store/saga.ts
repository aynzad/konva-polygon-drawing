import { call, select, takeLatest } from 'redux-saga/effects'

import { RootState } from './index'
import { save } from './persist'

export function* persistStoreSaga() {
  const state: RootState = yield select()
  yield call(() => save(state))
}

export default function* rootSaga() {
  yield takeLatest('*', persistStoreSaga)
}
