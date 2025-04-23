import React, { SVGProps } from 'react';

export const ProfileSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={30} height={35} fill="none" viewBox="0 0 24 24" {...props}>
    <g stroke="currentColor" strokeWidth={2.5} clipPath="url(#a)">
      <path
        strokeLinejoin="round"
        d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
      />
      <circle cx={12} cy={7} r={3} />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
