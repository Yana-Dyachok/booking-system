import React, { SVGProps } from 'react';

export const LogOutSvg = ({ ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={30} fill="none" viewBox="0 0 48 48" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M23.992 6H6v36h18M33 33l9-9-9-9M16 23.992h26"
    />
  </svg>
);
