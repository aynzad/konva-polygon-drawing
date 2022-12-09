import { PERSISTANCE_KEY } from '@src/constants'

import { RootState } from './index'

export function persistData(state: RootState): boolean {
  try {
    window.localStorage.setItem(PERSISTANCE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function loadPersistedData(): RootState | null {
  const jsonState = window.localStorage.getItem(PERSISTANCE_KEY)

  try {
    const state = jsonState ? (JSON.parse(jsonState) as RootState) : null
    return state
  } catch {
    return null
  }
}

export function removePersistedData(): boolean {
  try {
    window.localStorage.removeItem(PERSISTANCE_KEY)
    return true
  } catch {
    return false
  }
}

export function hasPersistedData(): boolean {
  const jsonState = window.localStorage.getItem(PERSISTANCE_KEY)

  try {
    const state = jsonState ? (JSON.parse(jsonState) as RootState) : null
    return !!state
  } catch {
    removePersistedData()
    return false
  }
}
