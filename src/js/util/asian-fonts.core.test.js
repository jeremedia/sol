import {
  buildGoogleFontsHref,
  buildSelfHostedHref,
  createAsianFontLoader,
  getAsianFontVariant,
  resetAsianFontLoaderState,
} from "./asian-fonts";

describe("core asian fonts", () => {
  beforeEach(() => {
    resetAsianFontLoaderState();
    document.head.innerHTML = "";
    document.documentElement.lang = "en";
  });

  test("uses the correct Korean variant", () => {
    expect(getAsianFontVariant("ko")).toBe("KR");
  });

  test("builds configurable stylesheet URLs", () => {
    expect(buildGoogleFontsHref({ variant: "KR" })).toContain("Noto+Sans+KR");
    expect(buildSelfHostedHref({ variant: "JP", basePath: "/assets/fonts" })).toBe(
      "/assets/fonts/noto-sans-jp.css"
    );
  });

  test("loads a single stylesheet for supported asian languages", () => {
    document.documentElement.lang = "ko";

    const loadAsianFonts = createAsianFontLoader();
    loadAsianFonts();
    document.dispatchEvent(new Event("DOMContentLoaded"));
    loadAsianFonts();

    const links = document.head.querySelectorAll('link[id="noto-sans-KR"]');
    expect(links.length).toBe(1);
    expect(links[0].href).toContain("Noto+Sans+KR");
  });
});
