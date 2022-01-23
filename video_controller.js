const LOGTAG = 'YTSTAMPS:CONTENT_JS:'

function registerMessageListener([video]) {
  console.log(LOGTAG, 'found', video)
  function messageDispatcher([message, ..._rest], sender, _sendResponse) {
    console.log(LOGTAG, message, 'from', sender);
    switch (message) {
      case 'PLAY':
        console.log(LOGTAG, 'playing', video);
        video.play()
        break
      case 'PAUSE':
        console.log(LOGTAG, 'pausing', video);
        video.pause()
        break
      default:
        console.warn(LOGTAG, message, 'not recognised')
    }
  }
  chrome.runtime.onMessage.addListener(messageDispatcher);
}

const videos = document.querySelectorAll('video[src]')
if (videos.length == 1) {
  registerMessageListener(videos)
  chrome.runtime.sendMessage(['CHECK_IN'])
} else {
  console.warn(LOGTAG, 'found', videos.length, 'videos')
}