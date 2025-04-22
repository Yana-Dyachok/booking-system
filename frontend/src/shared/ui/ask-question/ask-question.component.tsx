import React from 'react';
import { LinkItem } from '../link/link.component';
import styles from './ask-question.module.scss';

interface AskQuestionProps {
  text: string;
  link: string;
  linkText: string;
}

export const AskQuestion: React.FC<AskQuestionProps> = ({
  text,
  link,
  linkText,
}) => {
  return (
    <div className={styles.askBlock}>
      <h3>{text}</h3>
      <LinkItem color="light" to={link}>
        {linkText}
      </LinkItem>
    </div>
  );
};
