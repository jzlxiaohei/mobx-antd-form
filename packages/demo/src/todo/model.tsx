import { observable } from 'mobx';

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

export class Todo {
  @observable name = '';
  @observable done = false;
  @observable priority: TodoPriority = undefined;
  @observable category = TodoCategory.Life;
  @observable giveUpReason = GiveUpReason.NoNeed;
  @observable otherGiveUpReasonText = '';
  @observable createDate = new Date().getTime();
  @observable createDateUnix = new Date().getTime() / 1000;
  @observable dateRange: number[] = [];
  @observable nested = {
    name: 'error',
  };
}
