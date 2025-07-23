// Gesture detection using MediaPipe Hands
let videoElement = document.createElement('video');
videoElement.setAttribute("autoplay", true);
videoElement.setAttribute("playsinline", true);
videoElement.style.display = "none";
document.body.appendChild(videoElement);

let canvasElement = document.createElement('canvas');
canvasElement.width = 640;
canvasElement.height = 480;
document.body.appendChild(canvasElement);

let ctx = canvasElement.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  videoElement.srcObject = stream;
});

import('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js').then(({Hands}) => {
  const hands = new Hands({
    locateFile: (file) => https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file},
  });

  hands.setOptions({
    maxNumHands: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  async function detectHands() {
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    await hands.send({ image: canvasElement });
    requestAnimationFrame(detectHands);
  }

  detectHands();
});

function onResults(results) {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    let landmarks = results.multiHandLandmarks[0];
    let fingersUp = 0;

    // Index and Middle Finger
    if (landmarks[8].y < landmarks[6].y) fingersUp++; // index finger
    if (landmarks[12].y < landmarks[10].y) fingersUp++; // middle finger

    if (fingersUp === 2) {
      alert("🎯 Two fingers detected — Navigating...");
      window.location.href = "https://your-firebase-app-link"; // ← यहाँ Firebase Studio App का लिंक डालें
    }
  }
}
