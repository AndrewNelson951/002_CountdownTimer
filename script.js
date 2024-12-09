let timerInterval;
let isRunning = false;

const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startStopButton = document.getElementById('startStop');

// Format numbers to always show two digits
function formatNumber(number) {
    return number.toString().padStart(2, '0');
}

// Update input values with formatted numbers
function updateInputs(minutes, seconds) {
    minutesInput.value = formatNumber(minutes);
    secondsInput.value = formatNumber(seconds);
}

// Main timer function
function startTimer() {
    let minutes = parseInt(minutesInput.value);
    let seconds = parseInt(secondsInput.value);
    
    if (minutes === 0 && seconds === 0) return;

    let totalSeconds = minutes * 60 + seconds;

    timerInterval = setInterval(() => {
        totalSeconds--;
        
        if (totalSeconds < 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startStopButton.textContent = 'Start';
            updateInputs(0, 0);
            return;
        }

        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        
        updateInputs(newMinutes, newSeconds);
    }, 1000);
}

// Event listener for the start/stop button
startStopButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startStopButton.textContent = 'Stop';
        startTimer();
    } else {
        isRunning = false;
        startStopButton.textContent = 'Start';
        clearInterval(timerInterval);
    }
});

// Event listeners for input validation
minutesInput.addEventListener('input', () => {
    let value = parseInt(minutesInput.value);
    if (isNaN(value)) value = 0;
    if (value > 99) value = 99;
    updateInputs(value, secondsInput.value);
});

secondsInput.addEventListener('input', () => {
    let value = parseInt(secondsInput.value);
    if (isNaN(value)) value = 0;
    if (value > 59) value = 59;
    updateInputs(minutesInput.value, value);
}); 