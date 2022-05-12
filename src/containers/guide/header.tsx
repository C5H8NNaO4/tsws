import clsx from 'clsx';
import { ArrowRight, Logo } from 'components/icon';
import Link from 'next/link';

export function Header() {
  const isTutorial = false;
  const href = { href: '/tutorial' };

  return (
    <header
      className={clsx({
        'fixed top-0 left-0 right-0': !isTutorial,
        'sticky top-0': isTutorial,
        'border-athens-gray guide-page-wrapper z-40 h-[64px] border-b bg-white': true,
      })}
    >
      <div className={(isTutorial ? 'pl-8' : 'container ') + ' guide-wrapper'}>
        <div className="sidebar w-64 pt-[2px]">
          <Link href={'/'}>
            <a href="#">
              <Logo />
            </a>
          </Link>
        </div>

        <Link {...href}>
          <a
            href="#"
            className="toc hidden pl-[2rem] text-gray-600 transition-colors duration-200 hover:text-gray-800 lg:flex lg:items-center"
          >
            <span className="text-md mr-3 block font-semibold uppercase tracking-wider">
              {isTutorial ? 'Guide' : 'Workshop'}
            </span>

            <ArrowRight />
          </a>
        </Link>

        <div className="main-content flex-1 pr-6 md:px-8">&nbsp;</div>
      </div>
    </header>
  );
}
