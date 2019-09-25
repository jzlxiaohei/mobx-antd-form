import * as React from 'react';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import { IFormHooksModel } from '../create-model';

function FormWrapper<M>(
  props: IFormComponentProps & {
    children: (model: IFormHooksModel<M>) => React.ReactElement;
  },
) {
  return props.children(props.model);
}

export default formHoc(FormWrapper);

// export default function FormWrapper(props: Omit<ICommonInputProps<any>, 'path'>) {
//   let className = 'm-form-item-wrapper';
//   if (props.className) {
//     className += ` ${props.className}`;
//   }
//   return (
//     <FormContext.Consumer>
//       {contextValue => (
//         <Form.Item
//           className={className}
//           {...(props.itemProps || contextValue.itemProps)}
//           label={props.label}
//         >
//           {props.children}
//         </Form.Item>
//       )}
//     </FormContext.Consumer>
//   );
// }
