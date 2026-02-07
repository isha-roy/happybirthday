document.addEventListener("DOMContentLoaded", () => {
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
      // Small delay for smooth transition
      setTimeout(() => {
        loveReveal.classList.remove("hidden");
      }, 300);
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
