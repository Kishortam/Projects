
// references
const inputRef = document.querySelector(".search input");
const buttonRef = document.querySelector(".search button");
const tempRef = document.querySelector(".weather .temp");
const cityRef = document.querySelector(".weather .city");
const conditionRef = document.querySelector(".weather .condition");
const conditionIcon = document.querySelector('.weather .weather-icon');
const humidRef = document.querySelector(".col .humidity");
const windRef = document.querySelector(".col .wind");

// add eventListner on submit button clicked
buttonRef.addEventListener('click', (e)=>{
    e.preventDefault();
    fetchData(inputRef.value);
});

function fetchData(location){  // fetch data from API
    fetch(`http://api.weatherapi.com/v1/current.json?key=14c86e50a2ef4c6980b61503232912&q=${location}&aqi=no`)
    .then(res => res.json()) // convert serialised data to json
    .then((res) => updateWeather(res)) // converted or refer to dom elements
    .catch(function(e){ // catch error if we dont find details
        console.log(e);
    })
};

// update correspondant values
function updateWeather(data){
    tempRef.innerText = Math.round(data.current.temp_c) + "°C"; // rounded off temp
    cityRef.innerText = data.location.name;
    conditionRef.innerText = data.current.condition.text;
    conditionIcon.src = data.current.condition.icon;
    humidRef.innerText = data.current.humidity + "%"; // add symbols
    windRef.innerText = data.current.wind_kph + " km/h";

    // if(data.current.condition.text == "Light Rain Shower"){
    //     conditionIcon.src = "images/drizzle.png";
    // }

    // if city name entered display block of values
    document.querySelector(".weather").style.display = "block";

}