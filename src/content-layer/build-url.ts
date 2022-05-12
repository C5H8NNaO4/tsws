export const buildUrl = (folder: string, doc: any) => {
  // console.debug({folder, sl: doc.slug, sourceFileDir: doc._raw})

  if (doc.slug === ':root') {
    return '/';
  } else if (doc.slug === '/') {
    return `/${folder}`;
  }

  return `/${folder}/${doc.slug}`;
};
