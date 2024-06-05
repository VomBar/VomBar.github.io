//------------------------------------------------------------

//scrollování menu a zabalení

$(document).ready(function () {
  // menu nepřekrývá nadpis při scrollu
  $('a[href^="#"]').on('click', function (event) {
      let target = $($(this).attr('href'));

      if (target.length) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top - $('nav').outerHeight()
          }, 600);

          // zabalení menu po kliknutí na polozku
          let menu = document.getElementById('menu-list');
          menu.classList.add('collapsed');
      }
  });
});


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


document.addEventListener('DOMContentLoaded', function () {
  const lunchSpecialDiv = document.getElementById('poledni-skryt');
  const closeBtn = document.getElementById('closeBtn');
  
  // Function to check if the current time is within the specified range
  function isLunchTime() {
      const now = new Date();
      const hours = now.getHours();
      const timezoneOffset = now.getTimezoneOffset() / 60; // Convert minutes to hours

      // Check if the current time is between 11 am and 2 pm GMT+1
      return hours >= 11 + timezoneOffset && hours <= 15 + timezoneOffset;
  }

  
  function updateLunchSpecial() {
      if (isLunchTime()) {
          lunchSpecialDiv.style.display = 'block';
          setTimer();
      } else {
          lunchSpecialDiv.style.display = 'none';
      }
  }

  // Daily timer
  function setTimer() {
      const endDate = new Date();
      endDate.setHours(14); // (2 pm GMT+1)
      endDate.setMinutes(0);
      endDate.setSeconds(0);

      const now = new Date();
      const timeDifference = endDate - now;

      // Display the time difference as a countdown timer
      displayTimer(timeDifference);

      
      const timerInterval = setInterval(function () {
          const timeDifference = endDate - new Date();
          displayTimer(timeDifference);

          
          if (timeDifference <= 0) {
              clearInterval(timerInterval);
              lunchSpecialDiv.style.display = 'none';
              // Show the lunch special again after 3 minutes
              setTimeout(function () {
                  updateLunchSpecial();
              }, 180000);
          }
      }, 1000);
  }

  // Display timer
  function displayTimer(timeDifference) {
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('odpocet').innerText = `Zbývá: ${hours}h ${minutes}m`;
  }

  closeBtn.addEventListener('click', function () {
      lunchSpecialDiv.style.display = 'none';
      setTimeout(function () {
          updateLunchSpecial();
      }, 180000);
  });

  updateLunchSpecial();
  setInterval(updateLunchSpecial, 60000);
});


//------------------------------------------------------------

//otevreni listku v nove karte

function jidelak(){
  window.open('images/jidelni_listek.jpg');
}

function napojak(){
  window.open('images/napojovy_listek.jpg');
}


//------------------------------------------------------------

$(document).ready(function () {
    $('#rezervace-form').submit(function (e) {
        // Prevent default form submission
        e.preventDefault();

        var formData = $(this).serialize();

        // AJAX request
        $.ajax({
            type: 'POST',
            url: '../php/rezervace.php', 
            data: formData,
            success: function (response) {
                console.log(response);
                var responseData = JSON.parse(response);
                alert(responseData.message);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});


//------------------------------------------------------------

// Get the elements for the countdown timer and the menu container
const countdown = document.getElementById('odpocet-cas');
const poledniMenu = document.getElementById('poledni-skryt');

// Function to set the countdown timer
function setTimer() {
  const lunchEndTime = new Date();
  lunchEndTime.setHours(15, 0, 0, 0); // Set lunch end time to 3 PM

  // Update the timer every second
  const intervalId = setInterval(() => {
    const now = new Date();
    const timeRemaining = lunchEndTime - now;

    // Calculate hours and minutes remaining
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // Format the time as "Xh Ymin"
    let formattedTime;
    if (hours > 0) {
      formattedTime = `${hours}h ${minutes}min`;
    } else {
      formattedTime = `${minutes}min`;
    }

    // Update the countdown display
    countdown.textContent = `Do konce oběda zbývá: ${formattedTime}`;

    // Clear the interval when lunch time ends
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      countdown.textContent = "Oběd skončil!";
    }
  }, 1000);
}

// Function to check if it's lunchtime
function isLunchtime() {
  const now = new Date();
  const lunchStartTime = new Date();
  lunchStartTime.setHours(11, 0, 0, 0); // Set lunch start time to 11 AM
  const lunchEndTime = new Date();
  lunchEndTime.setHours(15, 0, 0, 0); // Set lunch end time to 3 PM

  return now >= lunchStartTime && now <= lunchEndTime;
}

// Update the menu visibility and timer based on the time
function updateMenu() {
  if (isLunchtime()) {
    poledniMenu.style.display = 'block';
    setTimer();
  } else {
    poledniMenu.style.display = 'none';
  }
}

// Call the updateMenu function to initially set the menu state
updateMenu();

// Update the menu state every minute
setInterval(updateMenu, 60000);

//------------------------------------------------------------


const MyCarusel = document.querySelector('#carouselExampleAutoplaying')

const Carousel = new bootstrap.Carousel(MyCarusel, {
    interval: 2000,
    touch: false
})
