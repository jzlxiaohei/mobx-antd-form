import * as React from 'react';
import { InputNumber } from 'antd';
import formHoc, { IOriginProps } from './hoc';

export default formHoc(function FormInput(props: IOriginProps) {
  function handleChange(value: number) {
    props.onChange(value);
  }

  return <InputNumber {...props} value={props.value} onChange={handleChange} />;
});
