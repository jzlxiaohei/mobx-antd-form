import * as React from 'react';
import { createModel, IFormHooksModel } from './form-hooks/create-model';
import {
  FormContext,
  FormButton,
  FormCheckbox,
  FormInput,
  FormDateRange,
  FormTagGroup,
  FormWrapper,
  FormInputNumber,
} from './form-hooks';
import { Button } from 'antd/lib/radio';
import { IChangeParam } from './form-hooks/types';

function create() {
  return {
    name1: 'zilong',
    checked: true,
    dateRange: [] as number[],
    optionValue: '',
    dynamicFields: [] as { name: string }[],
    nested: {
      name: '',
      age: 10,
    },
  };
}

type IModelState = ReturnType<typeof create>;

const actions = {
  addDynamicFields(model: IFormHooksModel<IModelState>) {
    model.update(draft => {
      draft.dynamicFields.push({ name: '' });
    });
  },
};

export function TestInput() {
  const [state, setState] = React.useState(create());

  function handleBefore(
    { oldValue, value } = { oldValue: String, value: String },
  ) {
    // console.log(oldValue, value);
  }

  function handleSubmit(
    { state }: { state: IModelState },
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    console.log(state);
  }

  const handleItemChange = (args: IChangeParam<IModelState>) => {
    console.log(args);
  };

  function handleChange(args: { state: IModelState }) {
    setState(args.state);
  }

  return (
    <div>
      <FormContext
        onSubmit={handleSubmit}
        state={state}
        onContextChange={handleChange}
      >
        <FormCheckbox path="checked" />
        <FormInput
          rules={value => {
            if (value === '111') {
              return '不能输入111';
            }
          }}
          label="name1"
          onChange={handleItemChange}
          path="name1"
          beforeChange={handleBefore}
        />
        <FormInput path="nested.name" />
        <FormInputNumber path="nested.age" />
        <FormDateRange path="dateRange" />
        <FormTagGroup
          path="optionValue"
          options={[{ title: '1', value: 1 }, { title: '2', value: 2 }]}
        />
        <FormWrapper>
          {(model: IFormHooksModel<IModelState>) => {
            const Inputs = model.state.dynamicFields.map((f, index) => {
              return (
                <FormInput
                  label={f.name}
                  key={index}
                  path={`dynamicFields.${index}.name}`}
                />
              );
            });
            function handleAddDynamic() {
              actions.addDynamicFields(model);
            }
            return (
              <React.Fragment>
                {Inputs}
                <Button onClick={handleAddDynamic}>add dynamicFields</Button>
              </React.Fragment>
            );
          }}
        </FormWrapper>
        <FormButton>保存</FormButton>
      </FormContext>
    </div>
  );
}
