const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const searchForm = document.querySelector(".search-container");
const garntAcess = document.querySelector(".grantlocationAcess");

const userInformation = document.querySelector(".userInformation");
const loading = document.querySelector(".loadingScreen");



let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {

    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");

        oldTab = newTab;
        console.log("USER tab")
        oldTab.classList.add("current-tab");

        
        if (!searchForm.classList.contains("active")) {

           searchForm.classList.add("active");
            userInformation.classList.remove("active");
            garntAcess.classList.remove("active");
            
        }
        else {
            searchForm.classList.remove("active");
            userInformation.classList.remove("active");
            
            console.log("contain");
            getfromSessionStorage();
            
        }

    }


}


userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    console.log("user buttom clicked");
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    console.log("search Buttom clicked");
    switchTab(searchTab);
});

garntAcess.a

function getfromSessionStorage() {
    const localData = sessionStorage.getItem("user-info");

    if (!localData) {
        garntAcess.classList.add("active");

    }
    else {
        const coodinate = JSON.parse(localData);
        featchWeatherInformation(coodinate);

    }


}


async function featchWeatherInformation(coodinate) {

    const { lat, lon } = coodinate;


    garntAcess.classList.remove("active");
    
    try {
        loading.classList.add("active");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data1 = await response.json();

        loading.classList.remove("active");
        userInformation.classList.add("active");

        renderInformation(data1);


    } catch (error) {
        loading.classList.remove("active");


    }


}

function renderInformation(weatherInfo) {

    const cityName = document.querySelector("[data-cityName]");
    const cityIcon = document.querySelector("[data-cityIcon]");
    const description = document.querySelector("[data-des]");
    const whetherIcon = document.querySelector("[data-whetherIcon]");
    const whetherTemp = document.querySelector("[data-whetherTemp]");

    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-clouds]");




    cityName.innerText = weatherInfo?.name;

    cityIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    description.innerText = weatherInfo?.weather?.[0]?.description;
    whetherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    whetherTemp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    clouds.innerText = `${weatherInfo?.clouds?.all}%`;
    console.log(cityName);


}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const coodinate = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    console.log(coodinate);

    sessionStorage.setItem("user-info", JSON.stringify(coodinate));
    featchWeatherInformation(coodinate);

}


// garntAcess detail mentuon here
const garntAcessbtn = document.querySelector("[data-grantAcessbtn]");
garntAcessbtn.addEventListener("click", getLocation);


// searchForm detail here

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    cityName = searchInput.value;

    if (cityName == "") {
        return;
    }
    else {
        featchSearchWetherinfo(cityName);
    }
})


async function featchSearchWetherinfo(city) {

    garntAcess.classList.remove("active");
    loading.classList.add("active");
    userInformation.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data2 = await response.json();

        loading.classList.remove("active");
        userInformation.classList.add("active");
        renderInformation(data2);
    }
    catch (error) {

    }

}