/* eslint-disable @typescript-eslint/no-unsafe-argument -- necessary */
const prefix = "[ollie]";

class OllieConsole {
  public warn(...args: any[]) {
    console.warn(prefix, ...args);
  }

  public error(...args: any[]) {
    console.error(prefix, ...args);
  }

  public info(...args: any[]) {
    console.info(prefix, ...args);
  }
}

export const ollieConsole = new OllieConsole();
