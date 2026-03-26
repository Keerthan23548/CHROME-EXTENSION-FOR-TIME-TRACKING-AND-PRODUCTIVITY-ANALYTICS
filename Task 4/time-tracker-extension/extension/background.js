let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  const domain = getDomain(url);

  if (activeTab && startTime) {
    const timeSpent = Date.now() - startTime;

    chrome.storage.local.get([activeTab], (result) => {
      const prevTime = result[activeTab] || 0;
      chrome.storage.local.set({
        [activeTab]: prevTime + timeSpent
      });
    });
  }

  activeTab = domain;
  startTime = Date.now();
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "unknown";
  }
}