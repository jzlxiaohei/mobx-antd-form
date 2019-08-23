import * as React from 'react';
import {
  FormInput,
  FormCheckbox,
  FormContext,
  FormButton,
} from '@jzl/m-form/src';
import { observer, useLocalStore } from 'mobx-react';
import { Button } from 'antd';
import { toJS } from 'mobx';
import { create } from './model';

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

export default observer(function TodoDemo() {
  const store = useLocalStore(create);
  React.useEffect(() => {
    store.fetchAction.run();
  }, []);
  function handleClick() {
    store.addTodo();
  }
  function handleConsole() {
    console.log(toJS(store));
  }
  return (
    <div className="todo-demo">
      {
        <div>
          {store.doneNumber} / {store.total}
        </div>
      }
      <FormContext itemProps={formItemLayout}>
        {store.todos.map(todo => {
          return (
            <React.Fragment key={todo.id}>
              <FormInput
                label="text"
                model={todo}
                path="text"
                ruleFn={value => (!value ? 'required' : null)}
              />
              <FormCheckbox label="done" model={todo} path="done" />
            </React.Fragment>
          );
        })}
        <FormButton loading={store.fetchAction.loading}>Submit</FormButton>
      </FormContext>
      <Button onClick={handleClick}>添加todo</Button> <br />
      <Button onClick={handleConsole}>console store</Button>
    </div>
  );
});
