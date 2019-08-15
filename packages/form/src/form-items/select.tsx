import * as React from 'react';
import { Select } from 'antd';
import formHoc, { IOriginProps } from './hoc';
import { ICommonInputProps } from '../types';
import { SelectValue } from 'antd/lib/select';

interface F {
  <M extends Object>(rawProps: ICommonInputProps<M>): React.ReactElement;
  Option?: typeof Select.Option;
  OptGroup?: typeof Select.OptGroup;
}

const FormSelect: F = formHoc(function FormSelect(props: IOriginProps) {
  function handleChange(value: SelectValue) {
    props.onChange(value);
  }

  return <Select {...props} value={props.value} onChange={handleChange} />;
});

FormSelect.Option = Select.Option;
FormSelect.OptGroup = Select.OptGroup;

export default FormSelect;
