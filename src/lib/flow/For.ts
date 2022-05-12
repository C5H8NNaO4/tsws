import { ReactElement } from 'react';

type EachItem<T> = (t: T, i: number) => JSX.Element;

type ForProps<T> = {
  each: T[];
  fallback?: JSX.Element;
  children: EachItem<T>;
};

export const For = <T>({ fallback, each: list, children }: ForProps<T>) =>
  (list.length > 0 ? list.map(children) : fallback) as ReactElement;
