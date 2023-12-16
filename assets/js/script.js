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
    this.now = new Date();
    this.countDownDate = new Date(this.now.getFullYear() + 1, 0, 1);
    this.timerId = timerId;
    this.countdownInterval = null;
    this.timerContainer = document.getElementById(`timer-container-${this.timerId}`);
    // Luxon is a JavaScript library for working with dates and times
    this.luxonTime = luxon.DateTime
    this.timeZoneName = timeZoneName ? timeZoneName : this.luxonTime.local().zoneName;
    this.restartAnimation()
  }

  start_countdown() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    // get time based on timezone name
    let newTimeZone = this.luxonTime.now().setZone(this.timeZoneName);
    // format the time
    const formattedDateTime = `<br>Date: ${newTimeZone.toFormat('D')}, <br>Time: ${newTimeZone.toFormat('h:mm:ss')}`;

    this.currentDate = new Date();
    // p element display the timezone time
    $(`.cur-time-${this.timerId}`).html(formattedDateTime)
    // Calculate the remaining time
    var distance = this.countDownDate - this.currentDate;

    if (distance > 0) {
      // Calculate days, hours, minutes, and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      document.getElementById(`days-timer-${this.timerId}`).innerHTML = days + "d ";
      document.getElementById(`hours-timer-${this.timerId}`).innerHTML = hours + "h ";
      document.getElementById(`minutes-timer-${this.timerId}`).innerHTML = minutes + "m ";
      document.getElementById(`seconds-timer-${this.timerId}`).innerHTML = seconds + "s ";

      // Pick up the timeZone
      const timezoneElement = document.getElementById(`timezone-timer-${this.timerId}`);
      timezoneElement.textContent = `Time zone: ${this.timeZoneName}`;
    } else {
      // If the countdown is over, display a message
      clearInterval(this.countdownInterval);
      document.getElementById(`days-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`hours-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`minutes-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`seconds-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`timer-timer-${this.timerId}`).innerHTML = "Happy new year!";
    }
  }

  hideTimer() {
    this.timerContainer.classList.add("d-none");
    // clear the timer so its not running in the background
    clearInterval(this.countdownInterval);
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
              { duration: 60000, easing: 'linear', fill: 'forwards', iterations: Infinity }
            );
  }

}

document.addEventListener("DOMContentLoaded", () => {
  let timer_count = 1;

  const initialTimer = new countdownTimer(timer_count);
  initialTimer.start_countdown();

  const addTimerBtn = document.getElementById("add-timer-btn");
  addTimerBtn.addEventListener("click", () => {
    // show the timezones list
    showTimeZoneList()
   });
  // listener for timezones list
  $(document).on('click', '.tz-name', function(){
    // hide the timezone list and start the timer
    $('.time-zone-list').toggleClass('d-none')
    timer_count++;
    // pass the button's text that is clicked 
    const newTimer = new countdownTimer(timer_count, $(this).text().trim());
    document.getElementById(`timer-container-${timer_count}`).classList.remove("d-none");
    newTimer.start_countdown();
    if (timer_count === 3) {
      addTimerBtn.classList.add("d-none");
    }

    const removeTimerHandler = () => {
      newTimer.hideTimer();
      document.getElementById(`remove-timer-${timer_count}`).removeEventListener("click", removeTimerHandler);
      timer_count = timer_count > 1 ? timer_count - 1 : 1;
      addTimerBtn.classList.remove("d-none");
    };

    document.getElementById(`remove-timer-${timer_count}`).addEventListener("click", removeTimerHandler);
  
    
  })
});
/**
 * adds li elements with a button as a child element to the time zone div with the 
 * time zone names as the text the names are stored in the json file timezone-names.json
 */
function showTimeZoneList() {
  $('.time-zone-list').toggleClass('d-none')
  if($('.tz-name').length < 1){
    $.getJSON('timezone-names.json', function (data) {
      // Process the JSON data
      $.each(data, function (index, item) {
        $('.time-zone-list ul').append(`<li><button class="tz-name btn btn-info"> ${item}</button></li>`)
      });
    });
  }
  
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // Get existing tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Update the UI
      displayTasks();
  }

  // Clear the input field
  taskInput.value = "";
}

// Function to display tasks on the UI
function displayTasks() {
  const taskList = document.getElementById("taskList");

  // Clear the existing list
  taskList.innerHTML = "";

  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Display each task with a removal option
  tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${task}</span><button class="remove-task-btn" onclick="removeTask(${index})">&#10006;</button>`;
      taskList.appendChild(listItem);
  });
}

// Function to remove a task
function removeTask(index) {
  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task at the specified index
  tasks.splice(index, 1);

  // Update localStorage with the modified task list
  localStorage.setItem("tasks", JSON.stringify(tasks));

// Call displayTasks on page load
displayTasks();
}



