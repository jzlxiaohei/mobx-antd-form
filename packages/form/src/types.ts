import { FormItemProps } from 'antd/lib/form/FormItem';

export type ValidateFn<M> = ((value: any, model: M) => string | void) | string;

export interface IFormComponentProps {
  value: any;
  onChange(value: any): void;
  [x: string]: any;
}
export interface ICommonOption {
  key?: string;
  title: string;
  value: any;
}

export interface IChangeParam<M> {
  value: any;
  model: M;
  path: string;
  defaultChangeFn?(): void;
}

export interface ICommonInputProps<M> {
  model?: M;
  path?: string;
  value?: any;
  onChange?(param: IChangeParam<M>): void;
  afterChange?(param: IChangeParam<M>): void;
  beforeChange?(
    param: IChangeParam<M> & {
      oldValue?: any;
    },
  ): boolean | void;
  transformViewToModel?(value: any, props: ICommonInputProps<M>): any;
  transformModelToView?(mValue: any, props: ICommonInputProps<M>): any;
  getValue?(model: M, path: string): any;
  label?: string | React.ReactNode;
  itemProps?: FormItemProps;
  noFormItem?: boolean;
  rules?: ValidateFn<M> | ValidateFn<M>[];
  needValidate?: boolean;
  suffixTip?: React.ReactNode;
  options?: ICommonOption[];
  dayFlags?: string[];
  dayFlag?: string;
  [x: string]: any;
}
