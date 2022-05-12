import { useState } from 'react';

export const InnerToc = ({ toc }: any) => {
  const [active, setActive] = useState(null);

  const regex = /<a class=".[^"]*?" href="(.*?)">(.*?)<\/a>/g;
  const links = [...toc.matchAll(regex)];
  if (links.length < 2) return null;

  return (
    <>
      <p className="text-md mt-5 mb-2 block pl-[1rem] font-semibold uppercase tracking-wider">
        On this page
      </p>

      <nav>
        <ul className="menu menu-compact w-full bg-base-100">
          {links.map(([_, href, text], i) => (
            <li key={i} className={active === href ? 'bordered' : ''}>
              <a
                href={href}
                className={`text-gray-500 ${active === href ? 'active' : ''}`}
                onClick={() => setActive(href)}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export const Toc = ({ toc }: any) => (
  <div className="toc hidden h-full pl-5 pr-5">
    <div className="inner">
      <InnerToc toc={toc} />
    </div>
  </div>
);
