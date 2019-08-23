import { observable, runInAction } from 'mobx';

export type PromiseFn<M> = (...args: any[]) => Promise<M>;

export class AsyncAction<M> {
  @observable loading = false;

  @observable error: Record<string, any> = null;

  private asyncFn: PromiseFn<M> = null;

  constructor(asyncFn: PromiseFn<M>) {
    this.asyncFn = asyncFn;
  }

  run = (...args: any[]) => {
    runInAction(() => {
      this.loading = true;
    });
    this.asyncFn(args)
      .then((data: any) => {
        runInAction(() => {
          this.loading = false;
        });
        return data;
      })
      .catch((err: Record<string, any>) => {
        runInAction(() => {
          this.loading = false;
          this.error = err;
        });
      });
  };
}
