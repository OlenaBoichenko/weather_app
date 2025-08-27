const api = {
    endpoint: '/.netlify/functions/weather',
}

const input = document.querySelector('#input');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') getInfo(input.value.trim());
});

async function getInfo(city) {
  if (!city) return;

  const res = await fetch(`${api.endpoint}?q=${encodeURIComponent(city)}&units=metric&lang=ru`);
  const result = await res.json();
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