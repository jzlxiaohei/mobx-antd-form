import * as React from 'react';
import { Checkbox } from 'antd';
import formHoc, { IFormComponentProps } from './hoc';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export default formHoc(function FormCheckbox(props: IFormComponentProps) {
  function handleChange(e: CheckboxChangeEvent) {
    props.onChange(e.target.checked);
  }

  return <Checkbox {...props} checked={props.value} onChange={handleChange} />;
});
