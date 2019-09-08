import * as React from 'react';
import { InputNumber } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';

export default formHoc(function FormInput(props: IFormComponentProps) {
  function handleChange(value: number) {
    props.onChange(value);
  }

  return <InputNumber {...props} value={props.value} onChange={handleChange} />;
});
