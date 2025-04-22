import Link from 'next/link';
import { Button } from '@/shared/ui/button/button.';
import style from './not-found.module.scss';

const NotFoundContent = () => {
  return (
    <div className={style.block}>
      <div className={style.wrapper}>
        <h1>Oopps! Page not found</h1>
        <Link href="/" passHref>
          <Button btnType="button" color="dark">
            Back to main
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundContent;
