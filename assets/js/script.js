// jquery listener for viewing video panel and dragging it
$(".video-panel").draggable();
$(".video-panel-btn").on("click", function() {
  $(".video-panel").toggleClass("d-none");
});

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
    console.log(this.timeZoneName);
    this.restartAnimation();
    this.updateCountdown();
  }

  updateCountdown() {
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
    const distance = newYearsEve.diff(timeInZone).as("milliseconds");

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

      const circle = document.querySelector(`.circle-${this.timerId}`);
      const animationDuration = distance / 1000;
      circle.style.animation = `countdown-animation-${this.timerId} ${animationDuration}s linear infinite`;

      const timezoneElement = document.getElementById(`timezone-timer-${this.timerId}`);
      timezoneElement.textContent = `Time zone: ${this.timeZoneName}`;

      const formattedDateTime = `Local Time: ${timeInZone.toFormat("D")}, ${timeInZone.toFormat("HH:mm:ss")}`;
      $(`.cur-time-${this.timerId}`).html(formattedDateTime);
    } else {
      document.getElementById(`timer-container-${this.timerId}`).innerHTML = "Happy new year!";
    }
  }

  hideTimer() {
    this.timerContainer.classList.add("d-none");
  }

  /**
   * This function is for the timer circle animation
   */
  restartAnimation() {
    //this is the svg for the timer animation
    $(`.timer-${this.timerId}`).prepend(`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
          <linearGradient id="GradientColor">
          <stop offset="0%" stop-color="#e91e63" />
          <stop offset="100%" stop-color="#673ab7" />
          </linearGradient>
      </defs>
      <circle class="circle-${this.timerId}" cx="140" cy="140" r="145"/>
  </svg>`);

    const element = document.querySelector(`.circle-${this.timerId}`);
    element.animate(
      { strokeDashoffset: [0, -1019] },
      { duration: 60000, easing: "linear", fill: "forwards", iterations: Infinity }
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let timer_count = 1;
  const timers = [];

  const initialTimer = new countdownTimer(timer_count);

  // add the timer to the timers array
  timers.push(initialTimer);

  const addTimerBtn = document.getElementById("add-timer-btn");
  addTimerBtn.addEventListener("click", () => {
    // show the timezones list
    showTimeZoneList();
  });
  // listener for timezones list
  $(document).on("click", ".tz-name", function() {
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
      timer.updateCountdown();
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
    $.getJSON("timezone-names.json", function(data) {
      // Process the JSON data
      $.each(data, function(index, item) {
        $(".time-zone-list ul").append(`<li><button class="tz-name btn btn-info"> ${item}</button></li>`);
      });
    });
  }
}
