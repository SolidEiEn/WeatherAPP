const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(nameCity.value === '' || nameCountry === '')
    {
        showError('Ambos campos son obligatorios');
        return;
    }
    callAPI(nameCity.value, nameCountry.value);
})

function callAPI(city, country){
    const apiId = 'API_KEY_OPENWEATHER';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    
    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJSON => {
            if(dataJSON.cod === '404'){
                showError('Ciudad no encontrada');
            }else{
                clearHTML();
                showWeather(dataJSON);
            }       
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_max, temp_min}, weather:[arr]} = data;3
    const degrees = kelvinToCentigrade(temp);
    const degrees_max = kelvinToCentigrade(temp_max);
    const degrees_min = kelvinToCentigrade(temp_min);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
        <h2>${degrees}°C</h2>            
        <p class="Max">Máx: ${degrees_max}°C</p>
        <p class="Min">Min: ${degrees_min}°C</p>
    `;

    result.appendChild(content);
}

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove()
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}