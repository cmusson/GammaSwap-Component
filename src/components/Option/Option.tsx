import styles from './Option.module.css';

interface IOption {
  type: { name: string; short?: boolean };
  selected: boolean;
}

interface IOptionProps {
  children: IOption;
  setOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
}

const Option = ({ children, setOptions }: IOptionProps) => {
  const handleClick = () => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.type.name === children.type.name ? { ...option, selected: true } : { ...option, selected: false }
      )
    );
  };

  const handleSecondClick = () => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.type.name === children.type.name
          ? { ...option, type: { name: option.type.name, short: !option.type.short } }
          : { ...option, type: { name: option.type.name, short: option.type.short } }
      )
    );
  };

  const infoText =
    children.type.name === 'Call'
      ? 'Buy at strike price'
      : children.type.name === 'Put'
      ? 'Sell at strike price'
      : 'Price will remain the same';

  return (
    <div className={styles.outerContainer}>
      <button
        title={infoText}
        onClick={() => {
          !children.selected && handleClick();
        }}
        className={`${styles.container} ${children.selected && styles.selected}`}
      >
        <h2>{children.type.name}</h2>
      </button>
      {children.selected && children.type.name !== 'Straddle ~' && (
        <div className={styles.shortLong}>
          <button
            title={'price will go down'}
            onClick={() => handleSecondClick()}
            className={`${styles.contract} ${children.type.short && styles.selected}`}
          >
            Short -
          </button>
          <button
            title={'price will go up'}
            onClick={() => handleSecondClick()}
            className={`${styles.contract} ${!children.type.short && styles.selected}`}
          >
            Long +
          </button>
        </div>
      )}
    </div>
  );
};

export default Option;
