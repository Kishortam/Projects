var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');


// when click of skills tab
function openTab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove('active-link');
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove('active-tab');
    }
    event.currentTarget.classList.add('active-link'); // make active, when we click on any link 
    document.getElementById(tabname).classList.add('active-tab'); // make active, when we click on any tab
};


// for small screen
// when screen is less than or equal to 600px, menu will be shown as 3 horizontal bars.
var sidemenu = document.getElementById('sidemenu');

// when we click on bars icon sideMenu will open, it makes right margin as 0
function openMenu(){   
    sidemenu.style.right = "0";
};
// when we click on cross icon it will close sideMenu, it makes right margin as -200px, means it flows outside of screen
function closeMenu(){
    sidemenu.style.right = "-200px";
};