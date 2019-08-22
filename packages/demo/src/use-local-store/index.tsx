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
  FormInputNumber,
} from '@jzl/m-form/src';
import { IChangeParam } from '@jzl/m-form/src/types';
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

function addValidator(todo: ITodo) {
  return buildValidator(todo, {
    text: (value: string) => {
      return value ? undefined : 'required';
    },
  });
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
      {store.todos.map(todo => {
        const validator = addValidator(todo);
        return (
          <FormContext key={todo.id} validator={validator} validateAtFirst>
            <FormInput label="text" model={todo} path="text" />
            <FormCheckbox label="done" model={todo} path="done" />
          </FormContext>
        );
      })}
      <Button onClick={handleClick}>添加todo</Button> <br />
      <Button onClick={handleConsole}>console store</Button>
    </div>
  );
});
