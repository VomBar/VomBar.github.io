const navItems = document.querySelectorAll('#navbarNav a');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const navbarNav = document.getElementById('navbarNav');
      navbarNav.classList.add('collapse');
    });
  });


function toggleDisplay(id) {
    var unroll = document.getElementById(id);
    if (unroll.style.display === "none" || unroll.style.display === "") {
        unroll.style.display = "flex";
} else {
        unroll.style.display = "none";
    }
}


//------------------------------------------------------------

//rozbaleni a zabaleni FAQ


function dotaz1(){
    toggleDisplay("dotaz1-unroll");
}

function dotaz2(){
    toggleDisplay("dotaz2-unroll");
}

function dotaz3(){
    toggleDisplay("dotaz3-unroll");
}

function dotaz4(){
    toggleDisplay("dotaz4-unroll"); 
}


//------------------------------------------------------------

//stale menu - tlacitka


// vsechny polozky
function showAll() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
        item.style.display = 'block';
    });
}

// filtr podle kategorie
function show(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item) => {
        if (item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// sparovani s tlacitky
document.getElementById('vse').addEventListener('click', showAll);
document.getElementById('predkrmy').addEventListener('click', () => show('predkrmy'));
document.getElementById('hlavni').addEventListener('click', () => show('hlavni'));
document.getElementById('dezerty').addEventListener('click', () => show('dezerty'));
document.getElementById('napoje').addEventListener('click', () => show('napoje'));


//------------------------------------------------------------

//odpocet a zobrazeni poledniho menu


  // Set the start and end times for lunch in milliseconds (Czech time)
  var startTime = 11 * 60 * 60 * 1000; // 11am
  var endTime = 15 * 60 * 60 * 1000; // 3pm

  // Get the user's timezone offset in minutes
  var timezoneOffset = new Date().getTimezoneOffset();

  // Convert the start and end times to the user's local timezone
  startTime += timezoneOffset * 60 * 1000;
  endTime += timezoneOffset * 60 * 1000;

  // Get the current time in milliseconds
  var now = new Date().getTime();

  // Check if it's lunchtime
  if (now >= startTime && now <= endTime) {
    // Calculate the remaining time until the end of lunch
    var timeRemaining = endTime - now;

    // Set the initial countdown value
    var countdown = timeRemaining;

    // Set the interval for updating the countdown
    var countdownInterval = setInterval(function() {
      // Calculate the remaining time
      countdown -= 1000;

      // Calculate the hours and minutes remaining
      var hoursRemaining = Math.floor(countdown / 3600000);
      var minutesRemaining = Math.floor((countdown % 3600000) / 60000);

      // Format the countdown string
      var countdownString = 'Do konce oběda zbývá ';
      if (hoursRemaining > 0) {
        countdownString += hoursRemaining + 'h ';
      }
      if (minutesRemaining > 0) {
        countdownString += minutesRemaining + 'min';
      }

      // Update the countdown display
      $('#odpocet-cas').text(countdownString);

      // Check if the countdown has reached 0
      if (countdown <= 0) {
        // Stop the countdown interval
        clearInterval(countdownInterval);

        // Hide the lunch menu
        $('#poledni-skryt').hide();
      }
    }, 1000);

    // Show the lunch menu
    $('#poledni-skryt').show();
  }

