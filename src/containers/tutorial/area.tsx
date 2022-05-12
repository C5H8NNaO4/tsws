import React, { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Icon, Logo } from 'components/icon';
import { arrowLeft, arrowRight, chevronDoubleDown } from 'components/icon/solid';
import { Quiz } from 'components/quiz';
import { Repl, useReplContext } from 'components/repl';
import { List as TutorialList } from 'components/tutorial/list';
import type { Chapters } from 'components/tutorial/types';
import type { Tutorial } from 'contentlayer/generated';
import { Show } from 'lib/flow';
import { indexBy } from 'lib/index';
import { hasSolvedFile, solvedAsset } from 'lib/visible-assets';

import * as monaco from 'monaco-editor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

interface TutorialAreaProps {
  metaIndex: Chapters;
}

export function TutorialArea({ metaIndex }: TutorialAreaProps) {
  const router = useRouter();
  const { tutorial, setCurrentAsset } = useReplContext();

  const ungroupedIndex: Tutorial[] = Object.values(metaIndex).flat();
  const getIdx = indexBy(ungroupedIndex, 'url');
  const maxIdx = ungroupedIndex.length - 1;

  const [solved, setSolved] = useState(false);
  const [idx, setIdx] = useState(getIdx(tutorial));
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const drawer = useRef<HTMLInputElement>(null);

  const [showSolveButton, setShowSolveButton] = useState(hasSolvedFile(tutorial));
  const onChangeChapter = (val: Tutorial) => {
    drawer.current!.checked = false;
    setSolved(false);
    router.push(val.url);
  };

  const activateTutorial = () => {
    setIdx(getIdx(tutorial));
    setCurrentAsset(tutorial.assets![0]);
    setShowSolveButton(hasSolvedFile(tutorial));
    NProgress.done();
  };

  useEffect(() => {
    if (drawer.current) {
      drawer.current.checked = false;
    }

    activateTutorial();
  }, [tutorial]);

  const at = (i: number) =>
    i < 0 ? ungroupedIndex[maxIdx] : i > maxIdx ? ungroupedIndex[0] : ungroupedIndex[i];
  const goChapter = (inc: number) => onChangeChapter(at(idx + inc));
  const prev = () => goChapter(-1);
  const next = () => goChapter(+1);

  const solve = () => {
    setSolved(true);

    const solution = solvedAsset(tutorial);
    const path = solution.path.replace('resolved.', '');
    const mainFile = tutorial.assets!.find((t) => t.path == path)!;

    setCurrentAsset(mainFile);

    editor.current!.setValue(solution.content!);
  };

  const onInit = ({ editor: instance }) => {
    editor.current = instance;
  };

  const body = tutorial.body.html;
  const rightSide = tutorial.quiz ? (
    <Quiz>{tutorial.quiz}</Quiz>
  ) : (
    <Repl onInit={onInit} />
  );

  return (
    <div
      className={clsx({
        'tutorial-wrapper transition-all duration-300': true,
        'grid h-[calc(100vh-65px)] grid-cols-[550px_auto]': true,
      })}
    >
      <div className="drawer bg-white">
        <input
          id="chapters-toggle"
          type="checkbox"
          className="drawer-toggle"
          ref={drawer}
          defaultChecked={true}
        />
        <div className="border-grey drawer-content mb-10 flex h-[100vh] flex-col overflow-hidden border-r-2 bg-gray-50 md:mb-0 ">
          <div className="border-athens-gray prose-docs lg:prose-md prose m-0 flex h-[64px] items-center border-b bg-white pt-0 pl-4">
            <Link href={'/'}>
              <a href="#">
                <Logo />
              </a>
            </Link>
            <h2 className="m-0 border-0 p-0">TypeScript WorkShop</h2>
          </div>

          <label htmlFor="chapters-toggle" className="drawer-overlay">
            <div className="box-border rounded-t border-b-2 border-solid pt-3 pb-2">
              <div className="group flex w-full items-center space-x-1 py-2 px-6 focus:outline-none">
                <Icon shape={chevronDoubleDown} className="w-4" />
                <span className="color-black-800 pr-1 text-sm">
                  {tutorial.chapter}{' '}
                </span>/ {tutorial.title}
              </div>
            </div>
          </label>

          <div
            className="prose-docs lg:prose-md prose max-w-full flex-1 overflow-auto md:p-5 lg:p-8"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />

          {/* bottom bar */}
          <div className="flex items-center justify-between border-t-2 py-4 px-8">
            <Show when={showSolveButton} fallback={<>&nbsp;</>}>
              <button
                id="solveStep"
                type="button"
                className="hover:disabled:bg-grey inline-flex rounded bg-unicorn-primary py-2 px-3 text-white hover:bg-unicorn-accent"
                onClick={solve}
                disabled={solved}
              >
                {solved ? 'Applied' : 'Apply'}
              </button>
            </Show>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="inline-flex py-2 px-3 "
                aria-current="page"
                onClick={prev}
              >
                <span className="sr-only">Previous step</span>
                <Icon
                  shape={arrowLeft}
                  className={clsx({
                    'h-6': true,
                    'opacity-25': idx == 0,
                  })}
                />
              </button>

              <button
                type="button"
                className="inline-flex py-2 px-3"
                aria-current="page"
                onClick={next}
              >
                <span className="sr-only">Next step</span>
                <Icon
                  shape={arrowRight}
                  className={clsx({
                    'h-6': true,
                    'opacity-25': idx == maxIdx,
                  })}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="drawer-side w-full">
          <label htmlFor="chapters-toggle" className="drawer-overlay">
            &nbsp;
          </label>
          <div className="max-w-[80%] bg-base-100 pl-6">
            <TutorialList metaIndex={metaIndex} onChange={onChangeChapter} />
          </div>
        </div>
      </div>

      <main>{rightSide}</main>
    </div>
  );
}
