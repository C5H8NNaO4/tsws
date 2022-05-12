import * as React from 'react';
import { prependBasepath } from 'lib/prepend-basepath';

type OnLoad = (iframe: HTMLIFrameElement) => {};

type anyProp = {
  iframeSrc: string;
  onLoad: OnLoad;
  [key: string]: any;
};

export const Frame = (props: anyProp) => {
  const iframe = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    iframe.current && props.onLoad(iframe.current!);
  }, []);

  return (
    <iframe
      ref={iframe}
      title={props.iframeSrc}
      data-initial="true"
      className="h-full w-full border-0"
      referrerPolicy="unsafe-url"
      src={prependBasepath(props.iframeSrc)}
    />
  );
};
