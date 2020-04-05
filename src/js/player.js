let player;
const playerContainer = $(".player");

let eventsInit = () => {

  // Первый запуск - возможный клик по заставке
  $(".player__splash").click(e => {
    player.playVideo();
  })

  // Обрабатываем нажатия на кнопку "Play / Pause"
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("player-active")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });
}


// Обработка ручного перемещения ползунка прокрутки
$(".player__playback").on("change", e => {
  const clickedPercents = e.target.value;
  const newPlayerTimeSec = (player.getDuration() / 100) * clickedPercents;

  player.seekTo(newPlayerTimeSec);
});

// Обработка изменения громкости
$(".player__volume-pointer").on("change", e => {
  const percents = e.target.value;

  player.setVolume(percents);
});

// Обработка включения / выключения звука
$('.player__volume-btn').on('click', e => {
  muteUnmute($('.player__volume-muted'));
});

function muteUnmute(volumeBtn) {
  if (player.isMuted()) {
    player.unMute();
    volumeBtn.css('opacity', '0');
  } else {
    player.mute();
    volumeBtn.css('opacity', '1');
  }
}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  if (typeof interval !== undefined) {
    clearInterval(interval);
  }

  interval = setInterval( () => {
    const completedSec = player.getCurrentTime();
    const completePercent = (completedSec / durationSec) * 100;

    // Передвигаем ползунок видео
    $(".player__playback")[0].value = completePercent;

  }, 1000);
};

const onPlayerStateChange = event => {
  /*
 -1 (воспроизведение видео не начато)
  0 (воспроизведение видео завершено)
  1 (воспроизведение)
  2 (пауза)
  3 (буферизация)
  5 (видео подают реплики)
  */
  switch (event.data) {
    case 1:
      playerContainer.addClass("player-active");
      playerContainer.removeClass("player-paused");
      playerContainer.removeClass("player-splashed");
      break;
    case 2:
      playerContainer.removeClass("player-active");
      playerContainer.addClass("player-paused");
      break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "360",
    width: "640",
    videoId: "L66PzgUzIl0",
//    videoId: "LXb3EKWsInQ",
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsInit();
