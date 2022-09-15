#!/bin/bash

set -x

yarn 
mkdir -p public/repl
cp node_modules/inline-module/index.js public/repl/inline-module.js
cp node_modules/@babel/standalone/babel.min.js public/repl/babel.min.js

cp -R node_modules/monaco-editor/min public/monaco/min
