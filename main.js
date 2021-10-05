Game.registerMod("time in bank", {
  init: function initTimeInBank() {
    // The element which displays the bank and cps
    const cookies = l("cookies");

    if (cookies === null) {
      Game.Notify("Failed to load Time in Bank", "This version of the mod is not compatible with the current version of Cookie Clicker.", [16,5]);
      return;
    }

    Game.registerHook("draw", function drawTimeInBank() {
      if (!Game.Has("Genius accounting")) {
        return;
      }

      // Adapted from Genius accounting. 1 extra second added for some reason
      let cps = Game.cookiesPs * (1 - Game.cpsSucked);
      let timeInBank = (Game.cookies / cps + 1) * Game.fps;

      // Mimic style of "per second" line
      let timeDisplay = document.createElement("div");
      timeDisplay.innerText = loc("%1 worth", Game.sayTime(timeInBank));
      timeDisplay.style.fontSize = "50%";

      // May return another status line if another mod adds one
      let cpsDisplay = cookies.querySelector("div");
      // If "per second" line is missing, inserts after all children
      cookies.insertBefore(timeDisplay, cpsDisplay);
    });
  }
});
