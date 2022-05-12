export const ada = (code: string): string =>
  code.replaceAll(
    /^import (.*?) from ['|"]([^.].*?)['|"];/gim,
    "import $1 from 'https://cdn.skypack.dev/$2'",
  );
