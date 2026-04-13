import SessionColor, {
  SESSION_COLOR_SEQUENCE,
  applySessionColorVariables,
  readSessionColorKey,
} from "./session-color";

describe("core session color", () => {
  beforeEach(() => {
    document.cookie = "sessionHighlightColor=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    document.documentElement.className = "";
    document.documentElement.removeAttribute("style");
  });

  test("reads valid cookie values only", () => {
    expect(readSessionColorKey("sessionHighlightColor=2")).toBe(2);
    expect(readSessionColorKey("sessionHighlightColor=99")).toBe(null);
    expect(readSessionColorKey("other=1")).toBe(null);
  });

  test("writes CSS variables for the selected session color", () => {
    applySessionColorVariables({
      rootElement: document.documentElement,
      colorNumber: 8,
    });

    expect(document.documentElement.style.getPropertyValue("--color--session")).toBe(
      "var(--color--brand--8)"
    );
    expect(document.documentElement.style.getPropertyValue("--color--session--rgb")).toBe(
      "var(--color--brand--8--rgb)"
    );
  });

  test("random selection can reach the last session color", () => {
    const originalRandom = Math.random;
    Math.random = jest.fn(() => 0.999999);

    const sessionColor = new SessionColor();

    expect(sessionColor.colorKey).toBe(SESSION_COLOR_SEQUENCE.length - 1);
    expect(document.documentElement.classList.contains("$color/session:12")).toBe(true);

    Math.random = originalRandom;
  });
});
