const LOGTAG = 'YTSTAMPS:CONTENT_JS:'

function registerMessageListener([video]) {
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
    chrome.runtime.sendMessage(['CHECK_IN'])
    return videos[0]
  } else {
    console.warn(LOGTAG, 'found', videos.length, 'videos')
    return null
  }
}

let video = findVideoElement()
if (video) {
  registerMessageListener(video)
}