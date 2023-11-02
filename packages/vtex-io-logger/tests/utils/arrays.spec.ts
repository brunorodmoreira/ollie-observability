import { addItemToPosition } from "../../src/utils/arrays";

describe("addItemToPosition", () => {
  it("should add an item to the beginning of the array when position is 0", () => {
    const array = [1, 2, 3];
    const item = 0;
    const position = 0;

    const result = addItemToPosition(array, item, position);

    expect(result).toEqual([0, 1, 2, 3]);
  });

  it("should add an item to the end of the array when position is array length", () => {
    const array = [1, 2, 3];
    const item = 4;
    const position = array.length;

    const result = addItemToPosition(array, item, position);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("should add an item to the specified position in the array", () => {
    const array = [1, 2, 3];
    const item = 1.5;
    const position = 1;

    const result = addItemToPosition(array, item, position);

    expect(result).toEqual([1, 1.5, 2, 3]);
  });

  it("should return a new array and not mutate the original one", () => {
    const array = [1, 2, 3];
    const item = 4;
    const position = 1;

    const result = addItemToPosition(array, item, position);

    expect(result).not.toBe(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
