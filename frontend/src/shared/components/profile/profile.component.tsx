'use client';
import React from 'react';
import { PersonalInfo } from './personal-info.component';
import { Wrapper } from '@/shared/ui/wrapper';
import { DeleteAccountButton } from '../delete-account-button/delete-account-button';

import styles from './profile.module.scss';
import { LinkItem } from '@/shared/ui/link';

export const ProfileComponent: React.FC = () => {
  return (
    <Wrapper>
      <div className={styles.profileBlock}>
        <div>
          <PersonalInfo />
          <div>
            <LinkItem to="/profile/change-password" color="dark">
              Change password
            </LinkItem>
          </div>
        </div>
        <DeleteAccountButton />
      </div>
    </Wrapper>
  );
};
