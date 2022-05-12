---
title: TypeScript Quickstart
slug: 'quickstart'
type: Guide
position: 30
---

# Quickstart

Please get into the topics on [Home](/) first! **I mean it!.**

Before setting up your local dev machine you can get first hands-on experience., infos and challenges right inside the workshop.

:::warning[seriously!!]
Just **DO IT!!**
:::
   
The rest of this documents covers local machine prep/setup. 

## TypeScript compiler

The compiler is published to `npm` as `typescript` and exposes a command-line utility called `tsc` (short for **TypeScript compiler**). 
You could install the compiler globally  - or per project as a dev dependency in order to allow you to have different compiler versions for different projects.

```shell
$ npm install typescript # -D or -g based on your gusto
# or
$ yarn add typescript # whatever
```
Check this [handy guide](https://code.visualstudio.com/docs/typescript/typescript-compiling) for **Visual Studio Code** ingeration. 

Once you have installed `tsc`, you can 

- manunaly compile your files with `tsc filename.ts`.
- set up a new build script in the scripts section of your package.json:

```json {highlight: '3'}
"scripts": {
  "start": "node .",
  "build": "tsc",
  ...
}
```

Check the Frameworks-Section on the left for integration guides.

## Migrating your files from JavaScript to TypeScript

Good news. Any JS file is technically a valid TypeScript file, so you’re up to a great start – just switch the file extension to `.ts` from `.js`.

For a less trivial example on how to move your existing JavaScript codebase to TypeScript or use TypeScript to improve your JS code, read this guide.

## How to use TypeScript in a browser?

Did you even read the start page?

To run TypeScript in a browser, it needs to be transpiled into JavaScript with the TypeScript compiler (tsc). In this case, tsc creates a new .js file based on the .ts code, which you can use any way you could use a JavaScript file.


