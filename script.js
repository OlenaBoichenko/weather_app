const api = {
    endpoint: 'https://api.openweathermap.org/data/2.5/',
    key: '45851954e0676ccefceb04cc38b4c9dd'
}

// const globalDate = {
//     endpoint: 'https://api.ipgeolocation.io/timezone',
//     key: 'a45c396dc695449d913b8ab81889d3a0'
// }

const input = document.querySelector('#input');
input.addEventListener('keypress', enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
        // getGlobalDate(input.value);
    }
}

// async function getGlobalDate(info) {
//     const resDate = await fetch(`${globalDate.endpoint}?apiKey=${globalDate.key}&location=${info}`);
//     const resultDate = await resDate.json();
//     console.log(resultDate);
//     timeZone(resultDate);
// }

// function timeZone(resultDate) {
//     let date = document.querySelector('#date');
//     date.textContent = `${resultDate.date_time_txt}`;
// }

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    console.log(result);
    show(result);
}

function show(result) {
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let tempNow = document.querySelector('#tempNow');
    tempNow.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`

    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`

    let condition = document.querySelector('#condition');
    condition.textContent = `${result.weather[0].description}`;

    if (result.weather[0].main == 'Clouds') {
        document.body.style.backgroundImage = 'url(cloud.gif)';
    }

    else if (result.weather[0].main == 'Rain') {
        document.body.style.backgroundImage = 'url(rain.gif)';
    }

    else if (result.weather[0].main == 'Clear') {
        document.body.style.backgroundImage = 'url(sun.jpg)';
    }

    else if (result.weather[0].main == 'Mist') {
        document.body.style.backgroundImage = 'url(mist.gif)';
    }

    else if (result.weather[0].main == 'Snow') {
        document.body.style.backgroundImage = 'url(snow.gif)';
    }

    else if (result.weather[0].main == 'Haze') {
        document.body.style.backgroundImage = 'url(haze.jpg)';
    }

    else {
        document.body.style.backgroundColor = '#845EC2'
    }

    let difference = document.querySelector('#difference');
    difference.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> Max: ${Math.round(result.main.temp_max)}<span>°</span>`
}

function getOurDate() {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const nameDay = new Date();
    let day = days[nameDay.getDay()] + ' ' + nameDay.getDate() + ' ' + months[nameDay.getMonth()] + ' ' + nameDay.getFullYear();

    let resultDay = document.querySelector('#date');
    resultDay.innerHTML = day;
}