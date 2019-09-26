import { FormItemProps } from 'antd/lib/form/FormItem';
import { IFormHooksModel } from './create-model';

export type dayFlag = 'end' | 'start';

export type ValidateFn<M> = ((value: any, model: M) => string | void) | string;

export interface IFormComponentProps {
  value: any;
  onChange?(value: any): void;
  [x: string]: any;
}
export interface ICommonOption {
  key?: string;
  title: string;
  value: any;
}

export interface IChangeParam<M> {
  value: any;
  state?: M;
  path?: string;
  defaultChangeFn?(): void;
}

export interface ICommonFormOuterProps<M> {
  path?: string;
  // value?: any;
  onChange?(param: IChangeParam<M>): void;
  beforeChange?(
    param: IChangeParam<M> & {
      oldValue?: any;
    },
  ): boolean | void;
  transformViewToModel?(value: any, props: ICommonFormOuterProps<M>): any;
  transformModelToView?(mValue: any, props: ICommonFormOuterProps<M>): any;
  getValue?(model: M, path: string): any;
  label?: string | React.ReactNode;
  itemProps?: FormItemProps;
  noFormItem?: boolean;
  rules?: ValidateFn<M> | ValidateFn<M>[];
  needValidate?: boolean;
  suffixTip?: React.ReactNode;
  options?: ICommonOption[];
  dayFlags?: dayFlag[];
  dayFlag?: dayFlag;
  // children?: (model: IFormHooksModel<M>) => React.ReactElement;
  [x: string]: any;
}
