import * as React from 'react';
import FormInput from './form-hooks/form-items/input';
import FormCheckbox from './form-hooks/form-items/checkbox';
import FormDateRange from './form-hooks/form-items/date-range';
import FormTagGroup from './form-hooks/form-items/tag-group';

import { createModel } from './form-hooks/create-model';

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
      <FormCheckbox model={model} path="checked" />
      <FormInput model={model} path="name1" beforeChange={handleBefore} />
      <FormDateRange model={model} path="dateRange" />
      <FormTagGroup
        model={model}
        path="optionValue"
        options={[{ title: '1', value: 1 }, { title: '2', value: 2 }]}
      />
    </div>
  );
}
