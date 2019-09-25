import * as React from 'react';
import { createModel } from './form-hooks/create-model';
import {
  FormContext,
  FormButton,
  FormCheckbox,
  FormInput,
  FormDateRange,
  FormTagGroup,
} from './form-hooks';

export function TestInput() {
  const model = createModel({
    name1: 'zilong',
    checked: true,
    dateRange: [],
    optionValue: '',
  });

  function handleBefore(
    { oldValue, value } = { oldValue: String, value: String },
  ) {
    console.log(oldValue, value);
  }

  return (
    <div>
      <FormContext>
        <FormCheckbox model={model} path="checked" />
        <FormInput
          rules={value => {
            if (value === '111') {
              return '222';
            }
          }}
          model={model}
          path="name1"
          beforeChange={handleBefore}
        />
        <FormDateRange model={model} path="dateRange" />
        <FormTagGroup
          model={model}
          path="optionValue"
          options={[{ title: '1', value: 1 }, { title: '2', value: 2 }]}
        />
        <FormButton>保存</FormButton>
      </FormContext>
    </div>
  );
}
