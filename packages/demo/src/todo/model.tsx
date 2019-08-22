import { observable } from 'mobx';
import { AsyncAction } from './async';

export enum TodoPriority {
  Low,
  Normal,
  High,
}

export enum TodoCategory {
  Life,
  Work,
}

export enum GiveUpReason {
  NoNeed,
  TooHard,
  HaveDoneByOtherWay,
  OtherReason,
}

function fetch() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

export class Todo {
  constructor() {
    console.log('todo');
  }
  fetchAction = new AsyncAction(fetch);

  @observable fetchList: string[] = [];

  @observable number = 0;
  @observable name = '';
  @observable done = false;
  @observable priority: TodoPriority = undefined;
  @observable category = TodoCategory.Life;
  @observable giveUpReason = GiveUpReason.NoNeed;
  @observable otherGiveUpReasonText = '';
  @observable createDate: number = undefined;
  @observable createDateUnix = new Date().getTime() / 1000;
  @observable dateRange: number[] = [];
  @observable nested = {
    name: 'error',
  };

  @observable family: string[] = [];
}
