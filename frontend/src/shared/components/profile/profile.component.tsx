'use client';
import React from 'react';
import Link from 'next/link';
import { EditSVG } from '@/shared/assets/svg/edit.svg';
import { Title } from '@/shared/ui/title';
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
          <div className={styles.header}>
            <Title title="Personal information" />
            <Link href="/profile/edit-profile" className={styles.edit}>
              <EditSVG />
            </Link>
          </div>
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
