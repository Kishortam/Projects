// access key from unsplash
const accessKey = "2pjXxuw3Y_B8CEt1xgZIkWi0v7m_FFKGhUxSTql1phU"

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// create an unsplash.com account and get API
// go to API menu, create a new application, get secret key, type API link with secret key on browser and copy it



let keyword = " "; // blank keyword
let page = 1;

// function to search images
async function searchImages(){
    keyword = searchBox.value; // value written in searchbox
    // copied url with params, we can use different params as we need
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=16`;

    const response = await fetch(url);
    const data = await response.json();
    
    // if we overwrite search value, then new result of typed value appear
    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img"); // creating img element
        image.src = result.urls.small;  // src of img 
        const imageLink = document.createElement('a'); // creating image as a link
        imageLink.href = result.links.html; // link will redirect to that html
        imageLink.target = "_blank"; // clicked image will open in a new tab

        imageLink.appendChild(image); 
        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display = "block"; // button will display once results appear on page
};

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
});

// when clicked on show more, it must show more pages for relevant image
showMoreBtn.addEventListener('click', ()=>{
    page++;
    searchImages(); // again call
});