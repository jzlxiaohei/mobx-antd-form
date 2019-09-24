import * as React from 'react';
import { Input } from 'antd';
import { IFormHooksModel } from './form-hooks/create-model';

export function FormHooksInput<M extends Record<string, any>>(props: {
  model: IFormHooksModel<M>;
  path: string;
}) {
  const data = props.model.data;
  const value = data[props.path];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    props.model.update(props.path, value as any);
  }
  return <Input value={value} onChange={handleChange}></Input>;
}
