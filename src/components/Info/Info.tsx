import styles from './Info.module.css';

interface IInfoProps {
  info: string;
  value: string;
}

const Info = ({ info, value }: IInfoProps) => {
  return (
    <div className={styles.container}>
      <h3>{info}</h3>
      <h3>{value}</h3>
    </div>
  );
};

export default Info;
