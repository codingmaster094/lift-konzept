import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidatekosten_finanzierung: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating kosten_finanzierung`)

    revalidateTag('global_kosten_finanzierung')
  }

  return doc
}
