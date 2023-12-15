// jquery listener for viewing video panel and dragging it
$(".video-panel").draggable();
$(".video-panel-btn").on("click", function () {
  $(".video-panel").toggleClass("d-none");
});

/*
 * Class for countdown timer
 */
class countdownTimer {
  constructor(timerId) {
    this.now = new Date();
    this.countDownDate = new Date(this.now.getFullYear() + 1, 0, 1);
    this.timerId = timerId;
    this.countdownInterval = null;
  }

  start_countdown() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    // Get today's date and time
    this.currentDate = new Date();
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
      const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezoneElement.textContent = `Time zone: ${timezoneName}`;
    } else {
      // If the countdown is over, display a message
      clearInterval(this.countdownInterval);
      document.getElementById(`days-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`hours-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`minutes-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`seconds-timer-${this.timerId}`).classList.add("d-none");
      document.getElementById(`timer-timer-${this.timer - container - timerId}`).innerHTML = "Happy new year!";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let timer_count = 1;

  const initialTimer = new countdownTimer(timer_count);
  initialTimer.start_countdown();

  const addTimerBtn = document.getElementById("add-timer-btn");
  addTimerBtn.addEventListener("click", () => {
    timer_count++;
    const newTimer = new countdownTimer(timer_count);
    document.getElementById(`timer-container-${timer_count}`).classList.remove("d-none");
    newTimer.start_countdown();
    if (timer_count === 3) {
      addTimerBtn.classList.add("d-none");
    }
  });
});

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

  // Display each task
  tasks.forEach(task => {
      const listItem = document.createElement("li");
      listItem.textContent = task;
      taskList.appendChild(listItem);
  });
}

// Call displayTasks on page load
displayTasks();