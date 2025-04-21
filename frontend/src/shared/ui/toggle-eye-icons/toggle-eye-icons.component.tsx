import React from 'react';
import Image from 'next/image';
import { IToggleEyeIconsProps } from './toggle-eye-icons.interfaces';
import CloseEye from '../../assets/svg/close-eye-password.svg';
import OpenEye from '../../assets/svg/open-eye-password.svg';
import styles from './toggle-eye-icons.module.scss';

export const ToggleEyeIcons: React.FC<IToggleEyeIconsProps> = ({
  isShow,
  onToggle,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={() => onToggle(!isShow)}>
        <Image
          src={isShow ? OpenEye : CloseEye}
          alt="eye"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};
