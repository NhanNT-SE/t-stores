import { sum } from "./sum";

describe("Calculator 2 number", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
  it("minus 2 - 1 to equal 1", () => {
    expect(2 - 1).toBe(1);
  });
});
