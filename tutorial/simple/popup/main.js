var button = document.getElementById("fork");
button.addEventListener("click", function () {
  console.log("Forks up!");
});

async function addButtons() {
  var data = await chrome.storage.local.get(["bookmarks"]);
  var div = document.getElementById("buttons");
  console.log(data.bookmarks);
  for (const index in data.bookmarks) {
    var btn = document.createElement("button");
    btn.textContent = index;
    btn.addEventListener("click", () => {
      console.log("button clicked :" + data.bookmarks[index]);
    });
    div.appendChild(btn);
  }
}

chrome.storage.onChanged.addListener(addButtons);
document.addEventListener("DOMContentLoaded", addButtons);
