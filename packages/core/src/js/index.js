import Focus from "./focus.js";
import MoMABalanceText from "./moma-balance-text.js";
import Nav from "./nav.js";
import SessionColor from "./session-color.js";
import * as Util from "./util.js";
import Viewporter from "./viewporter.js";
import { loadAsianFonts } from "./asian-fonts.js";

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

export { Focus, loadAsianFonts, MoMABalanceText, Nav, SessionColor, SolCore, Util, Viewporter };
export default SolCore;
