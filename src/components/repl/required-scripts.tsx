import React from 'react';
import { asset } from 'lib/prepend-basepath';

const builder = (id, filename) => (
  <script id={id} src={asset(filename)} type="text/javascript" />
);
export const Inline = () => builder('inline', 'repl/inline-module.js');
export const Babel = (any) => builder('babel', 'repl/babel.min.js');
