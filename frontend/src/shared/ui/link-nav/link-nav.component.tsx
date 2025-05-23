'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface LinkNavProps {
  href: string;
  children: ReactNode;
  activeClassName?: string;
  className?: string;
}

export const LinkNav: React.FC<LinkNavProps> = ({
  href,
  children,
  activeClassName = 'active',
  className,
  ...props
}) => {
  const pathname = usePathname();
  const cleanHref = href.split('?')[0];
  const isActive =
    cleanHref === '/' ? pathname === '/' : pathname.startsWith(cleanHref);

  const linkClassName = isActive
    ? `${className || ''} ${activeClassName}`.trim()
    : className;

  return (
    <Link href={href} className={linkClassName} {...props}>
      {children}
    </Link>
  );
};
