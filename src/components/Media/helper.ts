import { getClientSideURL } from '@/utilities/getURL';
import type { Props as MediaProps } from './types';

const getImageUrl = (resource: MediaProps['resource']): string | null => {
  let imageSrc = '';

  if (!resource) return null;

  if (resource && typeof resource === 'object') {
    const { url } = resource;

    const cacheTag = resource.updatedAt;

    imageSrc = `${getClientSideURL()}${url}?${cacheTag}`;
  } else if (typeof resource === 'string') {
    imageSrc = resource;
  }

  return imageSrc;
};

export { getImageUrl };
