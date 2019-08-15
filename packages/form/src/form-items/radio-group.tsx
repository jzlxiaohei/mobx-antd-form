import * as React from 'react';
import { Radio } from 'antd';
import formHoc, { IOriginProps } from './hoc';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ICommonInputProps } from './utils/types';

interface F {
  <M extends Object>(rawProps: ICommonInputProps<M>): React.ReactElement;
  Button?: typeof Radio.Button;
  Radio?: typeof Radio;
}

const FormRadioGroup: F = formHoc(function(props: IOriginProps) {
  function handleChange(e: RadioChangeEvent) {
    props.onChange(e.target.value);
  }

  return <Radio.Group {...props} value={props.value} onChange={handleChange} />;
});

FormRadioGroup.Button = Radio.Button;
FormRadioGroup.Radio = Radio;

export default FormRadioGroup;
