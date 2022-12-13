import { KonvaEventObject } from 'konva/lib/Node'

import { Cursor } from '@src/types'

export function changeStageCursor(
  event: KonvaEventObject<DragEvent | MouseEvent>,
  cursor: Cursor = 'default'
) {
  const stage = event.target.getStage()

  if (!stage) {
    return
  }

  stage.container().style.cursor = cursor
}
