import type { SidebarListProps } from 'components/guide/sidebar';

export const GroupLabel = ({ entry }: SidebarListProps) =>
  (entry.title && (
    <strong className="text-md mt-5 mb-2 block font-semibold uppercase tracking-wider">
      {entry.title}
    </strong>
  )) ||
  null;
