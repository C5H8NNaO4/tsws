import { visit } from 'unist-util-visit';
//
// export function rehypeQuiz() {
//   return function (tree) {
//     visit(tree, 'pre', (node) => {
//       const quiz = node.children.find((n) => n.properties.className?.includes('language-quiz'));
//       if (!quiz) return;
//
//       node.children.length = 0;
//       node.tagName = 'p';
//     });
//   };
// }

export function remarkRemoveQuiz() {
  return transformer;

  function transformer(tree) {
    visit(tree, 'code', visitor);

    function visitor(node) {
      if (node.lang !== 'quiz') return;

      // console.debug(node);
      node.type = 'text';
      node.value = '';
    }
  }
}
