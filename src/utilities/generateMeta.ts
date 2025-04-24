import type { Metadata } from 'next';

import type { Media, Page, Post, Config } from '../payload-types';

import { mergeOpenGraph } from './mergeOpenGraph';
import { getServerSideURL } from './getURL';
import { NEXT_PUBLIC_SERVER_URL } from '@/constants/client';
import { VERCEL_PROJECT_PRODUCTION_URL } from '@/constants/server';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + '/assets/images/default-website-image.webp';

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

// TODO: change this to the correct meta later
export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title ? doc?.meta?.title : 'Grexa AI';

  const collection = doc?.meta?.canonicalUrl?.relationTo;
  const path =
    typeof doc?.meta?.canonicalUrl?.value === 'string'
      ? doc?.meta?.canonicalUrl?.value
      : doc?.meta?.canonicalUrl?.value?.slug;

  const canonicalUrl = `/${collection}/${path}`;

  const websiteURL = NEXT_PUBLIC_SERVER_URL || VERCEL_PROJECT_PRODUCTION_URL;
  const metadataBase = new URL(websiteURL);

  const metaObject: Metadata = {
    robots: {
      index: true,
      follow: true,
    },
    description: doc?.meta?.description,
    metadataBase,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
      title,
      type: 'website',
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      siteName: 'Grexa AI',
    }),
    title,
  };

  if (collection && path) {
    metaObject.alternates = {
      canonical: canonicalUrl,
    };
  }

  return metaObject;
};
