// references
var selectField = document.getElementById('selectField');  // field to select
var selectText = document.getElementById('selectText');   
var options = document.getElementsByClassName('options');
var list = document.getElementById('list');
var arrowIcon = document.getElementById('icon');


// to show and hide list of menu when click on select
selectField.onclick = function(){
    list.classList.toggle('hide');
    arrowIcon.classList.toggle('rotate');
}

// to put selected menu name on select field
for(option of options){
    option.onclick = function(){
        selectText.innerHTML = this.textContent;
        list.classList.toggle('hide');
        arrowIcon.classList.toggle('rotate');
    }
}