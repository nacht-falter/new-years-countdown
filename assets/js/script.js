/// Set the date we're counting down to
const now = new Date();
var countDownDate =  new Date(now.getFullYear() + 1, 0, 1);

// jquery listener for viewing video panel and dragging it
$(".video-panel").draggable();
$('.video-panel-btn').on('click', function(){
    $(".video-panel").toggleClass('d-none')
})

// Update the countdown every 1 second
var countdownInterval = setInterval(function() {

    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the remaining time
    var distance = countDownDate - now;

    // Calculate days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML of the countdown elements
    document.getElementById("days").innerHTML = days + "d";
    document.getElementById("hours").innerHTML = hours + "h";
    document.getElementById("minutes").innerHTML = minutes + "m";
    document.getElementById("seconds").innerHTML = seconds + "s";

    // Pick up the timeZone
    const timezoneName = now.toLocaleString('en-US', { timeZoneName: 'short' });

    const timezoneElement = document.getElementById('timezone');
    timezoneElement.textContent = `Time zone: ${timezoneName}`;
    

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerHTML = "Happy new year!";
        document.getElementById("hours").innerHTML = "";
        document.getElementById("minutes").innerHTML = "";
        document.getElementById("seconds").innerHTML = "";
    }
}, 1000);