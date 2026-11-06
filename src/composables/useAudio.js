import { ref } from "vue";

/**
 * Audio playback helper.
 * - play(url): plays an audio file.
 * - speak(text): uses the Web Speech API to pronounce text (id-ID),
 *   used for aksara pronunciation so audio matches each aksara without
 *   needing pre-recorded files.
 */
export function useAudio() {
  const playing = ref(false);
  const error = ref(false);
  let audio = null;

  function play(url) {
    error.value = false;
    try {
      if (!audio || audio.src !== url) {
        audio = new Audio(url);
        audio.addEventListener("ended", () => {
          playing.value = false;
        });
        audio.addEventListener("error", () => {
          playing.value = false;
          error.value = true;
        });
      }
      audio.currentTime = 0;
      playing.value = true;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          playing.value = false;
          error.value = true;
        });
      }
    } catch {
      playing.value = false;
      error.value = true;
    }
  }

  function speak(text) {
    error.value = false;
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        error.value = true;
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "id-ID";
      u.rate = 0.75;
      u.pitch = 1;
      u.onend = () => { playing.value = false; };
      u.onerror = () => { playing.value = false; error.value = true; };
      playing.value = true;
      window.speechSynthesis.speak(u);
    } catch {
      playing.value = false;
      error.value = true;
    }
  }

  function stop() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    playing.value = false;
  }

  return { playing, error, play, speak, stop };
}
