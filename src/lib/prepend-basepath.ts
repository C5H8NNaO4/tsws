import getConfig from 'next/config';

const {
  publicRuntimeConfig: { basePath },
} = getConfig();

export const prependBasepath = (str) => `${basePath}/${str}`;
export const asset = prependBasepath;
export const prependBasepathOnImages = (html: string): string => {
  const images = [...html.matchAll(/<img src="(\w.+?)"/g)];

  return images.reduce(
    (newHtml, match) => newHtml.replace(match[0], `<img src="${basePath}/${match[1]}"`),
    html,
  );
};
