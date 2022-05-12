import clsx from 'clsx';
import { SidebarListProps } from 'components/guide/sidebar';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';

const {
  publicRuntimeConfig: { basePath },
} = getConfig();

export const GuideLink = ({ entry }: SidebarListProps) => {
  const router = useRouter();
  const path = router.asPath;
  const active = path == `${entry.slug}/`.replace('//', '/');

  return (
    <Link href={entry.slug}>
      <a href={`${basePath}${entry.slug}`} className={clsx({ block: true, active })}>
        {entry.title}
      </a>
    </Link>
  );
};
