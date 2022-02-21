const LOGTAG = 'YTSTAMPS:CONTENT_JS:'

function registerMessageListener(video) {
  console.log(LOGTAG, 'found', video)
  function messageDispatcher([message, ..._rest], sender, _sendResponse) {
    console.log(LOGTAG, message, 'from', sender);
    switch (message) {
      case 'PLAY':
        console.log(LOGTAG, message, video);
        video.play()
        break
      case 'PAUSE':
        console.log(LOGTAG, message, video);
        video.pause()
        break
      default:
        console.warn(LOGTAG, message, 'not recognised')
    }
  }
  chrome.runtime.onMessage.addListener(messageDispatcher);
}

function findVideoElement() {
  const videos = document.querySelectorAll('video[src]')
  if (videos.length == 1) {
    let video = videos[0]
    let message = ['CHECK_IN', { duration: video.duration }]
    chrome.runtime.sendMessage(message)
    return video
  } else {
    console.warn(LOGTAG, 'found', videos.length, 'videos')
    return null
  }
}

const DEBUG_PANEL_ID = 'debug_panel'

function injectDebugPanel() {
  let panel = document.createElement('div')
  panel.id = DEBUG_PANEL_ID
  let style = {
    position: 'absolute',
    border: '4px solid red',
    width: '4cm',
    height: '3cm',
    top: '2cm',
    left: '1cm',
    display: 'none',
  }
  Object.entries(style).forEach(([key, val]) => panel.style[key] = val)
  document.body.appendChild(panel)
}

function toggleDebugPanel() {
  let panel = document.getElementById(DEBUG_PANEL_ID)
  if (panel) {
    panel.style.display =
      panel.style.display == 'none' ? 'block' : 'none'
  } else {
    console.warn('Debug panel not found')
  }
}

injectDebugPanel()

let video = findVideoElement()
if (video) {
  registerMessageListener(video)
}