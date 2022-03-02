console.log('This is client side Java Script');//



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pLocation = document.getElementById('pLocation')
const pWeather = document.getElementById('pWeather')
const pTemperature = document.getElementById('pTemperature')
const pTime = document.getElementById('pTime')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    pLocation.textContent = 'Loading...'
    pWeather.textContent = ''
    pTemperature.textContent = ''
    pTime.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            pLocation.textContent = data.error
        } else {
            pLocation.textContent = data.location
            pWeather.textContent = data.weather
            pTemperature.textContent = data.temperature
            pTime.textContent = data.time
        }
    })
})
})