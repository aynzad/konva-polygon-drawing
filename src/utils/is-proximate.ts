import { Vector2d } from 'konva/lib/types'

import { DEFAULT_PROXIMITY_OFFSET } from '@src/constants'

export function isProximate(
  first: Vector2d,
  second: Vector2d,
  offset = DEFAULT_PROXIMITY_OFFSET
) {
  return (
    Math.abs(first.x - second.x) < offset &&
    Math.abs(first.y - second.y) < offset
  )
}
