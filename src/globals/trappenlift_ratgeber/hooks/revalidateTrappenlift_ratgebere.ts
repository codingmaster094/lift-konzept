import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateTrappenlift_ratgeber: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating trappenlift_ratgeber`)

    revalidateTag('global_trappenlift_ratgeber')
  }

  return doc
}
