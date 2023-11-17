/*
  Project Information:
  - Project Owner: Prayush Adhikari
  - Project Submission: This project has been submitted to Prodigy Info Tech.
  - Role: Web Development Intern

  Copyright © 2023 Prayush Adhikari. All Rights Reserved.
  Unauthorized copying or reproduction of this file, in part or whole,
  without express permission from the copyright owner is prohibited.
*/

let themeChange = document.getElementById('theme-change');
let textTheme = document.getElementById('text-theme');
let theme = document.getElementById('theme');
let startStopIcon = document.getElementById('start-stop-icon');
let body = document.getElementById('body');
let lapseTime = document.getElementById('lapse-time');

lapseTime.style.display = 'none';

//check if the class is set to bi-moon-fill if yes set to bi-sun-fill when clicked
themeChange.addEventListener('click', () => {
    if (themeChange.className === 'bi bi-moon-fill') {
        themeChange.className = 'bi bi-sun-fill';
        textTheme.innerHTML = 'Light Mode';
        body.style.backgroundImage = 'url("light.jpg")';
        body.style.color = "#000";
    } else {
        themeChange.className = 'bi bi-moon-fill';
        textTheme.innerHTML = 'Dark Mode';
        body.style.backgroundImage = 'url("dark.jpg")';
        body.style.color = "#fff";


    }
});


function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('real-time-clock').textContent = `${hours}:${minutes}:${seconds}`;

    //also extract the date and display it
    const date = now.toDateString();
    document.getElementById('date').textContent = date;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to display the time immediately


let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

var start = 0;
var stop;

var lapsesec=0;
var lapsemin=0;
var lapsehour=0;
var count=0;

function startStop() {
    if (isRunning) {
      clearInterval(timer);
      stop = new Date().getTime();
      lapsesec = stop - start;
      //convert the lapse time from milliseconds to seconds
      if(count==0)
        lapsesec = Math.floor(lapsesec / 1000) - 1;
      else
        lapsesec = Math.floor(lapsesec / 1000);
      count++;


      if(lapsesec >= 60){
        lapsemin = Math.floor(lapseTime / 60000);
      }
      if(lapsemin >= 60){
        lapsehour = Math.floor(lapseTime / 3600000);
      }
      var node = document.getElementById("lapse-time");

      if(lapsesec!=0 || lapsemin!=0 || lapsehour!=0)
      {
        
        document.getElementById("lapse-time").style.display = "block";

        var li = document.createElement('div');
        //set the class name of the div to lapse-time-list
        li.className = 'lapse-time-list';
        //create element div with classname count-lapse inside the div
        var div = document.createElement('div');
        div.className = 'count-lapse';

        //create element div with classname lapse inside the div
        var div2 = document.createElement('div');
        div2.className = 'lapse';

        //add the count variable to the div
        div.innerHTML = count;
        //add the lapse time to div2
        div2.innerHTML = formatTime(lapsehour) + ':' + formatTime(lapsemin) + ':' + formatTime(lapsesec);

        //append the div and div2 to li 
        li.appendChild(div);
        li.appendChild(div2);

        //append the li to the id lapse-time
        node.appendChild(li);
      }
      
      //if count  >=3 then add overflow-y to the id lapse-time
      if(count>=3){
        document.getElementById("lapse-time").style.overflowY = "scroll";
      }

      


      
      startStopIcon.className = 'bi bi-play-fill';
    } else {
      timer = setInterval(updateDisplay, 1000);
      start = new Date().getTime();
      //remove the play icon and add the stop icon
        startStopIcon.className = 'bi bi-stop-fill';
    }
    isRunning = !isRunning;
  }

  function reset() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapsesec=0;
    lapsemin=0;
    lapsehour=0;

    //remove all the child nodes of the id lapse-time
    var node = document.getElementById("lapse-time");
    
    //empty the node
    node.innerHTML = "";

    //set count to 0
    count=0;

    //set node to display none
    node.style.display = "none";

    updateDisplay();
    startStopIcon.className = 'bi bi-play-fill';
  }
  


  function updateDisplay() {

    const display = document.getElementById('stop-watch-time');
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  
  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }