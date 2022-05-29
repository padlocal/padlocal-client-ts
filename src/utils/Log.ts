import {log, Brolog } from "brolog";

export default class Log {
  private static _log?: Brolog;

  public static getLogger() : Brolog{
    return this._log ? this._log : log;
  }

  public static setLogger(log: Brolog) {
    this._log = log;
  }

  public static error (prefix: string, ...args: any[]): void {
    this.getLogger().error(prefix, args);
  }

  public static warn (prefix: string, ...args: any[]): void {
    this.getLogger().warn(prefix, args);
  }

  public static info (prefix: string, ...args: any[]): void {
    this.getLogger().info(prefix, args);
  }

  public static verbose (prefix: string, ...args: any[]): void {
    this.getLogger().verbose(prefix, args);
  }

  public static silly (prefix: string, ...args: any[]): void {
    this.getLogger().silly(prefix, args);
  }

}
