// @ts-ignore
export {};
// import Select, { components, SelectInstance } from 'react-select';
// import { useRef } from 'react';
// import { Show } from 'lib/flow';
// import type { Tutorial } from 'contentlayer/generated';
// import { useReplContext } from 'components/repl';
//
// const style = {
//   control: (base: object) => ({
//     ...base,
//     border: 0,
//     boxShadow: 'none',
//   }),
// };
//
// const SingleValue = ({ children, ...props }: any) => (
//   <components.SingleValue {...props}>
//     <Show when={String(props.data?.chapter).length > 0}>
//       <span className="text-sm color-black-400 pr-1">{props.data?.chapter} /</span>
//     </Show>
//
//     {children}
//   </components.SingleValue>
// );
//
// type Props = {
//   metaIndex: Tutorial[];
//   onChange: (_: Tutorial) => void;
// };
//
// type OptionGroup = {
//   label: string;
//   options: Tutorial[];
// };
//
// // const tutorialsInChapters = (tutorials: Record<string, Tutorial[]>) => {
// //   return Object.entries(tutorials).map(([k,v])=>{
// //     return {label: k, options: v.flat()}
// //   })
// // }
// const tutorialsInChapters = (tutorials: Tutorial[]) => {
//   const uniqGroups = [...new Set(tutorials.map((o) => o.chapter))];
//
//   return uniqGroups.reduce((acc: OptionGroup[], label: string) => {
//     const optionsInGroup = tutorials.filter((o) => o.chapter === label);
//
//     acc.push({
//       label,
//       options: optionsInGroup,
//     });
//
//     return acc;
//   }, []);
// };
//
// export function ChapterSelect({ metaIndex, onChange }: Props) {
//   const { tutorial } = useReplContext();
//   const select = useRef<SelectInstance>(null);
//
//   const groupedOptions = tutorialsInChapters(metaIndex);
//
//   const onMenuOpen = () => {
//     setTimeout(() => {
//       const selectedEl = document.getElementsByClassName('chapter__option--is-selected')[0];
//       selectedEl?.scrollIntoView(true);
//     });
//   };
//
//   return (
//     <div className="box-border pt-3 pb-2 rounded-t border-b-2 border-solid bg-white">
//       <Select
//         instanceId="chapter-select"
//         classNamePrefix="chapter"
//         className="w-full py-2 px-6 flex items-center focus:outline-none space-x-1 group"
//         ref={select}
//         styles={style}
//         options={groupedOptions}
//         components={{ SingleValue }}
//         onMenuOpen={onMenuOpen}
//         isClearable={false}
//         escapeClearsValue={false}
//         menuPosition={'fixed'}
//         maxMenuHeight={350}
//         menuPlacement={'bottom'}
//         // @ts-ignore
//         onChange={onChange}
//         value={tutorial}
//       />
//     </div>
//   );
// }
