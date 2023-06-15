const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/weather"
}
//Add an event listener to search-box
//keypress... call a method


// if event is on enter... 
/// make an api call


const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getWeatherInfo(searchBox.value);
    }
}


function getWeatherInfo(cityName) {
    let url = `${api.base}?q=${cityName}&units=metric&appid=${api.key}`;

    fetch(url).then((response) => response.json())
        .then((data) => {
            console.log(data)

            // fetch('http://example.com/movies.json')
            // .then((response) => response.json())
            // .then((data) => {console.log(data)
            if (data.cod == 200) {
                displayResults(data)
            } else {
                alert(data.message)
            }
        })
    // });

}



function displayResults(data) {
    console.log("Display to be updated");
    document.querySelector(".city").innerText = `${data.name},${data.sys.country}`;
    temp = Math.round(data.main.temp);
    document.querySelector(".temp").innerText = `${temp} °c`;
    document.querySelector(".weather").innerText = `${data.weather[0].main}`;
    temp_max = Math.round(data.main.temp_max);
    temp_min = Math.round(data.main.temp_min);
    document.querySelector(".hi-low").innerText = `${temp_max} °c / ${temp_min} °c`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);



}




function dateBuilder(d) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

    const DATE_FORMAT_OPTIONS = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    return d.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS)
    // return `${day}, ${date} ${month} ${year}`
}

getWeatherInfo("mumbai")


