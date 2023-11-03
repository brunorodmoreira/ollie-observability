import {
  NATIVE_VTEX_LOGGER_TRACE,
  interceptNativeLogger,
} from "../../../src/core/interceptors/intercept-native-logger";
import type { Ollie } from "../../../src/types/ollie";
import { getFunctionCaller } from "../../../src/utils/tracings";

jest.mock("../../../src/utils/tracings", () => ({
  getFunctionCaller: jest.fn(),
}));

describe("interceptNativeLogger", () => {
  const getFunctionCallerMock = getFunctionCaller as jest.Mock;
  let nativeLog: jest.SpyInstance;
  let logger: Ollie.Logger;

  beforeEach(() => {
    nativeLog = jest.spyOn(global.console, "log").mockImplementation(() => {
      /* do nothing */
    });

    logger = {
      log: jest.fn(),
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };
  });

  afterEach(() => {
    nativeLog.mockRestore();
  });

  test("should call nativeLog when isVtex is false", () => {
    getFunctionCallerMock.mockReturnValue("at Random.Function (/random/path");

    interceptNativeLogger({ logger });

    global.console.log("test");

    expect(nativeLog).toHaveBeenCalledWith("test");
    expect(logger.log).not.toHaveBeenCalled();
  });

  test("should call logger.log and nativeLog when isVtex is true", () => {
    getFunctionCallerMock.mockReturnValue(NATIVE_VTEX_LOGGER_TRACE);

    interceptNativeLogger({ logger });

    global.console.log("test");

    expect(nativeLog).toHaveBeenCalledWith("test");
    expect(logger.log).toHaveBeenCalledWith("test");
  });
});
