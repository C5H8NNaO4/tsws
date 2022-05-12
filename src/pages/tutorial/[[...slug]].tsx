import * as React from 'react';
import { TutorialPage } from 'container/tutorial';
import { allTutorials } from 'contentlayer/generated';
import type { Tutorial } from 'contentlayer/generated';
import type { GetStaticProps } from 'next';
import type { Chapters } from 'components/tutorial/types';

const Page = ({ current, index }: { current: Tutorial; index: Chapters }) => {
  return <TutorialPage tutorial={current} metaIndex={index} />;
};

export const getStaticPaths = async () => {
  const paths = allTutorials.map((_) => _.url);

  return { paths, fallback: false };
};

type IndexEntry = {
  url: string;
  position: number;
  title: string;
  chapter?: string;
};

const buildTutorialIndexEntry = (item): IndexEntry => ({
  url: item.url,
  position: item.position,
  title: item.title,
  chapter: item.chapter,
});

const groupBy = (docs: IndexEntry[], key: keyof IndexEntry): Chapters => {
  return docs
    .sort((a, b) => a.position - b.position)
    .reduce((acc: any, curr: IndexEntry) => {
      const keyVal = curr[key]!;

      const val = { ...curr };
      delete val[key];

      (acc[keyVal] = Array.guard(acc[keyVal])).push(val);
      return acc;
    }, {});
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as any;
  const slug = [...(params.slug || [])];
  const type = 'tutorial';
  const pagePath = `/${type}/${slug?.join('/') ?? ''}`.replace(/\/$/, '');

  const current = allTutorials.find((d) => d.url === pagePath)!;
  if ('raw' in current.body) {
    current.body.html = current.body.html.split('</nav>')[1];

    // @ts-ignore
    delete current.body.raw;
  }

  const index = groupBy(allTutorials.map(buildTutorialIndexEntry), 'chapter');
  return { props: { current, index } };
};

export default Page;
