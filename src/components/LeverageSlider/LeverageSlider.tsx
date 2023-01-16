import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styles from './LeverageSlider.module.css';

interface ILeverageSlider {
  leverage: number;
  setLeverage: React.Dispatch<React.SetStateAction<number>>;
}

const LeverageSlider = ({ leverage, setLeverage }: ILeverageSlider) => {
  const valuetext = (x: number) => {
    setLeverage(() => x);
    return leverage.toString();
  };

  return (
    <Box sx={{ width: '90%' }}>
      <h3 className={styles.value}>{`Leverage on loan x ${leverage}`}</h3>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={0.1}
        marks
        min={1}
        max={25}
      />
    </Box>
  );
};

export default LeverageSlider;

// input ampunt x leverage x 0.95%
