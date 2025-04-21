'use client';

import Link from 'next/link';
import style from './button.module.scss';

type ButtonProps = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  color: 'dark' | 'light';
  onClick?: () => void;
};

export const Button = ({
  btnType = 'button',
  children,
  onClick,
  to,
  disabled,
  color,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <button
      className={`${style.button} ${
        color === 'light' ? style.buttonLight : style.buttonDark
      }`}
      disabled={disabled}
      type={btnType === 'button' ? 'button' : 'submit'}
      onClick={handleClick}
    >
      {children}
    </button>
  );

  if (to) {
    return (
      <Link href={to} passHref>
        {buttonContent}
      </Link>
    );
  }
  return buttonContent;
};
