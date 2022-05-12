import 'lib/array';
import type { ReactElement, ReactNode } from 'react';

export const Else = ({ children }: any) => children;

type ShowProps = {
  when: boolean;
  fallback?: ReactNode;
  children: ReactNode | ReactNode[];
};

//export const Show = (props: ShowProps) => (props.when ? props.children : props.fallback ?? null);

// fallback > <Else>
export const Show = ({ when, fallback, children }: ShowProps): any => {
  let nodes = Array.guard(children) as ReactElement[];

  const theElse =
    // @ts-ignore
    (fallback || nodes.find((c) => c.type.name === 'Else')) ?? null;

  if (!when) return theElse;

  // @ts-ignore
  // const idx = nodes.indexOf(theElse);
  if (!fallback) {
    // if (~idx) {
    nodes = [...nodes];
    nodes.length -= 1;
  }

  return nodes;
};
