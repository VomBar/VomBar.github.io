

function toggleDisplay(id) {
    var unroll = document.getElementById(id);
    if (unroll.style.display === "none" || unroll.style.display === "") {
        unroll.style.display = "block";
} else {
        unroll.style.display = "none";
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