import * as React from 'react';
import { Input } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';

export default formHoc(function FormInput(props: IFormComponentProps) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange(e.target.value);
  }

  return <Input.TextArea {...props} value={props.value} onChange={handleChange} />;
});
