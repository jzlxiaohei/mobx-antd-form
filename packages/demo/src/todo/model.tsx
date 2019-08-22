import { observable, extendObservable } from 'mobx';
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
    // extendObservable(this, {
    //   fetchList: [] as string[],
    //   number: 0,
    //   name: '',
    //   done: false,
    //   priority: undefined as TodoPriority,
    //   category: TodoCategory.Life,
    //   giveUpReason: GiveUpReason.NoNeed,
    //   otherGiveUpReasonText: '',
    //   createDate: undefined as number,
    //   createDateUnix: new Date().getTime() / 1000,
    //   dateRange: [] as number[],
    //   nested: {
    //     name: 'error',
    //   },
    //   family: [] as string[],
    // });`
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
