import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.getElementById("startButton");
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdown;
let targetDate;

function toggleStartButton() {
  if (targetDate && targetDate > new Date()) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

datetimePicker.flatpickr({
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: (selectedDates) => {
    const selectedDate = selectedDates[0];
    
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      targetDate = null;
    } else {
      targetDate = selectedDate;
    }
    
    toggleStartButton();
  }
});

function updateTimer() {
  const currentTime = new Date().getTime();
  const timeLeft = targetDate - currentTime;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    Notiflix.Notify.success("Time is up!");
  } else {
    const timeValues = convertMs(timeLeft);
    updateTimerDisplay(timeValues);
  }
}

function updateTimerDisplay(timeValues) {
  daysValue.textContent = addLeadingZero(timeValues.days);
  hoursValue.textContent = addLeadingZero(timeValues.hours);
  minutesValue.textContent = addLeadingZero(timeValues.minutes);
  secondsValue.textContent = addLeadingZero(timeValues.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', function () {
  if (targetDate) {
    countdown = setInterval(updateTimer, 1000);
    updateTimer();
    startButton.disabled = true;
  } else {
    Notiflix.Notify.failure("Please choose a date first");
  }
});
toggleStartButton();
