function formatTime(ms) {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  return `${min} min ${sec % 60} sec`;
}

chrome.storage.local.get(null, (data) => {
  const container = document.getElementById("data");

  for (let site in data) {
    const div = document.createElement("div");
    div.className = "site";

    div.innerHTML = `
      <span>${site}</span>
      <span>${formatTime(data[site])}</span>
    `;

    container.appendChild(div);
  }
});