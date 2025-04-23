'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BackSVG } from '@/shared/assets/svg/back.svg';

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      style={{
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <BackSVG />
    </button>
  );
};
