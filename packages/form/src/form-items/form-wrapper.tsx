import * as React from 'react';
import formHoc, { IOriginProps } from './hoc';

export default formHoc(function FormCustom(props: IOriginProps) {
  return <React.Fragment>{props.children}</React.Fragment>;
});
