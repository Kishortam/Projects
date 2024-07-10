// references of elements
const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#list-container');

// to add task
function addTask(){
    if(inputBox.value == ''){  // if nothing is written or typed
        alert("You must write something!"); // show alert
    }
    else{
        let li = document.createElement('li'); // if typed something, create li element
        li.innerHTML = inputBox.value; // in Li element, add value of input box
        listContainer.appendChild(li); // append it to list of listContainer

        // to add delete or cross icon in the end of task
        let span = document.createElement('span'); // create a span element
        span.innerHTML = "\u00d7"; // add cross sign
        li.appendChild(span); // append it to end of list element
    }
    //once task is added, make input box clear
    inputBox.value = "";
    // it will save the updated content or task in browser
    saveData();
}

// to checked or unchecked task & remove task
listContainer.addEventListener('click', function(e){  // added event on listContainer
    if(e.target.tagName === 'LI'){  // if clicked item is LI
        e.target.classList.toggle('checked'); // then toggle to checked
        saveData(); // save the updated data
    }
    else if(e.target.tagName === "SPAN"){ // if clicked item is SPAN
        e.target.parentElement.remove(); // remove that task
        saveData(); // save the updated data
    }
}, false);


// to save data on browser, it will not remove data on refresh
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// to show task on opening of application
function showtask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showtask(); // calling an function default