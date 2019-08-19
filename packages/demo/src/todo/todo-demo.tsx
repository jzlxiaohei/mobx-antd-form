import * as React from 'react';
import {
  FormInput,
  FormCheckbox,
  FormSelect,
  FormRadioGroup,
  FormDate,
  FormDateRange,
  FormContext,
  buildValidator,
  FormButton,
  FormWrapper,
} from '@jzl/m-form/src';
import { observer } from 'mobx-react';
import { Todo, TodoCategory, TodoPriority, GiveUpReason } from './model';
import { Button } from 'antd';
import { toJS } from 'mobx';
import './index.less';

export const PriorityOptions = [
  {
    value: TodoPriority.Low,
    title: '低',
  },
  {
    value: TodoPriority.Normal,
    title: '一般',
  },
  {
    value: TodoPriority.High,
    title: '高',
  },
];

export const CategoryOptions = [
  { value: TodoCategory.Life, title: '生活相关' },
  { value: TodoCategory.Work, title: '工作相关' },
];

export const GiveUpOptions = [
  { value: GiveUpReason.NoNeed, title: '可以做，但没必要' },
  { value: GiveUpReason.TooHard, title: '我太难了' },
  { value: GiveUpReason.HaveDoneByOtherWay, title: '其他方式解决' },
  { value: GiveUpReason.OtherReason, title: '其他原因...' },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

// const todo = new Todo();
// // for watching value in console;
// (window as any).todo = todo;

// setTimeout(() => {
//   todo.fetchList.push('test');
// }, 1000);

function addValidator(todo: Todo) {
  return buildValidator(todo, {
    name: (value: string, model) => {
      return value === 'error' && model.done ? 'invalid' : undefined;
    },
    'nested.name': (value: any) => {
      return value === 'error' ? 'invalid' : undefined;
    },
    family: value => {
      if (!value.length) {
        return 'require at least one family member';
      }
      return;
    },
  });
}

// (window as any).validator = validator;

export default observer(function TodoDemo() {
  const todo = React.useRef<Todo>(new Todo()).current;
  const validator = addValidator(todo);

  function handelAddFamily() {
    todo.family.push('');
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    todo.fetchAction.run();
    console.log(toJS(todo));
  }
  return (
    <div className="todo-demo">
      <FormContext
        onSubmit={handleSubmit}
        model={todo}
        validator={validator}
        itemProps={formItemLayout}
      >
        <FormInput
          className="input-class"
          label="name"
          path="name"
          placeholder="输入`error`并勾选done，有错误提示"
        />
        <FormInput label="嵌套属性" path="nested.name" />
        <FormCheckbox label="done" path="done" />
        <FormDate path="createDate" label="创建时间" />
        <FormDate
          model={todo}
          path="createDateUnix"
          label="创建时间(unix)"
          unix
          showTime
        />
        <FormDateRange path="dateRange" label="range" />

        <FormRadioGroup label="放弃原因" path="giveUpReason">
          {GiveUpOptions.map(opt => {
            return (
              <FormRadioGroup.Radio key={opt.value} value={opt.value}>
                {opt.title}
                {todo.giveUpReason === GiveUpReason.OtherReason &&
                  opt.value === GiveUpReason.OtherReason && (
                    <FormInput model={todo} path="otherGiveUpReasonText" />
                  )}
              </FormRadioGroup.Radio>
            );
          })}
        </FormRadioGroup>

        <FormSelect
          label="优先级"
          model={todo}
          path="priority"
          style={{
            minWidth: '200px',
          }}
          mode="multiple"
        >
          {PriorityOptions.map(opt => (
            <FormSelect.Option key={opt.value} {...opt}>
              {opt.title}
            </FormSelect.Option>
          ))}
        </FormSelect>

        <FormSelect
          label="分类"
          model={todo}
          path="category"
          style={{
            minWidth: '200px',
          }}
        >
          {CategoryOptions.map(opt => (
            <FormSelect.Option key={opt.value} {...opt}>
              {opt.title}
            </FormSelect.Option>
          ))}
        </FormSelect>
        <FormWrapper label="家庭成员" path="family">
          {todo.family.map((f, index) => (
            <FormInput key={index} model={todo.family} path={`${index}`} />
          ))}
          <Button onClick={handelAddFamily}>添加</Button>
        </FormWrapper>

        <FormButton
          htmlType="submit"
          type="primary"
          loading={todo.fetchAction.loading}
        >
          Submit (Data in Console)
        </FormButton>
      </FormContext>
    </div>
  );
});
