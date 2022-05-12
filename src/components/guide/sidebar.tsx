import { GroupLabel } from 'components/guide/group-label';
import { GuideLink } from 'components/guide/guide-link';
import { GuideMeta } from 'container/guide';
import { For } from 'lib/flow';

interface SidebarListEntry extends Pick<GuideMeta, 'slug' | 'title'> {
  children: SidebarListEntry[];
}

export type SidebarListProps = {
  entry: SidebarListEntry;
};

type SidebarProps = {
  toc: string;
  guidesToc: GuideMeta[];
};

const SidebarList = ({ entry }: SidebarListProps) => {
  return (
    <>
      <GroupLabel entry={entry} />

      <ul className={`menu menu-compact w-full bg-base-100`}>
        <For each={entry.children}>
          {(childEntry, i) => (
            <li
              key={`${i}${childEntry.slug}`}
              className={
                'relative w-full pl-0 text-sm leading-4 text-gray-500 hover:text-black'
              }
            >
              <GuideLink entry={childEntry} />
            </li>
          )}
        </For>
      </ul>
    </>
  );
};

export const Sidebar = ({ guidesToc }: SidebarProps) => {
  const home: SidebarListEntry = {
    slug: '/',
    title: '',
    children: [
      { slug: '/', title: 'Home', children: [] },
      { slug: '/tutorial', title: 'Start Workshop', children: [] },
    ],
  };

  const filteredGuides = guidesToc.filter((g) => g.slug !== '/');
  const keyFor = (e, i) => `s${i}${e.slug}${e.title}`;

  const tocComps = {
    dirLabel: (entry, key) => <GroupLabel entry={entry} key={key} />,
    headline: (entry, key) => (
      <h2 className="mt-5 text-[1.5rem]" key={key}>
        {entry.title}
      </h2>
    ),
    list: (entry, key) => <SidebarList entry={entry} key={key} />,
    link: (entry, key) => <GuideLink entry={entry} key={key} />,
  };

  const tocRules = {
    dirLabel: (entry) => entry.isDir && entry.children.length > 0,
    headline: (entry) => entry.isDir && entry.children.length == 0,
    list: (entry) => !entry.isDir && entry.children.length > 0,
    link: (entry) => !entry.isDir && entry.children.length == 0,
  };

  const guideToc = filteredGuides.map((entry, i) => {
    const fact = Object.keys(tocRules).find((k) => tocRules[k](entry))!;
    return tocComps[fact](entry, keyFor(entry, i));
  });

  return (
    <div className="sidebar mt-8 hidden bg-white pl-0">
      <div className="inner">
        <SidebarList entry={home} />
        {guideToc}
      </div>
    </div>
  );
};
