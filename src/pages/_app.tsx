import * as React from 'react';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { editorTextmateSetup } from 'components/editor/textmate-setup';
import { onComplete } from 'components/loading';
import { Layout } from 'container/layout';

import NProgress from 'nprogress';
import '../assets/globals.scss';

const handleStart = () => NProgress.start();
const handleStop = () => NProgress.done();

function ReplApp({ Component, pageProps }: AppProps) {
  const [preparing, setPreparing] = useState(false);

  useEffect(() => {
    setPreparing(true);
  }, []);

  if (!preparing) return null;

  return <Component {...pageProps} />;
}

function RegularApp({ Component, pageProps, router }: AppProps) {
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    editorTextmateSetup().then(() => {
      setPrepared(true);
      onComplete();
    });
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  if (!prepared) return null;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
function AppFrame({ Component, pageProps, router }: AppProps) {
  const iframe = router.asPath.match(/\/repl/);
  const App = iframe ? ReplApp : RegularApp;

  return <App Component={Component} pageProps={pageProps} router={router} />;
}

export default AppFrame;
