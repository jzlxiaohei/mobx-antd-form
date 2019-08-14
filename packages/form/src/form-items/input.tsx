import * as React from 'react';
import { Input } from 'antd';
import formHoc, { IOriginProps } from './utils/hoc';

export default formHoc(function FormInput(props: IOriginProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return <Input {...props} value={props.value} onChange={handleChange} />;
});
