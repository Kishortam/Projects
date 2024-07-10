// references
const progress = document.querySelector('#progress'); // progress bar
const song = document.querySelector('#song'); // audio
const cntrlIcon = document.querySelector('#cntrlIcon'); // play button

// length of song
song.onloadmetadata = function(){
    progress.max = song.duration;  // max length of progress bar is song's duration
    progress.value = song.currentTime;  
}

// toggle play/pause button
function playPause(){
   if(cntrlIcon.classList.contains("fa-pause")){ // if pause icon
    song.pause();                               // puase the song
    cntrlIcon.classList.remove("fa-pause");  // want to play, remove pause icon
    cntrlIcon.classList.add("fa-play"); // add play
   } 
   else{
    song.play();     // else play song
    cntrlIcon.classList.add("fa-pause"); // toggle to pasue
    cntrlIcon.classList.remove("fa-play"); // remove play
   }
}


// progress bar, progress will increase by 1 sec at a time
if(song.play()){
    setInterval(() => {
        progress.value = song.currentTime;
    }, 100);
}


// if direct slide in between progress bar, play the song, change icons accordingly
progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    cntrlIcon.classList.add("fa-pause");
    cntrlIcon.classList.remove("fa-play");
}