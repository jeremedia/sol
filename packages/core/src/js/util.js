const IsMobileOrTablet = () => {
  const iOS = /iOS|iPhone|iPad/g.test(navigator.userAgent);
  const android = /Android/g.test(navigator.userAgent);

  return android || iOS;
};

const DocumentReady = (fn) => {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const WindowHasSize = () => {
  return window.innerHeight > 0 && window.innerWidth > 0;
};

const GetElementsList = (elements) => {
  if (!elements) {
    return [];
  }

  if (typeof elements === "string") {
    return document.querySelectorAll(elements);
  }

  if (elements.tagName && elements.querySelectorAll) {
    return [elements];
  }

  let elsArray = [].slice.call(elements);
  elsArray = elsArray.filter((el) => el.getBoundingClientRect().height !== 0);

  return elsArray;
};

const BaseDomain = () => {
  if (!document.domain) {
    return "";
  }

  let i = 0;
  let domain = document.domain;
  const parts = domain.split(".");
  const sentinel = `_gd${Date.now()}`;

  while (i < parts.length - 1 && document.cookie.indexOf(`${sentinel}=${sentinel}`) === -1) {
    domain = parts.slice(-1 - (++i)).join(".");
    document.cookie = `${sentinel}=${sentinel};domain=${domain};`;
  }

  document.cookie = `${sentinel}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${domain};`;

  return domain;
};

module.exports = {
  BaseDomain,
  DocumentReady,
  GetElementsList,
  IsMobileOrTablet,
  WindowHasSize,
};
