import { useReplContext } from 'components/repl/context';
import type { Tutorial } from 'contentlayer/generated';
import { For } from 'lib/flow';
import Link from 'next/link';
import type { Chapters } from 'components/tutorial/types';

type Props = {
  metaIndex: Chapters;
  onChange: (_: Tutorial) => void;
};

type OptionGroup = {
  label: string;
  options: Tutorial[];
};

const tutorialsInChapters = (tutorials: Chapters) => {
  const uniqGroups = [...Object.keys(tutorials)];

  return uniqGroups.reduce((acc: OptionGroup[], label: string) => {
    const optionsInGroup = tutorials[label];

    acc.push({
      label,
      options: optionsInGroup,
    });

    return acc;
  }, []);
};

export function List({ metaIndex, onChange }: Props) {
  const { tutorial: current } = useReplContext();
  const groupedOptions = tutorialsInChapters(metaIndex);

  return (
    <div className="h-full border-r-2 border-gray-400 pt-4">
      {/*<div className={'prose prose-docs'}>*/}
      {/*  <h2 className={'px-4'}>Step Selection</h2>*/}
      {/*</div>*/}
      <For each={groupedOptions}>
        {(chapter, i) => (
          <div className={'collapse collapse-arrow'} key={i} tabIndex={0}>
            <input type="checkbox" defaultChecked={current.chapter === chapter.label} />

            <h3 className="text-md collapse-title font-semibold uppercase tracking-wider">
              {chapter.label}
            </h3>

            <nav className="toc inner collapse-content">
              <ul className="menu menu-compact pl-0">
                <For each={chapter.options}>
                  {(tutorial, j) => (
                    <li className="mb-[2px]" key={j}>
                      <Link href={tutorial.url}>
                        <a
                          className={`relative inline-flex w-full items-center py-2 text-sm leading-4 !transition-colors !duration-150 hover:text-gray-900 ${
                            tutorial.url == current.url ? 'active' : ''
                          }`}
                          onClick={() => onChange(tutorial)}
                          href={tutorial.url}
                        >
                          <span>{tutorial.title}</span>
                        </a>
                      </Link>
                    </li>
                  )}
                </For>
              </ul>
            </nav>
          </div>
        )}
      </For>
    </div>
  );
}
