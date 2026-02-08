document.addEventListener("DOMContentLoaded", () => {
  setupMusicControls();
  const cake = document.getElementById("cake");
  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("surpriseVideo");
  const closeBtn = document.getElementById("closeVideo");
  const loveReveal = document.getElementById("loveReveal");
  const closeLoveBtn = document.getElementById("closeLoveReveal");
  const bgMusic = document.querySelector(".song");

  // Cake click - show video
  if (cake) {
    cake.addEventListener("click", () => {
      videoBox.classList.remove("hidden");
      if (bgMusic) bgMusic.pause();
      video.play();
    });
  }

  // Close video button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      video.pause();
      video.currentTime = 0;
      videoBox.classList.add("hidden");
      if (bgMusic) bgMusic.play();
    });
  }

  // Video ended - show love reveal
if (video) {
  video.addEventListener("ended", () => {
    videoBox.classList.add("hidden");
    
    // Trigger confetti animation on video end
    if (window.triggerConfetti) {
      window.triggerConfetti();
    }

    // Small delay for smooth transition
    setTimeout(() => {
      loveReveal.classList.remove("hidden");
      loveReveal.classList.add("show");

      // 🔽 START LOVE TIMER HERE (STEP 4)
      startLoveTimer();

    }, 300);
  });
}

  // Loading states for video
  if (video) {
    video.addEventListener("loadstart", () => {
      document.getElementById("videoLoader").classList.remove("hidden");
    });
    video.addEventListener("canplay", () => {
      document.getElementById("videoLoader").classList.add("hidden");
    });
    video.addEventListener("playing", () => {
      document.getElementById("videoLoader").classList.add("hidden");
    });
  }

  // Close love reveal
  if (closeLoveBtn) {
    closeLoveBtn.addEventListener("click", () => {
      loveReveal.classList.add("hidden");
      if (bgMusic) bgMusic.play();
    });
  }
});

const circles = document.querySelectorAll(".circle");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  circles.forEach((circle, index) => {
    const delay = index * 25;
    setTimeout(() => {
      circle.style.left = x + "px";
      circle.style.top = y + "px";
    }, delay);
  });
});

/* for mobile touch */
window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  circles.forEach((circle, index) => {
    const delay = index * 25;
    setTimeout(() => {
      circle.style.left = x + "px";
      circle.style.top = y + "px";
    }, delay);
  });
});

const dock = document.querySelector(".love-dock");
const cursorLayer = document.querySelector(".cursor-circles");

if (dock && cursorLayer) {
  dock.addEventListener("mouseenter", () => {
    cursorLayer.classList.add("hide-circles");
  });

  dock.addEventListener("mouseleave", () => {
    cursorLayer.classList.remove("hide-circles");
  });
}

const dockItems = document.querySelectorAll(".dock-item");
const bgMusic = document.querySelector(".song");

function fadeVolume(target) {
  const bgMusic = document.querySelector(".song");
  if (!bgMusic) return;

  clearInterval(bgMusic._fade);
  bgMusic._fade = setInterval(() => {
    if (Math.abs(bgMusic.volume - target) < 0.02) {
      bgMusic.volume = target;
      clearInterval(bgMusic._fade);
    } else {
      bgMusic.volume += bgMusic.volume < target ? 0.02 : -0.02;
    }
  }, 30);
}

dockItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    document.body.classList.add("whisper-mode");
    fadeVolume(0.25);
  });

  item.addEventListener("mouseleave", () => {
    document.body.classList.remove("whisper-mode");
    fadeVolume(1);
  });
});

// Music controls with playlist
function setupMusicControls() {
  const musicToggle = document.getElementById("musicToggle");
  const playlistToggle = document.getElementById("playlistToggle");
  const playlistMenu = document.getElementById("playlistMenu");
  const playlistItems = document.querySelectorAll(".playlist-item");
  const bgMusic = document.querySelector(".song");
  
  if (!musicToggle || !bgMusic) return;
  
  let isPlaying = true;
  
  // Music toggle
  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
      musicToggle.classList.add("muted");
      isPlaying = false;
    } else {
      bgMusic.play().catch(err => console.log("Playback error:", err));
      musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
      musicToggle.classList.remove("muted");
      isPlaying = true;
    }
  });
  
  // Playlist toggle
  if (playlistToggle) {
    playlistToggle.addEventListener("click", () => {
      playlistMenu.classList.toggle("hidden");
    });
  }
  
  // Close playlist menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".music-control-container")) {
      playlistMenu.classList.add("hidden");
    }
  });
  
  // Playlist item selection
  playlistItems.forEach(item => {
    item.addEventListener("click", () => {
      const track = item.dataset.track;
      if (track) {
        document.getElementById("audioLoader").classList.remove("hidden");
        bgMusic.src = track;
        bgMusic.load();
        if (isPlaying) {
          bgMusic.play().catch(err => console.log("Playback error:", err));
        }
        playlistMenu.classList.add("hidden");
        // Visual feedback
        document.querySelectorAll(".playlist-item").forEach(i => {
          i.style.opacity = "0.7";
          i.style.fontWeight = "500";
        });
        item.style.opacity = "1";
        item.style.fontWeight = "700";
      }
    });
  });
  
  // Loading states for audio
  bgMusic.addEventListener("loadstart", () => {
    document.getElementById("audioLoader").classList.remove("hidden");
  });
  bgMusic.addEventListener("canplay", () => {
    document.getElementById("audioLoader").classList.add("hidden");
  });
  bgMusic.addEventListener("playing", () => {
    document.getElementById("audioLoader").classList.add("hidden");
  });
}

function startLoveTimer() {
  const startDate = new Date("2025-04-18T00:00:00"); // dating start
  const timerEl = document.getElementById("loveTimer");

  if (!timerEl) return;

  function updateTimer() {
    const now = new Date();
    let diff = now - startDate;

    if (diff < 0) diff = 0;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const months = Math.floor(days / 30);
    const remDays = days % 30;
    const remHours = hours % 24;
    const remmins = minutes % 60;
    const remSeconds = seconds % 60;

    timerEl.textContent =
      `${months} months · ${remDays} days · ${remHours} hrs · ${remmins} min · ${remSeconds} sec`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
