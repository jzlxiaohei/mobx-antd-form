import * as React from 'react';
import { Tag } from 'antd';
import formHoc from '../hoc';
import { IFormComponentProps } from '../types';
import { ICommonOption } from '../types';

const { CheckableTag } = Tag;

interface IRecordOption extends ICommonOption {
  checked: boolean;
}

interface IProps {
  options: ICommonOption[];
}

// value: [1,2,3]
export default formHoc(function(props: IProps & IFormComponentProps) {
  const originValue: any[] = props.value;
  const records = props.options.map(opt => {
    return {
      ...opt,
      checked: originValue.includes(opt.value),
    };
  });
  function handleChange(recordOpt: IRecordOption, checked: boolean) {
    recordOpt.checked = checked;
    const outValue = records.filter(v => v.checked).map(v => v.value);
    props.onChange(outValue);
  }

  return (
    <div>
      {records.map(opt => {
        return (
          <CheckableTag
            key={opt.key || opt.value}
            checked={opt.checked}
            onChange={checked => handleChange(opt, checked)}
          >
            {opt.title}
          </CheckableTag>
        );
      })}
    </div>
  );
});
