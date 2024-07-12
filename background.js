let isActive = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    isActive = !isActive;
    sendResponse({ isActive: isActive });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isActive && changeInfo.status === 'complete') {
    chrome.tabs.query({}, (tabs) => {
      let urls = new Set();
      for (let t of tabs) {
        if (urls.has(t.url) && t.id !== tabId) {
          chrome.tabs.remove(t.id);
        } else {
          urls.add(t.url);
        }
      }
    });
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (isActive) {
    chrome.tabs.query({}, (tabs) => {
      let urls = new Set();
      for (let t of tabs) {
        if (urls.has(t.url) && t.id !== tab.id) {
          chrome.tabs.remove(t.id);
        } else {
          urls.add(t.url);
        }
      }
    });
  }
});
