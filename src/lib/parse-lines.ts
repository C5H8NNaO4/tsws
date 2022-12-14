import rangeParser from 'parse-numeric-range';

const magicCommentDirectives = [
  'highlight-next-line',
  'highlight-start',
  'highlight-end',
];

const commentTypes = ['js', 'jsBlock', 'jsx', 'python', 'html'] as const;

type CommentType = typeof commentTypes[number];

type CommentPattern = {
  start: string;
  end: string;
};

// Supported types of highlight comments
const commentPatterns: Record<CommentType, CommentPattern> = {
  js: {
    start: '\\/\\/',
    end: '',
  },
  jsBlock: {
    start: '\\/\\*',
    end: '\\*\\/',
  },
  jsx: {
    start: '\\{\\s*\\/\\*',
    end: '\\*\\/\\s*\\}',
  },
  python: {
    start: '#',
    end: '',
  },
  html: {
    start: '<!--',
    end: '-->',
  },
};

const getMagicCommentDirectiveRegex = (
  languages: readonly CommentType[] = commentTypes,
) => {
  // to be more reliable, the opening and closing comment must match
  const commentPattern = languages
    .map((lang) => {
      const { start, end } = commentPatterns[lang];
      return `(?:${start}\\s*(${magicCommentDirectives.join('|')})\\s*${end})`;
    })
    .join('|');
  // white space is allowed, but otherwise it should be on it's own line
  return new RegExp(`^\\s*(?:${commentPattern})\\s*$`);
};

// select comment styles based on language
const magicCommentDirectiveRegex = (lang: string) => {
  switch (lang) {
    case 'js':
    case 'javascript':
    case 'ts':
    case 'typescript':
      return getMagicCommentDirectiveRegex(['js', 'jsBlock']);

    case 'jsx':
    case 'tsx':
      return getMagicCommentDirectiveRegex(['js', 'jsBlock', 'jsx']);

    case 'html':
      return getMagicCommentDirectiveRegex(['js', 'jsBlock', 'html']);

    case 'python':
    case 'py':
      return getMagicCommentDirectiveRegex(['python']);

    default:
      // all comment types
      return getMagicCommentDirectiveRegex();
  }
};

const highlightLinesRangeRegex = /{(?<range>[\d,-]+)\}/;

export function parseLines(
  content: string,
  metastring?: string,
  language?: string,
): {
  highlightLines: number[];
  code: string;
} {
  let code = content.replace(/\n$/, '');
  // Highlighted lines specified in props: don't parse the content
  if (metastring && highlightLinesRangeRegex.test(metastring)) {
    const highlightLinesRange = metastring.match(highlightLinesRangeRegex)!.groups!
      .range!;
    const highlightLines = rangeParser(highlightLinesRange)
      .filter((n) => n > 0)
      .map((n) => n - 1);
    return { highlightLines, code };
  }
  if (language === undefined) {
    return { highlightLines: [], code };
  }
  const directiveRegex = magicCommentDirectiveRegex(language);
  // go through line by line
  const lines = code.split('\n');
  let highlightBlockStart: number;
  let highlightRange = '';
  // loop through lines
  for (let lineNumber = 0; lineNumber < lines.length; ) {
    const line = lines[lineNumber]!;
    const match = line.match(directiveRegex);
    if (match !== null) {
      const directive = match.slice(1).find((item) => item !== undefined);
      switch (directive) {
        case 'highlight-next-line':
          highlightRange += `${lineNumber},`;
          break;

        case 'highlight-start':
          highlightBlockStart = lineNumber;
          break;

        case 'highlight-end':
          highlightRange += `${highlightBlockStart!}-${lineNumber - 1},`;
          break;

        default:
          break;
      }
      lines.splice(lineNumber, 1);
    } else {
      // lines without directives are unchanged
      lineNumber += 1;
    }
  }
  const highlightLines = rangeParser(highlightRange);
  code = lines.join('\n');
  return { highlightLines, code };
}
