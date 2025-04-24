import type { GlobalAfterChangeHook } from 'payload';

import { revalidateTag } from 'next/cache';

export const revalidate: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating Grexa Bot Floating Widget`);

    revalidateTag('global_grexabot-floating-widget');
  }

  return doc;
};
