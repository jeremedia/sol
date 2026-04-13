const KeyCodes = require("./keycodes.js");

const ShowFocusClass = "show-focus";

const getFocusEventTarget = (doc = document) => {
  return doc.body || doc.documentElement || doc;
};

const ShowFocusOnTabPress = (doc = document) => {
  getFocusEventTarget(doc).addEventListener("keydown", (event) => {
    const keyCode = event.which || event.keyCode;

    if (keyCode === KeyCodes.TAB) {
      doc.documentElement.classList.add(ShowFocusClass);
    }
  });
};

const RemoveFocusOnClick = (doc = document) => {
  getFocusEventTarget(doc).addEventListener("click", (event) => {
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    doc.documentElement.classList.remove(ShowFocusClass);
  });
};

class Focus {
  constructor(doc = document) {
    ShowFocusOnTabPress(doc);
    RemoveFocusOnClick(doc);
  }
}

module.exports = {
  __esModule: true,
  default: Focus,
  Focus,
  RemoveFocusOnClick,
  ShowFocusClass,
  ShowFocusOnTabPress,
};
