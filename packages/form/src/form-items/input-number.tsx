import * as React from 'react';
import { InputNumber } from 'antd';
import formHoc, { IFormComponentProps } from './hoc';

export default formHoc(function FormInput(props: IFormComponentProps) {
  function handleChange(value: number) {
    props.onChange(value);
  }

  return <InputNumber {...props} value={props.value} onChange={handleChange} />;
});
