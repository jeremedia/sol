import * as Focus from "./focus.js";
import KeyCodes from "./keycodes.js";

test("adds focus class on tab press", () => {
  Focus.ShowFocusOnTabPress();

  const tabPress = new KeyboardEvent("keydown", { which: KeyCodes.TAB });
  document.body.dispatchEvent(tabPress);

  expect(document.documentElement.classList.contains(Focus.ShowFocusClass)).toBe(true);
});

test("removes focus class on body click", () => {
  Focus.RemoveFocusOnClick();
  document.documentElement.classList.add(Focus.ShowFocusClass);

  const mouseClick = new MouseEvent("click", { clientX: 20, clientY: 20 });
  document.body.dispatchEvent(mouseClick);

  expect(document.documentElement.classList.contains(Focus.ShowFocusClass)).toBe(false);
});
