import * as React from 'react';
import formHoc, { IFormComponentProps } from './hoc';

export default formHoc(function FormCustom(props: IFormComponentProps) {
  return <React.Fragment>{props.children}</React.Fragment>;
});
