import { ref, onScopeDispose } from "vue";

let preferredVoice = null;

function findBestVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;

  // 1. Filter for Indonesian voices
  const idVoices = voices.filter(
    (v) =>
      (v.lang && (v.lang === "id-ID" || v.lang.toLowerCase().startsWith("id"))) ||
      (v.name && /indonesia/i.test(v.name))
  );

  if (idVoices.length > 0) {
    // Prioritize natural / neural / online / Google voices
    const naturalVoice = idVoices.find((v) =>
      /natural|neural|online|google|premium/i.test(v.name)
    );
    return naturalVoice || idVoices[0];
  }

  return voices.find((v) => v.default) || voices[0] || null;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  preferredVoice = findBestVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      preferredVoice = findBestVoice();
    };
  }
}

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
  let currentUtterance = null;
  let currentPlayId = 0;
  let errorTimeout = null;

  function clearErrorTimeout() {
    if (errorTimeout) {
      clearTimeout(errorTimeout);
      errorTimeout = null;
    }
  }

  function setError() {
    playing.value = false;
    error.value = true;
    clearErrorTimeout();
    errorTimeout = setTimeout(() => {
      error.value = false;
    }, 3000);
  }

  function play(url) {
    clearErrorTimeout();
    error.value = false;
    const playId = ++currentPlayId;

    try {
      if (!url) {
        setError();
        return;
      }

      if (!audio) {
        audio = new Audio();
      }

      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        currentUtterance = null;
        window.speechSynthesis.cancel();
      }

      audio.pause();
      if (audio.src !== url) {
        audio.src = url;
      }
      audio.currentTime = 0;

      audio.onended = () => {
        if (currentPlayId === playId) {
          playing.value = false;
        }
      };

      audio.onerror = () => {
        if (currentPlayId === playId) {
          setError();
        }
      };

      playing.value = true;
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch((err) => {
          if (err && err.name === "AbortError") {
            return;
          }
          if (currentPlayId === playId) {
            setError();
          }
        });
      }
    } catch {
      if (currentPlayId === playId) {
        setError();
      }
    }
  }

  function speak(text) {
    clearErrorTimeout();
    error.value = false;
    const playId = ++currentPlayId;

    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setError();
        return;
      }

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Mark current utterance null before canceling so its canceled error event is ignored
      currentUtterance = null;
      window.speechSynthesis.cancel();

      if (!text) {
        setError();
        return;
      }

      const u = new SpeechSynthesisUtterance(text);
      u.lang = "id-ID";

      const voice = preferredVoice || findBestVoice();
      if (voice) {
        u.voice = voice;
      }

      u.rate = 0.92;
      u.pitch = 1.0;

      currentUtterance = u;
      playing.value = true;

      u.onstart = () => {
        if (currentUtterance === u && currentPlayId === playId) {
          playing.value = true;
          error.value = false;
        }
      };

      u.onend = () => {
        if (currentUtterance === u && currentPlayId === playId) {
          playing.value = false;
          currentUtterance = null;
        }
      };

      u.onerror = (event) => {
        // "canceled" and "interrupted" are normal lifecycle cancellations, not failures
        if (event && (event.error === "canceled" || event.error === "interrupted")) {
          if (currentUtterance === u && currentPlayId === playId) {
            playing.value = false;
            currentUtterance = null;
          }
          return;
        }

        if (currentUtterance === u && currentPlayId === playId) {
          setError();
          currentUtterance = null;
        }
      };

      window.speechSynthesis.speak(u);
    } catch {
      if (currentPlayId === playId) {
        setError();
        currentUtterance = null;
      }
    }
  }

  function stop() {
    clearErrorTimeout();
    currentPlayId++;
    currentUtterance = null;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    playing.value = false;
  }

  onScopeDispose(() => {
    stop();
  });

  return { playing, error, play, speak, stop };
}
