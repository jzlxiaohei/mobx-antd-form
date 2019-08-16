import { FormItemProps } from 'antd/lib/form/FormItem';
import { Validator } from './validator';

export interface IChangeParam<M, T> {
  value: any;
  model: M;
  path: T;
}

export interface ICommonInputProps<M> {
  model?: M;
  path: string;
  value?: any;
  onChange?(param: IChangeParam<M, any>): void;
  transformViewToModel?(value: any, props: ICommonInputProps<M>): any;
  transformModelToView?(mValue: any, props: ICommonInputProps<M>): any;
  getValue?(model: M, path: string): any;
  label?: string;
  itemProps?: FormItemProps;
  noFormItem?: boolean;
  validator?: Validator<M>;
  [x: string]: any;
}
