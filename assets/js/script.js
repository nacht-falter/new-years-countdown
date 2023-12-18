
/*
 * Class for countdown timer
 */
class countdownTimer {
  constructor(timerId, timeZoneName) {
    this.timerId = timerId;
    this.timerContainer = document.getElementById(`timer-container-${this.timerId}`);
    // Luxon is a JavaScript library for working with dates and times
    this.luxonTime = luxon.DateTime;
    this.timeZoneName = timeZoneName ? timeZoneName : this.luxonTime.local().zoneName;
    this.timeTillNewYears = null;
    this.updateCountdown();
    this.restartAnimation(this.timerId);
  }

  updateCountdown(simulateCountdown) {
    // calculate the distance between new years eve in the selected timezone and the users local time
    const userTime = this.luxonTime.local();
    const timeInZone = this.luxonTime.local().setZone(this.timeZoneName);

    const currentYear = this.luxonTime.now().year;

    // Set New Year's Eve for the next year in the specified timezone
    const newYearsEve = this.luxonTime.fromObject(
      {
        year: currentYear + 1,
        month: 1, // December
        day: 1, // 31st
        hour: 0, // 11 PM (New Year's Eve)
        minute: 0, // 59 minutes
        second: 0, // 59 seconds
      },
      { zone: this.timeZoneName }
    );
    // get the distance between the users local time and new years eve in the selected timezone
    let distance;
    if (!simulateCountdown && simulateCountdown != 0) {
      distance = newYearsEve.diff(timeInZone).as("milliseconds");
    } else {
      distance = simulateCountdown * 1000;
    }
    this.timeTillNewYears = distance;

    if (distance > 0) {
      // calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById(`days-timer-${this.timerId}`).innerHTML = days + "d ";
      document.getElementById(`hours-timer-${this.timerId}`).innerHTML = hours + "h ";
      document.getElementById(`minutes-timer-${this.timerId}`).innerHTML = minutes + "m ";
      document.getElementById(`seconds-timer-${this.timerId}`).innerHTML = seconds + "s ";

      const timezoneElement = document.getElementById(`timezone-timer-${this.timerId}`);
      timezoneElement.textContent = `Time zone: ${this.timeZoneName}`;

      const formattedDateTime = `Local Time: ${timeInZone.toFormat("D")}, ${timeInZone.toFormat("HH:mm:ss")}`;
      $(`.cur-time-${this.timerId}`).html(formattedDateTime);
    } else {
      document.getElementById(`timer-container-${this.timerId}`).innerHTML = "Happy new year!";
      //show the fireworks when its new years
      $(".pyro").removeClass("d-none");
    }
  }

  hideTimer() {
    this.timerContainer.classList.add("d-none");
  }

  /**
   * This function is for the timer circle animation
   */
  restartAnimation(timerId) {
    const svgContainer = $(`.timer-${timerId}`);
    svgContainer.prepend(`
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#e91e63" />
            <stop offset="100%" stop-color="#673ab7" />
            </linearGradient>
        </defs>
        <circle class="circle-${timerId}" cx="140" cy="160" r="145"/>
    </svg>`);

    const element = document.querySelector(`.circle-${timerId}`);

    let self = this;

    function updateAnimation() {
      const totalDashes = 910; // Total number of dashes in the circle
      const millisecondsInYear = 31536000000; // Number of milliseconds in a year

      // Get the remaining time in milliseconds 15768000000 86400000
      const timeLeftInYear = self.timeTillNewYears;

      // Calculate the percentage of the year that has passed
      const percentageYearPassed = (millisecondsInYear - timeLeftInYear) / millisecondsInYear;

      // Calculate the number of dashes remaining based on the percentage
      const dashesRemaining = Math.floor(totalDashes * (1 - percentageYearPassed));
      // -910 is the circle completely gone so add the dashesRemaining to -910
      element.style.strokeDashoffset = -dashesRemaining;

      requestAnimationFrame(updateAnimation);
    }

    updateAnimation();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let timer_count = 1;
  const timers = [];
  let simulateCountdown = null;

  const initialTimer = new countdownTimer(timer_count);

  // add the timer to the timers array
  timers.push(initialTimer);

  const addTimerBtn = document.getElementById("add-timer-btn");
  addTimerBtn.addEventListener("click", () => {
    // show the timezones list
    showTimeZoneList();
  });
  // btn listener for simulating the countdown
  $("#simulate-btn").on("click", function () {
    if ($(this).text() === "Close simulator") {
      location.reload();
    } else {
      simulateCountdown = 10;
      $(this).text("Close simulator");
    }
  });

  // listener for timezones list
  $(document).on("click", ".tz-name", function () {
    // hide the timezone list and start the timer
    $(".time-zone-list").toggleClass("d-none");
    timer_count++;
    // pass the button's text that is clicked
    const newTimer = new countdownTimer(timer_count, $(this).text().trim());

    // add the timer to the timers array
    timers.push(newTimer);
    document.getElementById(`timer-container-${timer_count}`).classList.remove("d-none");
    if (timer_count === 3) {
      addTimerBtn.classList.add("d-none");
    }

    const removeTimerHandler = () => {
      newTimer.hideTimer();
      document.getElementById(`remove-timer-${timer_count}`).removeEventListener("click", removeTimerHandler);
      timer_count = timer_count > 1 ? timer_count - 1 : 1;

      // remove the timer from the timers array
      timers.splice(timers.indexOf(newTimer), 1);
      addTimerBtn.classList.remove("d-none");
    };

    document.getElementById(`remove-timer-${timer_count}`).addEventListener("click", removeTimerHandler);
  });

  // Set interval on the global scope so it can be cleared later
  setInterval(() => {
    timers.forEach((timer) => {
      timer.updateCountdown(simulateCountdown);
      if (simulateCountdown) {
        simulateCountdown--;
      }
    });
  }, 1000);
});

/**
 * adds li elements with a button as a child element to the time zone div with the
 * time zone names as the text the names are stored in the json file timezone-names.json
 */
function showTimeZoneList() {
  $(".time-zone-list").toggleClass("d-none");
  if ($(".tz-name").length < 1) {
    $.getJSON("timezone-names.json", function (data) {
      // Process the JSON data
      $.each(data, function (index, item) {
        $(".time-zone-list ul").append(`<li><button class="tz-name btn btn-info"> ${item}</button></li>`);
      });
    });
  }
}

// This displays a notification on the startpage if there are uncompleted tasks
function fetchUncompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks.some((task) => !task.completed);
}

function showNotificationIfTasksExist() {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = "";

  if (fetchUncompletedTasks()) {
    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-info", "alert-dismissible", "fade", "show");
    alert.setAttribute("role", "alert");

    alert.innerHTML = `
        You have <a href="list.html" title="To-Do List">uncompleted tasks</a> in your To-Do list!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

    alertContainer.appendChild(alert);
  }
}

showNotificationIfTasksExist();
