var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "issue-input",
  label: "Report Accessibility Issue",
  icon: "./icon.png",
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("https://www.mozilla.org/");
}