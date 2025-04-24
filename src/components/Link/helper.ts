import { CMSLinkType } from './types';

const getLinkUrl = (link: CMSLinkType): string | null => {
  const { type, url, reference } = link;
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  return href;
};

const getLinkLabel = (link: CMSLinkType) => {
  const { label } = link;

  return label || null;
};

export { getLinkUrl, getLinkLabel };
