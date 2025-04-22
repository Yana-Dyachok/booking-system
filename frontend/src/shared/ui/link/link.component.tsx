import Link from 'next/link';
import { LinkProps } from './link.types';
import style from './link.module.scss';

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
