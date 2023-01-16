import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src="/images/gammaswap_logo.png" alt="logo" />
        <h1>GammaSwap</h1>
      </div>
      <p>Take out a loan against Eth in the form of an option</p>
    </div>
  );
};

export default Header;
