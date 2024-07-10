
// references
let speech = new SpeechSynthesisUtterance();  // speech function
let butRef = document.querySelector(".row button"); // button reference to click
let textRef = document.querySelector('textarea');  // textarea ref


// to get all voices
let voices = [];  // empty voices array
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () =>{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

// to play in differt voices when click on it
voiceSelect.addEventListener('change', ()=>{
    speech.voice = voices[voiceSelect.value];
});


// click on listen button, to speak a text
butRef.addEventListener('click', (e)=>{
    speech.text = textRef.value;  // value written in text area
    window.speechSynthesis.speak(speech);
})