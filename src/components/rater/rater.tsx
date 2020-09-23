import React, {
  FC, ReactElement, useState, useEffect,
} from 'react';
import { Rate } from 'antd';

const desc = ['Junior', 'Middle', 'Senior', 'TeamLead', 'StudentRS ;)'];

const Rater: FC = (): ReactElement => {
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    console.log(`rate: ${rate} stars`);
  }, [rate]);

  const handleChange = (value: number) => {
    setRate(value);
  };

  return (
    <span>
      <Rate tooltips={desc} onChange={handleChange} value={rate} />
      {rate ? <span className="ant-rate-text">{desc[rate - 1]}</span> : ''}
    </span>
  );
};

export default Rater;
