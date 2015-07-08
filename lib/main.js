var ui = require('sdk/ui');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");
var hotkey = require("sdk/hotkeys");

var button = ui.ToggleButton({
  id: "issue-input",
  label: "Report Accessibility Issue",
  icon: "./icon.png",
  onClick: handleClick
});

var panel;

hotkey.Hotkey({
  combo: "shift-accel-i",
  onPress: function() {
    console.log(button.state());
    if(panel) {
      console.log("The panel exists!");
      panel.hide();
    } else {
      button.click();
    }
  }
});

function createPanel(){
  panel = panels.Panel({
    contentURL: self.data.url("popup.html"),
    width: 500,
    height: 160,
    onHide: handleHide
  });

  return panel;
}

function handleClick(state) {
  console.log("button clicked");
  console.log(state);
  if(state.checked) {
  	createPanel();

    panel.on("show", function(){
      panel.port.emit("activeTabUrl", tabs.activeTab.url);
    });

    panel.port.on("close", function(){
      panel.close();
      panel.destroy();
      panel = null;
    });

  	panel.show({
      position: button
  	});
  }
}

function handleHide() {
  console.log("panel hidden");
  button.state('window', {checked: false});
  panel.destroy();
  panel = null;
}

/*pageMod.PageMod({
  include: "*",
  contentScriptFile: ["./js/jquery-1.11.3.min.js",
                      "./js/loadPageScripts.js"]
});*/

pageMod.PageMod({
  include: "*.amtrak.com",
  contentScriptFile: ["./js/jquery-1.11.3.min.js",
                      "./js/amtrakFixes.js"],
  onAttach: function(worker) {
  	console.log("Attaching the JQuery worker script");
  }
});