import { LogLevel, type ServiceContext } from "@vtex/api";
import { interceptNativeLogger } from "../../../src/core/interceptors/intercept-native-logger";
import type { Ollie } from "../../../src/types/ollie";

describe("interceptNativeLogger", () => {
  let nativeLog: jest.SpyInstance;
  let logger: Ollie.Logger;
  let mockContext: ServiceContext;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    nativeLog = jest.fn();

    mockContext = {
      vtex: {
        logger: {
          log: nativeLog,
        },
      },
    } as never;
  });

  afterEach(() => {
    nativeLog.mockRestore();
  });

  test("should call logger[logLevel] with correct arguments", () => {
    const message = "test";
    const logLevel = LogLevel.Info;

    interceptNativeLogger(mockContext, { logger });

    mockContext.vtex.logger.log(message, logLevel);

    expect(logger[logLevel]).toHaveBeenCalledWith(
      expect.objectContaining({ __VTEX_IO_LOG: true, data: message })
    );
  });

  test("should call nativeLog.apply with correct arguments", () => {
    const message = "test";
    const logLevel = LogLevel.Info;

    interceptNativeLogger(mockContext, { logger });

    mockContext.vtex.logger.log(message, logLevel);

    expect(nativeLog).toHaveBeenCalledWith(message, logLevel);
  });
});
