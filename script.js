let startTime = null;
let elapsedTime = 0;
let interval = null;
const stopwatchDisplay = document.querySelector('.stopwatch');
const lapTimesList = document.querySelector('.lap-times ul');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  const totalTime = elapsedTime + (currentTime - startTime);
  stopwatchDisplay.textContent = formatTime(totalTime);
}

document.querySelector('.start').addEventListener('click', () => {
  if (!interval) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
  }
});

document.querySelector('.stop').addEventListener('click', () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    elapsedTime += Date.now() - startTime;
  }
});

document.querySelector('.reset').addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  elapsedTime = 0;
  startTime = null;
  stopwatchDisplay.textContent = '00:00:00.000';
  lapTimesList.innerHTML = '';
});

document.querySelector('.lap').addEventListener('click', () => {
  if (interval) {
    const currentTime = Date.now();
    const totalTime = elapsedTime + (currentTime - startTime);
    const lapTime = formatTime(totalTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimesList.children.length + 1}: ${lapTime}`;
    lapTimesList.appendChild(lapItem);
  }
});

