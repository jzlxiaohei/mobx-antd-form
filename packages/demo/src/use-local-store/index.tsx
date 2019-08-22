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

let idIndex = 0;

type ITodo = {
  id: string;
  text: string;
  done: boolean;
  toggleDone: () => void;
};

function createTodo() {
  return {
    id: `${idIndex++}`,
    text: '',
    done: false,
    toggleDone() {
      this.done = !this.done;
    },
  } as ITodo;
}

function createTodos() {
  return {
    todos: [] as ITodo[],
    addTodo() {
      this.todos.push(createTodo());
    },
    get total() {
      return this.todos.length;
    },
    get doneNumber() {
      return this.todos.filter((todo: ITodo) => todo.done).length;
    },
  };
}

export default observer(function TodoDemo() {
  const store = useLocalStore(createTodos);
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
      <FormContext validateAtFirst itemProps={formItemLayout}>
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
        <FormButton>Submit</FormButton>
      </FormContext>
      <Button onClick={handleClick}>添加todo</Button> <br />
      <Button onClick={handleConsole}>console store</Button>
    </div>
  );
});
