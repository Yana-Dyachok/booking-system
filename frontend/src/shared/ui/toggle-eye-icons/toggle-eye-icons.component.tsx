import React from 'react';
import { IToggleEyeIconsProps } from './toggle-eye-icons.interfaces';
import { OpenEyeSvg } from '@/shared/assets/svg/open-eye';
import { CloseEyeSvg } from '@/shared/assets/svg/close-eye';
import styles from './toggle-eye-icons.module.scss';

export const ToggleEyeIcons: React.FC<IToggleEyeIconsProps> = ({
  isShow,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isShow)}
      className={styles.container}
    >
      {isShow ? <OpenEyeSvg /> : <CloseEyeSvg />}
    </button>
  );
};
