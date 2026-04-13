import {
  buildGoogleFontsHref,
  buildSelfHostedHref,
  createAsianFontLoader,
  getAsianFontVariant,
  resetAsianFontLoaderState,
} from "./asian-fonts.js";

function createTestDocument() {
  const nodes = [];

  return {
    createElement() {
      return {};
    },
    getElementById(id) {
      return nodes.find((node) => node.id === id) || null;
    },
    head: {
      appendChild(node) {
        nodes.push(node);
      },
      querySelector(selector) {
        const match = selector.match(/link\[id="(.+)"\]/);
        return match ? nodes.find((node) => node.id === match[1]) || null : null;
      },
      querySelectorAll(selector) {
        const match = selector.match(/link\[id="(.+)"\]/);
        return match ? nodes.filter((node) => node.id === match[1]) : [];
      },
    },
    nodes,
  };
}

describe("asian fonts", () => {
  beforeEach(() => {
    resetAsianFontLoaderState();
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
    const testDocument = createTestDocument();

    const loadAsianFonts = createAsianFontLoader({
      getDocument: () => testDocument,
      getLang: () => "ko",
    });
    loadAsianFonts();
    loadAsianFonts();

    const links = testDocument.head.querySelectorAll('link[id="noto-sans-KR"]');
    expect(links).toHaveLength(1);
    expect(links[0].href).toContain("/fonts/noto-sans-kr.css");
  });

  test("supports an explicit Google Fonts opt-in", () => {
    const testDocument = createTestDocument();

    const loadAsianFonts = createAsianFontLoader({
      provider: "google",
      getDocument: () => testDocument,
      getLang: () => "ja",
    });
    loadAsianFonts();

    const link = testDocument.head.querySelector('link[id="noto-sans-JP"]');
    expect(link).not.toBeNull();
    expect(link.href).toContain("Noto+Sans+JP");
  });
});
