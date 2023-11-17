import { getFunctionCaller } from "../../src/utils/tracings";

describe("getFunctionCaller", () => {
  test("should return the caller function name when called inside a function", () => {
    function testFunction() {
      return getFunctionCaller();
    }

    const result = testFunction();
    expect(result).toContain("testFunction");
  });

  test("should return undefined when called outside a function", () => {
    jest.spyOn(global, "Error").mockImplementation(() => ({
      name: "mockError",
      message: "mock",
      stack: undefined,
    }));

    const result = getFunctionCaller();
    expect(result).toBeUndefined();
  });
});
