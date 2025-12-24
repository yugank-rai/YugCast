
const apikey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        
        if(response.status == 404){
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json(); 
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            
            document.querySelector(".weather").style.display = "block";
        }
    } catch(error) {
        console.log(error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

checkWeather("varanasi");
