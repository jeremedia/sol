import { DocumentReady } from "./util.js";

export const DEFAULT_FONT_WEIGHTS = "100;300;400;500;700;900";
export const NOTO_SANS_STYLESHEET_ID_PREFIX = "noto-sans-";

let asianFontsChecked = false;

export const notoSansMappings = Object.freeze({
  "zh-Hans": "SC",
  "zh-Hant": "TC",
  ko: "KR",
  ja: "JP",
});

export const getAsianFontVariant = (lang) => {
  return notoSansMappings[lang] || null;
};

export const buildGoogleFontsHref = ({
  variant,
  weights = DEFAULT_FONT_WEIGHTS,
}) => {
  return `https://fonts.googleapis.com/css2?family=Noto+Sans+${variant}:wght@${weights}`;
};

export const buildSelfHostedHref = ({
  variant,
  basePath = "/fonts",
}) => {
  const normalizedBasePath = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;

  return `${normalizedBasePath}/noto-sans-${variant.toLowerCase()}.css`;
};

export const createAsianFontLoader = (options = {}) => {
  const getDocument = options.getDocument || (() => document);
  const getLang =
    options.getLang ||
    ((doc) => doc.documentElement.getAttribute("lang") || "en");
  const provider = options.provider || "self-hosted";
  const hrefBuilder =
    options.hrefBuilder ||
    ((payload) => {
      if (provider === "self-hosted") {
        return buildSelfHostedHref({
          variant: payload.variant,
          basePath: options.basePath,
        });
      }

      return buildGoogleFontsHref({
        variant: payload.variant,
        weights: options.weights,
      });
    });

  return () => {
    if (asianFontsChecked) {
      return;
    }

    asianFontsChecked = true;

    DocumentReady(() => {
      const doc = getDocument();
      const lang = getLang(doc);
      const variant = getAsianFontVariant(lang);

      if (!variant) {
        return;
      }

      const stylesheetId = `${NOTO_SANS_STYLESHEET_ID_PREFIX}${variant}`;

      if (doc.getElementById(stylesheetId)) {
        return;
      }

      const link = doc.createElement("link");
      link.id = stylesheetId;
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = hrefBuilder({ lang, variant, documentObject: doc });
      doc.head.appendChild(link);
    });
  };
};

export const loadAsianFonts = (options = {}) => {
  createAsianFontLoader(options)();
};

export const resetAsianFontLoaderState = () => {
  asianFontsChecked = false;
};

export default loadAsianFonts;
