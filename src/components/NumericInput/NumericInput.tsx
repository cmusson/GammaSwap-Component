import styles from './NumericInput.module.css';

interface IInputProps {
  value: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
}

const NumericInput = ({ value, setInput, handleInput }: IInputProps) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        min={''}
        value={`${value}`}
        onBlur={(e) => setInput(e.target.value)}
        onChange={handleInput}
        placeholder="0"
        step="any"
      />
      <h3>USD</h3>
    </div>
  );
};

export default NumericInput;
