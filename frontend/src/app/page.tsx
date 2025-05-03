import { Wrapper } from '@/shared/ui/wrapper';
import { Title } from '@/shared/ui/title';
import styles from '../shared/components/business/business.module.scss';

const Home = () => {
  return (
    <Wrapper>
      <div className={styles.wrapper}>
        <Title title="Welcome to Booking System!"></Title>
      </div>
    </Wrapper>
  );
};

export default Home;
