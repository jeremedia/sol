const defaultQuerySelector = "nav";

class Nav {
  constructor(el) {
    if (el) {
      this.navEl = el;
    } else {
      this.navEl = document.querySelector(defaultQuerySelector);
    }

    this.setCurrentHeightCSS();

    if (this.navEl) {
      this.navEl.addEventListener("transitionend", () => {
        this.setCurrentHeightCSS();
      });
    }

    window.addEventListener("resize", () => {
      this.setCurrentHeightCSS();
    });
  }

  getCurrentHeight() {
    if (this.navEl) {
      const navRect = this.navEl.getBoundingClientRect();
      return navRect.height + navRect.top;
    }

    return 0;
  }

  setCurrentHeightCSS() {
    const height = this.getCurrentHeight();
    document.documentElement.style.setProperty("--nav-height", `${height}px`);
  }
}

module.exports = {
  __esModule: true,
  default: Nav,
  Nav,
};
