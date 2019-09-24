import { FormItemProps } from 'antd/lib/form/FormItem';
import { IFormHooksModel } from './create-model';

export type dayFlag = 'end' | 'start';

export type ValidateFn =
  | ((value: any, model: Record<string, any>) => string | void)
  | string;

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

export interface IChangeParam {
  value: any;
  // model: IFormHooksModel<M>;
  defaultChangeFn?(): void;
}

export interface ICommonFormOuterProps<M> {
  model?: IFormHooksModel<M>;
  path?: string;
  value?: any;
  onChange?(param: IChangeParam): void;
  afterChange?(param: IChangeParam): void;
  beforeChange?(
    param: IChangeParam & {
      oldValue?: any;
    },
  ): boolean | void;
  transformViewToModel?(value: any, props: ICommonFormOuterProps<M>): any;
  transformModelToView?(mValue: any, props: ICommonFormOuterProps<M>): any;
  getValue?(model: M, path: string): any;
  label?: string | React.ReactNode;
  itemProps?: FormItemProps;
  noFormItem?: boolean;
  rules?: ValidateFn | ValidateFn[];
  needValidate?: boolean;
  suffixTip?: React.ReactNode;
  options?: ICommonOption[];
  dayFlags?: dayFlag[];
  dayFlag?: dayFlag;
  [x: string]: any;
}
