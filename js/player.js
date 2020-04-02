let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "360",
    width: "640",
    videoId: "M7lc1UVf-VE",
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

console.log(player);
