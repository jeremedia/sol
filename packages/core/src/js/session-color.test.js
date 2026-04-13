import SessionColor, {
  SESSION_COLOR_SEQUENCE,
  applySessionColorVariables,
  readSessionColorKey,
} from "./session-color.js";

describe("session color", () => {
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

  test("sets a random cookie value and applies variables without legacy classes", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    const sessionColor = new SessionColor();

    expect(sessionColor.colorKey).toBe(SESSION_COLOR_SEQUENCE.length - 1);
    expect(document.cookie).toContain("sessionHighlightColor=6");
    expect(document.documentElement.style.getPropertyValue("--color--session")).toBe(
      "var(--color--brand--12)"
    );
    expect(document.documentElement.className).toBe("");
  });

  test("reuses an existing cookie value instead of re-randomizing", () => {
    document.cookie = "sessionHighlightColor=3; path=/;";
    vi.spyOn(Math, "random");

    const sessionColor = new SessionColor();

    expect(sessionColor.colorKey).toBe(3);
    expect(Math.random).not.toHaveBeenCalled();
    expect(document.documentElement.style.getPropertyValue("--color--session")).toBe(
      "var(--color--brand--7)"
    );
  });
});
