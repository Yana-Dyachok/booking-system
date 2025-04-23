import React, { SVGProps } from 'react';

export const OpenEyeSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={25} fill="none" {...props}>
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.096}
      d="M15.143 9a3.144 3.144 0 1 1-6.287 0 3.144 3.144 0 0 1 6.287 0Z"
    />
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.096}
      d="M12 1.664C7.308 1.664 3.335 4.748 2 9c1.335 4.252 5.308 7.336 10 7.336S20.665 13.252 22 9c-1.335-4.252-5.308-7.336-10-7.336Z"
    />
  </svg>
);
