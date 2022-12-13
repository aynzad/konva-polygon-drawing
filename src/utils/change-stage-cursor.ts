import { KonvaEventObject } from 'konva/lib/Node'

import { Cursor } from '@src/types'

export function changeStageCursor(
  event: KonvaEventObject<DragEvent | MouseEvent>,
  drawing: boolean,
  cursor: Cursor = 'pointer'
) {
  const stage = event.target.getStage()

  if (!stage || drawing) {
    return
  }

  stage.container().style.cursor = cursor
}
