import BalanceText from "balance-text";
import {
  GetElementsList,
  IsMobileOrTablet,
  WindowHasSize,
} from "./util.js";

export const BalanceTextClass = "balance-text";

class MoMABalanceText {
  constructor(className) {
    if (className) {
      this.className = className;
    } else {
      this.className = BalanceTextClass;
    }

    this.resizeTimer = null;
    this.rotateTimer = null;

    this.styleSheetCreated =
      document.querySelectorAll('style[data-owner="balance-text"]').length > 0;

    if (!this.styleSheetCreated) {
      this.createStyleSheet();
    }
  }

  initInteraction() {
    window.addEventListener("load", () => {
      if (WindowHasSize()) {
        this.balance();
      }
    });

    window.addEventListener("resize", () => {
      if (!IsMobileOrTablet() && WindowHasSize()) {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = this.balanceWithDelay(100);
      }
    });

    window.addEventListener("orientationchange", () => {
      if (WindowHasSize()) {
        clearTimeout(this.rotateTimer);
        this.rotateTimer = this.balanceWithDelay(100);
      }
    });
  }

  createStyleSheet(callback) {
    const styleSheet = document.createElement("style");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.setAttribute("data-owner", "balance-text");
    styleSheet.innerHTML = `
      .balance-text\\:measure {
        -webkit-box-orient: inline-axis !important;
        -webkit-line-clamp: none        !important;
        border:             none        !important;
        box-sizing:         border-box  !important;
        height:             auto        !important;
        margin:             initial     !important;
        max-height:         initial     !important;
        max-width:          initial     !important;
        min-height:         initial     !important;
        min-width:          initial     !important;
        overflow:           visible     !important;
        padding:            initial     !important;
        transform:          none        !important;
        width:              auto        !important;
      }
      .balance-text\\:measure:after,
      .balance-text\\:measure:before {
        display: none !important;
      }
      .balance-text\\:hold {
        display: none !important;
      }
    `;

    if (callback) {
      styleSheet.onload = callback;
    }

    document.head.appendChild(styleSheet);
    this.styleSheetCreated = true;
  }

  balance(els) {
    if (!els) {
      els = `.${this.className}`;
    }

    if (!this.styleSheetCreated) {
      this.createStyleSheet(() => {
        this.balance(els);
      });
      return;
    }

    const elsList = GetElementsList(els);
    elsList.forEach((el) => {
      el.setAttribute("data-inline-css", el.style.cssText);
      el.style.cssText = "";
      el.innerHTML = el.innerHTML.replace(
        /\u00ad/g,
        '<span data-owner="balance-text-placeholder-softhyphen"></span>'
      );
      el.classList.add("balance-text:measure");
    });

    BalanceText(elsList);

    elsList.forEach((el) => {
      el.classList.remove("balance-text:measure");
      el.innerHTML = el.innerHTML.replace(
        /<span data-owner='balance-text-placeholder-softhyphen'><\/span>/g,
        "&shy;"
      );
      el.style.cssText = el.getAttribute("data-inline-css");
      el.removeAttribute("data-inline-css");
    });

    const postEls = [].slice.call(document.getElementsByClassName("balance-text:hold"));
    postEls.forEach((el) => el.classList.remove("balance-text:hold"));
  }

  balanceWithDelay(delay, els) {
    const delayTime = delay || 250;
    return setTimeout(() => {
      this.balance(els);
    }, delayTime);
  }

  toggleBalanceTextClass(input) {
    if (this.shouldBalanceText(input)) {
      return this.className;
    }

    return "";
  }

  shouldBalanceText(input) {
    const trimRegex = /(^\s)|(\s$)/;
    const nobrRegex = /<nobr>.*<\/nobr>/;
    const delimiterRegex = /(.*(\s|-|–|—|&ndash;|&mdash;).*){2,}/;

    const inputTrimmed = input.replace(trimRegex, "");
    const inputNoBr = inputTrimmed.replace(nobrRegex, "!!nobr!!");
    return inputNoBr.match(delimiterRegex) !== null;
  }
}

export { MoMABalanceText };
export default MoMABalanceText;
