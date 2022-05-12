import type { GuideMeta } from 'container/guide';
import { GuidePage } from 'container/guide';
import { allGuides } from 'content/Guide/_index.mjs';
import { allMeta } from 'content/Meta/_index.mjs';

import type { Guide, Meta } from 'contentlayer/generated';
import type { GetStaticProps } from 'next';
import * as React from 'react';
import { prependBasepathOnImages } from 'lib/prepend-basepath';

const buildGuideIndexEntry = (item: Guide | Meta): GuideMeta => ({
  slug: item.type === 'Guide' ? item.url : item.slug,
  position: item.position,
  title: item.title,
  folder: item._raw.sourceFileDir,
  isDir: item.isDir ?? false,
  children: [],
});

const Page = ({
  current,
  index,
  meta,
}: {
  current: Guide;
  index: any[];
  meta: Meta[];
}) => {
  return <GuidePage guide={current} metaIndex={index} meta={meta} />;
};

export const getStaticPaths = async () => {
  const paths = allGuides.map((_) => _.url).filter((x) => x !== '/');

  return { paths, fallback: false };
};

function buildToc(docTreeItems: GuideMeta[]) {
  const meta = allMeta.map(buildGuideIndexEntry).sort((a, b) => a.position - b.position);

  meta.forEach((m, i) => {
    m.children = docTreeItems
      .filter((g) => g.folder === m.folder)
      .sort((a, b) => a.position - b.position);

    if (i > 0) {
      const parent = meta[i - 1]!;
      if (m.folder.split(/\/.[^\/]+$/)[0] == parent.folder) {
        parent.isDir = parent.children.length === 0;
      }
    }
  });

  meta[0].isDir = false;
  meta[0].children.length = 0;

  return meta;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = (context.params as { [key: string]: any }) || { slug: [] };
  const slug = [...(params.slug || [])];

  const pagePath = `/guide/${String(slug.join('/'))}`.replace(/\/+$/, '');

  const docTreeItems = allGuides.map(buildGuideIndexEntry);
  const current = allGuides.find((d) => d.url === pagePath)!;
  const meta = buildToc(docTreeItems);

  current.body.html = prependBasepathOnImages(current.body.html);

  return { props: { current, meta } };
};

export default Page;
