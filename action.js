const LOGTAG = 'YTSTAMPS:ACTION_JS:'
// const currentTabQuery = { active: true, currentWindow: true };

document.getElementById('play')
  .addEventListener('click', playPlease)
document.getElementById('pause')
  .addEventListener('click', pausePlease)

async function playPlease() {
  chrome.tabs.query({ active: true, url: '*://*.youtube.com/watch*' })
    .then(([tab, ..._tabs]) =>
      sendMessage(['PLAY_PLEASE', { tabId: tab.id, url: tab.url }])
    );
}

async function pausePlease() {
  chrome.tabs.query({ active: true, url: '*://*.youtube.com/watch*' })
    .then(([tab, ..._tabs]) =>
      sendMessage(['PAUSE_PLEASE', { tabId: tab.id, url: tab.url }])
    );
}

// function myTab() {
//   chrome.tabs.query({ active: true, url: '*://*.youtube.com/watch*' })
//     .then(([tab, ..._tabs]) => tab)
// }

function sendMessage(message) {
  console.log(LOGTAG, message)
  chrome.runtime.sendMessage(message)
}
