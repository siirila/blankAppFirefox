var ui = require('sdk/ui');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var button = ui.ToggleButton({
  id: "issue-input",
  label: "Report Accessibility Issue",
  icon: "./icon.png",
  onClick: handleClick
});


function createPanel(){
  var panel = panels.Panel({
    contentURL: self.data.url("popup.html"),
    width: 500,
    height: 160,
    onHide: handleHide
  });

  return panel;
}

function handleClick(state) {
  if(state.checked) {
  	var panel = createPanel();

    panel.on("show", function(){
      panel.port.emit("activeTabUrl", tabs.activeTab.url);
    });

    panel.port.on("close", function(){
      panel.destroy();
    });

  	panel.show({
      position: button
  	});
  }
}

function handleHide() {
  button.state('window', {checked: false})
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