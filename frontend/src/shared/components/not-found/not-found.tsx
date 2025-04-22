import Link from 'next/link';
import { Button } from '@/shared/ui/button/button.component';
import { Wrapper } from '@/shared/ui/wrapper';
import style from './not-found.module.scss';

const NotFoundContent = () => {
  return (
    <Wrapper>
      <div className={style.wrapper}>
        <h1>Oopps! Page not found</h1>
        <Link href="/" passHref>
          <Button btnType="button" color="dark">
            Back to main
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFoundContent;
