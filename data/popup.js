waitingForCurrentTabUrl = null;

function getCurrentTabUrl(callback) {
  var url = "http://www.example.com";

  console.assert(typeof url == 'string', 'tab.url should be a string');
  console.log(url);
  if(currentTabUrl){
    callback(currentTabUrl);
  } else {
    waitingForCurrentTabUrl = callback;
  }
}

addon.port.on("activeTabUrl", function onGetTabUrl(url) {
  currentTabUrl = url;
  console.log("The URL of the current tab is: " + url);
  if(waitingForCurrentTabUrl) {
    waitingForCurrentTabUrl(url);
  }
});