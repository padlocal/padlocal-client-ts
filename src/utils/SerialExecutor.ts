export type SerialJobFunc = () => Promise<void>;

class SerialJob {
  readonly type: string | undefined;
  readonly func: SerialJobFunc;

  constructor(func: SerialJobFunc, type?: string) {
    this.func = func;
    this.type = type;
  }
}

export class SerialExecutor {
  private _jobs: SerialJob[];
  private _executing: boolean;

  constructor() {
    this._jobs = [];
    this._executing = false;
  }

  execute(jobFunc: SerialJobFunc, type?: string) {
    this._jobs.push(new SerialJob(jobFunc, type));

    this._executeNextJob();
  }

  /**
   * @param type: if type is undefined, clear all jobs in queue
   */
  clear(type?: string) {
    this._jobs = this._jobs.filter((job: SerialJob) => {
      if (!type) {
        return false;
      } else {
        return job.type !== type;
      }
    });
  }

  private _executeNextJob() {
    if (this._executing) {
      return;
    }

    const job = this._jobs.shift();
    if (!job) {
      return;
    }

    this._executing = true;

    job.func().finally(() => {
      this._executing = false;

      this._executeNextJob();
    });
  }
}
