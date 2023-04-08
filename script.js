const pianoKeys = document.querySelectorAll(".key");
const hoverCheckbox = document.getElementById("hover-mode");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const keyToNote = {
    a: "C4",
    s: "D4",
    d: "E4",
    f: "F4",
    g: "G4",
    h: "A4",
    j: "B4",
    k: "C5",
    l: "D5",
    z: "E5",
    x: "F5",
    c: "G5",
    v: "A5",
    b: "B5",
    n: "C6",
    w: "C#4",
    e: "D#4",
    r: "F#4",
    t: "G#4",
    y: "A#4",
    u: "C#5",
    i: "D#5",
    o: "F#5",
    p: "G#5",
    "[": "A#5", 
};

function playNote(note, duration = 1)
{
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = getFrequency(note);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

function getFrequency(note)
{
    const noteToFrequency = {
    C4: 261.63,
    "C#4": 277.18,
    D4: 293.66,
    "D#4": 311.13,
    E4: 329.63,
    F4: 349.23,
    "F#4": 369.99,
    G4: 392.00,
    "G#4": 415.30,
    A4: 440.00,
    "A#4": 466.16,
    B4: 493.88,
    C5: 523.25,
    "C#5": 554.37,
    D5: 587.33,
    "D#5": 622.25,
    E5: 659.25,
    F5: 698.46,
    "F#5": 739.99,
    G5: 783.99,
    "G#5": 830.61,
    A5: 880.00,
    "A#5": 932.33,
    B5: 987.77,
    C6: 1046.50,
  };

  return noteToFrequency[note];
}



document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (keyToNote[key]) {
    const note = keyToNote[key];
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);

    if (!keyElement.classList.contains("active")) {
      keyElement.classList.add("active");
      playNote(note);
    }
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (keyToNote[key]) {
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    keyElement.classList.remove("active");
  }
});



let hoverModeActive = false;

hoverCheckbox.addEventListener("change", () => {
  hoverModeActive = hoverCheckbox.checked;
});


pianoKeys.forEach((key) => {
  key.addEventListener("mousedown", (event) => {
      if (!hoverModeActive) {
          playNote(event.target.dataset.note, 0.3);
          event.target.classList.add("active");
      }
  });

  key.addEventListener("mouseenter", (event) => {
      if (hoverModeActive) {
          playNote(event.target.dataset.note, 0.3);
          event.target.classList.add("active");
      }
  });

  key.addEventListener("mouseleave", (event) => {
      if (hoverModeActive) {
          event.target.classList.remove("active");
      }
  });

  key.addEventListener("mouseup", (event) => {
      if (!hoverModeActive) {
          event.target.classList.remove("active");
      }
  });
});
