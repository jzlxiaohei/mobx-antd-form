import * as React from 'react';
import { Select } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import { ICommonInputProps, ICommonOption } from '../types';
import { SelectValue } from 'antd/lib/select';

interface IProps {
  options?: ICommonOption[];
}

interface F {
  <M extends Object>(rawProps: ICommonInputProps<M>): React.ReactElement;
  Option?: typeof Select.Option;
  OptGroup?: typeof Select.OptGroup;
}

const FormSelect: F = formHoc(function FormSelect(props: IFormComponentProps & IProps) {
  function handleChange(value: SelectValue) {
    props.onChange(value);
  }

  const { options, children, ...otherProps } = props;
  let localChildren = children;

  if (options && !children) {
    localChildren = options.map(opt => {
      return (
        <Select.Option key={opt.key || opt.value} value={opt.value}>
          {opt.title}
        </Select.Option>
      );
    });
  }
  return (
    <Select {...otherProps} value={props.value} onChange={handleChange}>
      {localChildren}
    </Select>
  );
});

FormSelect.Option = Select.Option;
FormSelect.OptGroup = Select.OptGroup;

export default FormSelect;
