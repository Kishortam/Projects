const modeRef = document.querySelector('#mode');
const bodyRef = document.querySelector('body');
let mode = 'light';

modeRef.addEventListener('click', function(e){
    if(mode === 'light'){
        mode = 'dark';
        bodyRef.classList.add('dark');
        bodyRef.classList.remove('light');

        // to change button bg
        modeRef.style.backgroundColor = "white";
        modeRef.style.color = "black";
    }
    else{
        mode = 'light';
        bodyRef.classList.add('light');
        bodyRef.classList.remove('dark');

        // to change button bg
        modeRef.style.backgroundColor = "black";
        modeRef.style.color = "white";
    }
})