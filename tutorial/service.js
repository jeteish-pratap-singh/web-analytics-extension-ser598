chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: "ASU - SER598",
    contexts: ["page"],
    id: "asu",
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId == "asu") {
    console.log("Clicked on " + tab.url);
    let data = await chrome.storage.local.get("bookmarks");
    console.log(data);
    data = data.bookmarks ?? [];
    await chrome.storage.local.set({
      bookmarks: [...data, tab.url],
    });
  }
});
