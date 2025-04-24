import type { Metadata } from 'next';

import { PayloadRedirects } from '@/components/PayloadRedirects';
import configPromise from '@payload-config';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { draftMode } from 'next/headers';
import React, { cache } from 'react';
import { homeStatic } from '@/endpoints/seed/home-static';

import { RenderBlocks } from '@/blocks/RenderBlocks';
import { RenderHero } from '@/heros/RenderHero';
import { generateMeta } from '@/utilities/generateMeta';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { GrexaBotFloatingWidget } from '@/globals/GrexaBot/Component';
import { WEBSITE_NAME } from '@/constants/website';
import { getServerSideURL } from '@/utilities/getURL';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home';
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode();
  const slug = 'home';
  const homePageURL = `/${slug}`;

  let page: RequiredDataFromCollectionSlug<'pages'> | null;

  try {
    page = await queryPageBySlug({
      slug,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch home page');
  }

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic;
  }

  if (!page) {
    return <PayloadRedirects url={homePageURL} />;
  }

  const { hero, layout } = page;

  return (
    <>
      <main className="mb-10">
        {/* <PageClient /> */}
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={homePageURL} />

        {draft && <LivePreviewListener />}

        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
        <GrexaBotFloatingWidget className="hidden md:block" />
      </main>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: WEBSITE_NAME,
          url: getServerSideURL(),
          logo: `${getServerSideURL()}/logo.png`,
        })}
      </script>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'home';
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
