var ui = require('sdk/ui');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");

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