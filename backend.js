const LOGTAG = 'YTSTAMPS:BACKEND_JS:'
const currentTabQuery = { url: '*://*.youtube.com/watch*' }
const tabs = chrome.tabs
const myTabs = {}

chrome.commands.onCommand.addListener(commandDispatcher)
chrome.runtime.onMessage.addListener(dispatchMessages)

function dispatchMessages([message, ...args], sender, _sendResponse) {
  console.log(LOGTAG, message, 'from', sender.url)
  switch (message) {
    case 'CHECK_IN':
      checkIn(sender); break
    case 'PLAY_PLEASE':
      play(args); break
    case 'PAUSE_PLEASE':
      pause(args); break
    default:
      console.log(LOGTAG, 'message not recognized')
  }
}

function play([{ tabId, url }]) {
  console.log(LOGTAG, 'play', tabId, url)
  chrome.tabs.sendMessage(tabId, ['PLAY'])
}

function pause([{ tabId, url }]) {
  console.log(LOGTAG, 'pause', tabId, url)
  chrome.tabs.sendMessage(tabId, ['PAUSE'])
}

function checkIn({ tab: { id: tabId, title, url, windowId } }) {
  myTabs[tabId] = { tabId, title, url, windowId }
  console.log(LOGTAG, 'checked in', myTabs[tabId])
}


function commandDispatcher([message, ..._rest]) {
  console.log(LOGTAG, message)
  // switch (command) {
  //   case 'add_timestamp':
  //     console.log(LOGTAG, 'add timestamp');
  //     break;
  //   default:
  //     console.warn(LOGTAG, 'command not recognized: %c', command);
  // }
}
// async function uiPlayClicked() {
//   let myTabs = await tabs.query(currentTabQuery);
//   if (myTabs.lenght == 1) {
//     let tab = myTabs.pop();
//     console.log(LOGTAG, 'sending message to tab at url %c', tab.url);
//     let reply = await tabs.sendMessage(tab.id, { command: 'play' });
//     console.log(LOGTAG, reply);
//   } else {
//     console.warn(LOGTAG, 'no tabs found for query', currentTabQuery);
//   }
// }
