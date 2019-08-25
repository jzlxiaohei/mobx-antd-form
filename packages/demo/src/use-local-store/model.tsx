import { AsyncAction } from '../utils/async';
import { useLocalStore } from 'mobx-react';

let idIndex = 0;

export type ITodo = {
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

function fetch() {
  return new Promise(resolve => {
    setTimeout(() => resolve([createTodo()]), 1000);
  });
}

export function useTodos() {
  const result = useLocalStore(() => {
    return {
      todos: [] as ITodo[],
      addTodo() {
        this.todos.push(createTodo());
      },
      get total() {
        return result.todos.length;
      },
      get doneNumber() {
        return result.todos.filter((todo: ITodo) => todo.done).length;
      },
      fetchAction: new AsyncAction(async () => {
        await fetch();
        result.addTodo();
      }),
    };
  });
  return result;
}
