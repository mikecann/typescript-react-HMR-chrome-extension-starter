import { increment } from "../../src/common/Counter";

it("increments as expected", () => {
  expect(increment(1)).toEqual(2);
  expect(increment(68)).toEqual(69);
  expect(increment(-68)).toEqual(-67);
});
