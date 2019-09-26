import * as React from 'react';
import { IFormHooksModel } from './form-hooks/create-model';
import {
  FormContext,
  FormButton,
  FormCheckbox,
  FormInput,
  FormDateRange,
  FormTagGroup,
  FormWrapper,
  FormInputNumber,
} from '../../auto-form/src';
import { Button } from 'antd/lib/radio';
import { IChangeParam } from './form-hooks/types';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

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

  function handleSubmit({ state }: { state: IModelState }) {
    console.log(state);
  }

  function handleBefore(
    { oldValue, value } = { oldValue: String, value: String },
  ) {
    console.log(oldValue, value);
  }

  const handleItemChange = (args: IChangeParam<IModelState>) => {
    console.log(args);
  };

  function handleContextChange(args: { state: IModelState }) {
    setState(args.state);
  }

  // 传 initState 是 非受控模式，
  // 传 state 后，是受控的模式. 一般情况非受控模式即可，除非需要在onChange里，对 state 进行变更
  return (
    <div>
      <FormContext
        onSubmit={handleSubmit}
        state={state}
        onContextChange={handleContextChange}
        itemProps={formItemLayout}
      >
        <FormCheckbox path="checked" label="checked" />
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
        <FormInput path="nested.name" label="nested.name" />
        <FormInputNumber path="nested.age" label="nested.age" />
        <FormDateRange path="dateRange" label="date-range" />
        <FormTagGroup
          path="optionValue"
          label="options"
          options={[
            { title: '第一个', value: 1 },
            { title: '第二个', value: 2 },
          ]}
        />
        <FormWrapper noFormItem>
          {(model: IFormHooksModel<IModelState>) => {
            const Inputs = model.state.dynamicFields.map((f, index) => {
              return (
                <FormInput
                  label={f.name}
                  key={index}
                  path={`dynamicFields.${index}.name`}
                />
              );
            });
            function handleAddDynamic() {
              actions.addDynamicFields(model);
            }
            return (
              <React.Fragment>
                {Inputs}
                <div>
                  <Button onClick={handleAddDynamic}>add dynamicFields</Button>
                </div>
              </React.Fragment>
            );
          }}
        </FormWrapper>
        <FormButton>保存</FormButton>
      </FormContext>
    </div>
  );
}
