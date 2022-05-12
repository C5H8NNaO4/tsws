import { ReplContext, ReplTutorial, ReplAsset } from 'components/repl/context';
import type { Tutorial } from 'contentlayer/generated';
import type { Chapters } from 'components/tutorial/types';

import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { TutorialArea } from './area';

interface TutorialPageProps {
  tutorial: Tutorial;
  metaIndex: Chapters;
}

export const TutorialPage = (props: TutorialPageProps) => {
  const { metaIndex } = props;
  const { tutorial: currentTutorial } = props;
  const router = useRouter();

  const [tutorial, setTutorial] = useState<ReplTutorial>(currentTutorial as ReplTutorial);
  const [currentAsset, setCurrentAsset] = useState(tutorial.assets[0]);

  useEffect(() => {
    if (router.isReady && currentTutorial.slug !== tutorial.slug) {
      setTutorial(currentTutorial as ReplTutorial);
    }
  }, [router]);

  const replContext = {
    tutorial,
    setTutorial,

    currentAsset,
    setCurrentAsset,
  } as any;

  return (
    <ReplContext.Provider value={replContext}>
      <Head>
        <title>Workshop: {tutorial.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <TutorialArea metaIndex={metaIndex} />
    </ReplContext.Provider>
  );
};
