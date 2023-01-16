import { SetStateAction, useState } from 'react';
import Option from '../Option';
import LeverageSlider from '../LeverageSlider';
import styles from './Card.module.css';
import Info from '../Info';
import NumericInput from '../NumericInput';

interface IOption {
  type: { name: string; short?: boolean };
  selected: boolean;
}

const Card = () => {
  const [options, setOptions] = useState<IOption[]>([
    { type: { name: 'Call', short: true }, selected: true },
    { type: { name: 'Put', short: true }, selected: false },
    { type: { name: 'Straddle ~' }, selected: false },
  ]);

  // selected option
  const selected = options.filter((option) => option.selected && option)[0];

  const [strike, setStrike] = useState('');
  const [loanInput, setLoanInput] = useState<string>('');
  const [leverage, setLeverage] = useState<number>(0);

  // sets number inputs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<SetStateAction<string>>) => {
    const numericChars = e.target.value.replace(/[^0-9.]+/, '');
    const [whole, dec] = numericChars.split('.');
    const unpaddedWhole = whole === '' ? '' : parseInt(whole) || 0;
    if (dec === undefined) {
      return setInput(`${unpaddedWhole}`);
    }
    const limitedDecimals = dec.slice(-2);
    return setInput([whole, limitedDecimals].join('.'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        {options.map((option, i) => (
          <Option key={`${option.type.name} ${i}`} setOptions={setOptions}>
            {option}
          </Option>
        ))}
      </div>

      <h3>Loan Amount USD</h3>
      <NumericInput value={loanInput} setInput={setLoanInput} handleInput={(e) => handleInput(e, setLoanInput)} />

      <div className={`${styles.ethInfo} ${loanInput === '' && styles.grey}`}>
        <h3>{loanInput === '' ? '0' : (Number(loanInput) * 0.00065).toString()}</h3>
        <h3>Eth</h3>
      </div>
      <LeverageSlider leverage={leverage} setLeverage={setLeverage} />
      <h3>Strike Price of Eth </h3>
      <h4>(current price 1Eth = $1538.46 )</h4>
      {selected.type.name === 'Straddle ~' ? (
        <div className={`${styles.ethInfo}`}>
          <h3>1538.46</h3>
          <h3>USD</h3>
        </div>
      ) : (
        <NumericInput value={strike} setInput={setStrike} handleInput={(e) => handleInput(e, setStrike)} />
      )}
      <div className={styles.info}>
        <Info
          info={'Amount borrowed (option purchasing power)'}
          value={`${(Number(loanInput) * leverage).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`}
        />
        <Info
          info={'Minimum required collateral'}
          value={`${(Number(loanInput) * 0.95).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}`}
        />
        <Info info={'Borrow fee'} value={'5% / yr'} />
        <Info info={'PnL'} value={'0'} />
      </div>
      <button className={styles.submit}>{`Purchase loan and execute a ${
        selected.type.name !== 'Straddle ~' ? (selected.type.short ? 'short' : 'long') : ''
      } ${selected.type.name}`}</button>
    </div>
  );
};

export default Card;
