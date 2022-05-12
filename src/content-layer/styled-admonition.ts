import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

const icons = {
  note: {
    emoji: 'ℹ️', // '&#x2139;'
  },
  remember: {
    emoji: '💡', //'&#x1F4A1;'
  },
  tip: {
    emoji: '💡', //'&#x1F4A1;'
  },
  warning: {
    emoji: '🔥', //'&#x1F525;'
  },
  important: {
    emoji: '❗️', //'&#x2757;'
  },
  caution: {
    emoji: '⚠️', // '&#x26A0;&#xFE0F;'
  },
};
const nodes = Object.keys(icons);

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function styledAdmonition() {
  return (tree: any, file: any) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (!nodes.includes(node.name)) return;

        if (node.children[0]?.data?.directiveLabel) {
          const tagName = 'strong';
          const label = node.children[0];
          label.data.hName = tagName;
          label.data.hProperties = h(tagName, {
            class: 'heading',
            dataLabel: true,
          }).properties;

          label.children[0].value = `${icons[node.name].emoji} ${
            label.children[0].value
          }`;
        }

        const data = node.data || (node.data = {});
        const tagName = node.type === 'textDirective' ? 'span' : 'blockquote';

        const attributes = {
          ...node.attributes,
          class: `admonition ${node.name} ${String(node.attributes?.class ?? '')}`,
        };

        data.hName = tagName;
        data.hProperties = h(tagName, attributes).properties;
      }
    });
  };
}
