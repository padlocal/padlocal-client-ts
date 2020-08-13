export class RetryStrategy {
  // millisecond
  private static readonly FAST_RETRY_DELAYS = [1000, 1000, 2000, 3000, 5000, 10000, 10000];

  readonly maxRetry: number;
  private _retryCount: number;
  private readonly _retryDelays: number[];

  private constructor(retryDelays: number[], maxRetry: number) {
    this._retryCount = 0;
    this.maxRetry = maxRetry;
    this._retryDelays = retryDelays;
  }

  get retryCount(): number {
    return this._retryCount;
  }

  static getStrategy(rule: RetryStrategy.Rule, maxRetry: number): RetryStrategy {
    if (rule == RetryStrategy.Rule.FAST) {
      return new RetryStrategy(RetryStrategy.FAST_RETRY_DELAYS, maxRetry);
    }

    return new RetryStrategy(RetryStrategy.FAST_RETRY_DELAYS, maxRetry);
  }

  canRetry(): boolean {
    return this._retryCount < this.maxRetry;
  }

  reset(): void {
    this._retryCount = 0;
  }

  /**
   * @return millisecond
   */
  nextRetryDelay(): number {
    let index = this._retryCount++;
    if (index < this._retryDelays.length) {
      return this._retryDelays[index];
    } else {
      return this._retryDelays[this._retryDelays.length - 1];
    }
  }
}

export namespace RetryStrategy {
  export enum Rule {
    FAST,
  }
}
