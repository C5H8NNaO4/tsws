import { Guide, Meta } from 'contentlayer/generated';
import { tocAndBoy } from 'lib/index';
import Head from 'next/head';
import React from 'react';
import { Area } from './area';
import { Header } from './header';

export type GuideMeta = {
  folder: string;
  children: GuideMeta[];
  position: number;
  title: string;
  slug: string;
  isDir: boolean;
};

export const GuidePage = ({
  guide,
  meta,
}: {
  guide: Guide;
  metaIndex: Guide[];
  meta: Meta[];
}) => {
  const { toc, body } = tocAndBoy(guide);

  return (
    <>
      <Head>
        <title>Guide: {guide.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Area
        guide={guide}
        html={body}
        toc={toc}
        guidesToc={meta as unknown as GuideMeta[]}
      />
    </>
  );
};
