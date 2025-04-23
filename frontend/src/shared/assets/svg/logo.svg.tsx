import React, { SVGProps } from 'react';

export const LogoSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={35} height={30} {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      d="M18 4V0v4ZM7 18H5h2Zm12 0H9h10ZM7 14H5h2Zm12 0H9h10ZM6 4V0v4ZM1 9h22H1Zm0 14h22V4H1v19Z"
    />
  </svg>
);
