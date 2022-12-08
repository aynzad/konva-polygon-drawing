import { PERSISTANCE_KEY } from '@src/constants'

import { RootState } from './index'

export function save(state: RootState): Promise<unknown> {
  try {
    window.localStorage.setItem(PERSISTANCE_KEY, JSON.stringify(state))
    return Promise.resolve({})
  } catch {
    return Promise.reject({})
  }
}

export function load(): Promise<RootState | null> {
  const jsonState = window.localStorage.getItem(PERSISTANCE_KEY)

  try {
    const state = jsonState ? (JSON.parse(jsonState) as RootState) : null
    return Promise.resolve(state)
  } catch {
    return Promise.resolve(null)
  }
}

export function isExist(): boolean {
  const jsonState = window.localStorage.getItem(PERSISTANCE_KEY)

  try {
    const state = jsonState ? (JSON.parse(jsonState) as RootState) : null
    return !!state
  } catch {
    window.localStorage.removeItem(PERSISTANCE_KEY)
    return false
  }
}
