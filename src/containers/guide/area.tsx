import { Sidebar } from 'components/guide/sidebar';
import { Toc } from 'components/guide/toc';
import { GuideMeta } from 'container/guide/index';
import { Guide } from 'contentlayer/generated';
import { Show } from 'lib/flow';
import * as React from 'react';

type GuideAreaProps = {
  guide: Guide;
  guidesToc: GuideMeta[];
  toc: string;
  html: string;
};

export function Area(props: GuideAreaProps) {
  const guidesToc = props.guidesToc;

  return (
    <div className="guide-page-wrapper">
      <div className="guide-wrapper container">
        <Sidebar toc={props.toc} guidesToc={guidesToc} />
        <Toc toc={props.toc} />

        <div className="main-content bg-white pl-3">
          <div
            className="prose-docs lg:prose-md prose max-w-full pt-5"
            dangerouslySetInnerHTML={{ __html: props.html }}
          />

          <Show when={!!props.guide.sauce}>
            <a href={props.guide.sauce} target="_blank" className="mt-10 block pb-10">
              Source: {props.guide.sauce}
            </a>
          </Show>
        </div>
      </div>
    </div>
  );
}
