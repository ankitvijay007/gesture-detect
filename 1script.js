import { Hands } from "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js";
import { Camera } from "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";

const videoElement = document.getElementById("webcam");

function countExtendedFingers(landmarks) {
  const fingers = [8, 12]; // Index and Middle fingertips
  let count = 0;

  fingers.forEach((tip) => {
    if (landmarks[tip].y < landmarks[tip - 2].y) {
      count++;
    }
  });

  return count;
}

const hands = new Hands({
  locateFile: (file) =>
    https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file},
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7,
});

hands.onResults((results) => {
  if (results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];
    const count = countExtendedFingers(landmarks);

    if (count === 2) {
      window.location.href = "https://learnallai.web.app"; // 👉 Replace with your Firebase Studio page
    }
  }
});

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});
camera.start();
