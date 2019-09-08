import * as React from 'react';
import { Radio } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ICommonInputProps, ICommonOption } from '../types';

interface F {
  <M extends Object>(rawProps: ICommonInputProps<M>): React.ReactElement;
  Button: typeof Radio.Button;
  Radio: typeof Radio;
}

interface IProps {
  options?: ICommonOption[];
}

const FormRadioGroup = formHoc(function(props: IFormComponentProps & IProps) {
  function handleChange(e: RadioChangeEvent) {
    props.onChange(e.target.value);
  }
  const { options, children, ...otherProps } = props;
  let localChildren = children;
  if (options && !children) {
    localChildren = options.map(opt => {
      return (
        <Radio key={opt.key || opt.value} value={opt.value}>
          {opt.title}
        </Radio>
      );
    });
  }
  return (
    <Radio.Group {...otherProps} value={props.value} onChange={handleChange}>
      {localChildren}
    </Radio.Group>
  );
}) as F;

FormRadioGroup.Button = Radio.Button;
FormRadioGroup.Radio = Radio;

export default FormRadioGroup;
