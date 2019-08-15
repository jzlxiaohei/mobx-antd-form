import * as React from 'react';
import {
  FormInput,
  FormCheckbox,
  FormSelect,
  FormRadioGroup,
  FormDate,
  FormDateRange,
  FormContext,
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
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const todo = new Todo();
const todo1 = new Todo();
// for watching value in console;
(window as any).todo = todo;
(window as any).todo1 = todo1;

export default observer(function TodoDemo() {
  function handelClick() {
    console.log(toJS(todo));
  }
  return (
    <div className="todo-demo">
      <FormContext model={todo1}>
        <FormInput
          itemProps={formItemLayout}
          className="input-class"
          label="name"
          path="name"
          placeholder="todo title"
        />
      </FormContext>
      <FormContext model={todo}>
        <FormInput
          itemProps={formItemLayout}
          className="input-class"
          label="name"
          path="name"
          placeholder="todo title"
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
                    <FormInput
                      noFormItem
                      model={todo}
                      path="otherGiveUpReasonText"
                    />
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
        <Button type="primary" onClick={handelClick}>
          查看数据 (in console)
        </Button>
      </FormContext>
    </div>
  );
});
