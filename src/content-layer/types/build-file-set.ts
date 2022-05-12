import { Tutorial } from 'contentlayer/generated';
import fs from 'fs';

export const buildFileSet = (tut: Tutorial) => {
  const folder = `content/${tut._raw.flattenedPath}/`;
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder)
    .map((fileName: string) => {
      try {
        const cnt = fs.readFileSync(`${folder}${fileName}`);

        return {
          path: `${folder}${fileName}`,
          content: cnt.toString('utf8'),
        };
      } catch (e) {
        return false;
      }
    })
    .filter(Boolean);
};
