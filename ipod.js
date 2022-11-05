// Create your global variables below:
var tracklist = ["Alexander Hamilton", "Aaron, Burr", "My Shot", "The Story of Tonight", "The Schuyler Sisters", "Farmer Refuted", 
"You'll Be Back", "Right Hand Man", "A Winter's Ball", "Helpless"];
var volLevels = [];
let timer;
let timerRunning;

let i = document.getElementById('time-slider'),
    o = document.getElementById('time-elapsed');
//change elapsed time display in response to slider movement
//Not necessary for assignment but i think it looks better
//copied from: https://www.impressivewebs.com/onchange-vs-oninput-for-range-sliders/
i.addEventListener('input', function () {
	o.innerHTML = secondsToMs(i.value);
	if (timerRunning ) {
		clearInterval(timer);
		timer = setInterval(incrementTime, 1000);
	}
}, false);


function init() {
	//initialize volLevels array
	var i;
	for (var i=0; i<6; i++) {
		volLevels[i] = document.getElementById("vl"+i);
	}
	volLevels[0].style.backgroundColor = "#9f5cc4";
	volLevels[1].style.backgroundColor = "#9f5cc4";
	volLevels[2].style.backgroundColor = "#9f5cc4";
	//volume change anouncment  : doesn't work :/ bc aria-live only applies to unhidden text
	var liveregion = document.createElement('div');
	liveregion.setAttribute('aria-live', 'alert');
	liveregion.setAttribute('aria-atomic', 'true');
	liveregion.setAttribute('class', 'liveregion visuallyhidden');
	document.querySelector(".volume-rocker").appendChild(liveregion);
};

function volUp() {
	//find the first rectangle that's white and color it
	for (var i = 0; i < 6; i++) {
		if (volLevels[i].style.backgroundColor == "") {
			volLevels[i].style.backgroundColor = "#9f5cc4";
			updateLiveRegion("Volume is set to" + (i + 1));
				//document.querySelector('.liveregion').textContent = 'Volume set to ' + (i + 1);
			return;
		}
	}
	
}

function volDown() {
	//find the last purple rectangle and change it to white. 
	for (var i = 5; i >= 0; i--) {
		if (volLevels[i].style.backgroundColor != "") {
			volLevels[i].style.backgroundColor = "";
			//document.querySelector('.liveregion').textContent = 'Volume set to ' + (i);
			return;
		}
	}
}

function switchPlay() {
	// switch the play pause icons and change the intervals depending
	document.getElementById("time-elapsed").innerHTML = secondsToMs(document.getElementById("time-slider").value);
	if (document.getElementById("play").innerHTML == "pause") {
		document.getElementById("play").innerHTML = "play_arrow";
		clearInterval(timer);
		timerRunning = false;
	} else {
		document.getElementById("play").innerHTML = "pause";
		timer = setInterval(incrementTime, 1000);
		timerRunning = true; 
	}
}	
function incrementTime() {
	let slider = document.getElementById("time-slider"); 
	slider.stepUp();
	if (slider.value == 180) {
		clearInterval(timer);
		nextSong();
		switchPlay();
		switchPlay();
	}
	document.getElementById("time-elapsed").innerHTML = secondsToMs(slider.value);
}
function nextSong() {
	//reset slider and time-elapsed values
	document.getElementById("time-slider").value = 0;
	document.getElementById("time-elapsed").innerHTML = "0:00";
	//if the song is at the end then go to the beginning 
	if (document.getElementById("player-song-name").innerHTML == tracklist[9]) {
		document.getElementById("player-song-name").innerHTML = tracklist[0];
		return;
	}
	//find the index of currently plaiying song in trackList and get the next song in array 
	for (var i=0;i<9;i++) {
		if (document.getElementById("player-song-name").innerHTML == tracklist[i]) {
			document.getElementById("player-song-name").innerHTML = tracklist[i+1];
			return;
		}
	}
}

function prevSong() {
	document.getElementById("time-slider").value = 0;
	document.getElementById("time-elapsed").innerHTML = "0:00";
	//if at beginning go to end 
	if (document.getElementById("player-song-name").innerHTML == tracklist[0]) {
		document.getElementById("player-song-name").innerHTML = tracklist[9];
		return;
	}
	for (var i=9;i>=0;i--) {
		if (document.getElementById("player-song-name").innerHTML == tracklist[i]) {
			document.getElementById("player-song-name").innerHTML = tracklist[i-1];
			return;
		}
	}
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();