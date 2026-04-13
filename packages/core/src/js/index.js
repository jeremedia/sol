const focusModule = require("./focus.js");
const momaBalanceTextModule = require("./moma-balance-text.js");
const navModule = require("./nav.js");
const sessionColorModule = require("./session-color.js");
const Util = require("./util.js");
const viewporterModule = require("./viewporter.js");
const asianFontsModule = require("./asian-fonts.js");

const Focus = focusModule.default;
const MoMABalanceText = momaBalanceTextModule.default;
const Nav = navModule.default;
const SessionColor = sessionColorModule.default;
const Viewporter = viewporterModule.default;
const { loadAsianFonts } = asianFontsModule;

class SolCore {
  constructor(options = {}) {
    this.viewporter = new Viewporter(options.viewporter);
    this.focus = new Focus(options.documentObject);
    this.sessionColor = new SessionColor(options.sessionColor);
    this.nav = new Nav(options.navElement);
    this.balanceText = new MoMABalanceText(options.balanceTextClassName);

    this.balanceText.initInteraction();
  }
}

module.exports = {
  __esModule: true,
  default: SolCore,
  SolCore,
  Focus,
  loadAsianFonts,
  MoMABalanceText,
  Nav,
  SessionColor,
  Util,
  Viewporter,
};
