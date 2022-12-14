#!/bin/bash

set -x

yarn 
mkdir -p public/repl
mkdir -p public/monaco/min
mkdir -p public/inline-module

cp node_modules/inline-module/index.js public/repl/inline-module.js
cp node_modules/@babel/standalone/babel.min.js public/repl/babel.min.js

cp -R node_modules/monaco-editor/min public/monaco
cp -R node_modules/monaco-editor/min public/monaco/min

ls -l ./public