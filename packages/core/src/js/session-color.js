import { BaseDomain } from "./util.js";

export const SESSION_COLOR_COOKIE_KEY = "sessionHighlightColor";
export const SESSION_COLOR_SEQUENCE = Object.freeze([1, 5, 8, 7, 10, 11, 12]);

const parseCookieValue = (cookieString, name) => {
  const values = cookieString.split(";");

  for (const value of values) {
    const [cookieName, cookieValue] = value.trim().split("=");

    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
};

export const readSessionColorKey = (cookieString) => {
  const cookieValue = parseCookieValue(cookieString, SESSION_COLOR_COOKIE_KEY);

  if (cookieValue === null) {
    return null;
  }

  const colorKey = Number.parseInt(cookieValue, 10);

  if (!Number.isInteger(colorKey)) {
    return null;
  }

  if (colorKey < 0 || colorKey >= SESSION_COLOR_SEQUENCE.length) {
    return null;
  }

  return colorKey;
};

const getRandomSessionColorKey = () => {
  return Math.floor(Math.random() * SESSION_COLOR_SEQUENCE.length);
};

export const getSessionColorNumber = (colorKey) => {
  return SESSION_COLOR_SEQUENCE[colorKey] || SESSION_COLOR_SEQUENCE[0];
};

const writeSessionColorCookie = ({
  colorKey,
  documentObject = document,
  baseDomain = BaseDomain,
}) => {
  const domain = baseDomain();
  const domainAttribute = domain ? `; domain=${domain}` : "";
  documentObject.cookie = `${SESSION_COLOR_COOKIE_KEY}=${colorKey}; path=/${domainAttribute};`;
};

export const applySessionColorVariables = ({
  rootElement = document.documentElement,
  colorNumber,
}) => {
  rootElement.style.setProperty("--color--session", `var(--color--brand--${colorNumber})`);
  rootElement.style.setProperty(
    "--color--session--rgb",
    `var(--color--brand--${colorNumber}--rgb)`
  );
};

class SessionColor {
  constructor(options = {}) {
    this.documentObject = options.documentObject || document;
    this.rootElement = options.rootElement || this.documentObject.documentElement;
    this.baseDomain = options.baseDomain || BaseDomain;
    this.writeVariables = options.writeVariables !== false;
    this.colorKey = null;

    if (!this.sessionColorIsSet()) {
      this.setRandomSessionColor();
    } else {
      this.getSessionColor();
    }

    this.applySessionColor();
  }

  sessionColorIsSet() {
    return readSessionColorKey(this.documentObject.cookie) !== null;
  }

  getSessionColor() {
    this.colorKey = readSessionColorKey(this.documentObject.cookie);
    return this.colorKey;
  }

  setRandomSessionColor() {
    this.colorKey = getRandomSessionColorKey();
    writeSessionColorCookie({
      colorKey: this.colorKey,
      documentObject: this.documentObject,
      baseDomain: this.baseDomain,
    });
  }

  applySessionColor() {
    const colorNumber = getSessionColorNumber(this.colorKey);

    if (this.writeVariables) {
      applySessionColorVariables({
        rootElement: this.rootElement,
        colorNumber,
      });
    }
  }
}

export { SessionColor };
export default SessionColor;
