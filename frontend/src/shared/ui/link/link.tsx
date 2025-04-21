import Link from 'next/link';
import style from './link.module.scss';

type LinkProps = {
  children: string;
  to: string;
  color: 'dark' | 'light';
};

export const LinkItem = ({ children, to, color }: LinkProps) => {
  return (
    <Link
      href={to}
      className={`${color === 'light' ? style.linkLight : style.linkDark}`}
    >
      {children}
    </Link>
  );
};
