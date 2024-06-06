//------------------------------------------------------------

//scrollování menu a zabalení


$(document).ready(function () {
    $('a[href^="#"]').on('click', function (event) {
      let target = $($(this).attr('href'));
  
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - $('nav').outerHeight()
        }, 600);
  
        // Zavření menu po kliknutí na položku
        $('.navbar-collapse').collapse('hide');
      }
    });
  });


//------------------------------------------------------------

//rozbaleni a zabaleni FAQ

function toggleDisplay(elementId) {
    var element = document.getElementById(elementId);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}


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

//otevreni listku v nove karte

function jidelak(){
  window.open('images/jidelni_listek.jpg');
}

function napojak(){
  window.open('images/napojovy_listek.jpg');
}


//------------------------------------------------------------


//rezervace

$(document).ready(function () {
    $('#rezervace-form').submit(function (e) {
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

// poledni menu odpocet

//deklarace divu
const countdown = document.getElementById('odpocet-cas');
const poledniMenu = document.getElementById('poledni-skryt');

// nastaveni odpoctu
function setTimer() {
  const lunchEndTime = new Date();
  lunchEndTime.setHours(15, 0, 0, 0); 

  // update casu kazdou vterinu
  const intervalId = setInterval(() => {
    const now = new Date();
    const timeRemaining = lunchEndTime - now;

    // vypocet zbyvajiciho casu
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    // formatovani odpoctu
    let formattedTime;
    if (hours > 0) {
      formattedTime = `${hours}h ${minutes}min`;
    } else {
      formattedTime = `${minutes}min`;
    }

    // update odpoctu
    countdown.textContent = `Do konce oběda zbývá: ${formattedTime}`;

    // smazani odpoctu
    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      countdown.textContent = "Oběd skončil!";
    }
  }, 1000);
}

// overeni jestli je cas obeda
function isLunchtime() {
  const now = new Date();
  const lunchStartTime = new Date();
  lunchStartTime.setHours(11, 0, 0, 0);
  const lunchEndTime = new Date();
  lunchEndTime.setHours(15, 0, 0, 0); 

  return now >= lunchStartTime && now <= lunchEndTime;
}

// update casu a zobrazeni menu
function updateMenu() {
  if (isLunchtime()) {
    poledniMenu.style.display = 'block';
    setTimer();
  } else {
    poledniMenu.style.display = 'none';
  }
}

updateMenu();


setInterval(updateMenu, 60000);

//------------------------------------------------------------

