import * as React from 'react';
import FormInput from './form-hooks/form-items/input';
import FormCheckbox from './form-hooks/form-items/checkbox';
import FormDateRange from './form-hooks/form-items/date-range';

import { createModel } from './form-hooks/create-model';

export function TestInput() {
  const model = createModel({
    name1: 'zilong',
    checked: true,
    dateRange: [],
  });

  return (
    <div>
      <FormCheckbox model={model} path="checked" />
      <FormInput model={model} path="name1" />
      <FormDateRange model={model} path="dateRange" />
    </div>
  );
}
