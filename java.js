document.getElementById('Search').addEventListener('click',event=>{
  let city = document.getElementById('City').value 
  console.log(city);
  axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=3d312306696b0930e7fddd369a434ba3`)
  .then(res =>{
    console.log(res.data)
    let lat = res.data.city.coord.lat
    let lon = res.data.city.coord.lon
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=3d312306696b0930e7fddd369a434ba3`)
    .then(resp=>{
      console.log(resp.data);
      let uvi 
      if (resp.data.current.uvi<2 ){
        uvi = 'green'
      }else if(resp.data.current.uvi <5){
        uvi='yellow'
      }else {
        uvi = 'red'
      }
      
      document.getElementById('maindiv').innerHTML=`
      <div class="card">
      <div class= "card-image">
        <img src="http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@2x.png"
        <div class="card-content">
         <div class="content">
            <div class="title">${res.data.city.name}
              <p>${res.data.list[0].dt_txt}</p>
              <p> Temp: ${res.data.list[0].main.temp}°F</p>
              <p> Humidity: ${res.data.list[0].main.humidity}%</p>
              <p> Windspeed: ${res.data.list[0].wind.speed}mph</p>
              <p class= "${uvi}"> uvi: ${resp.data.current.uvi}</p>
          </div>
        </div>
      </div>
  </div>
</div>
      `
      let WeatherDays = []
        let day1 = {
       date: res.data.list[8].dt_txt,
        icon: res.data.list[8].weather[0].icon,
        temp: res.data.list[8].main.temp,
        humidity: res.data.list[0].main.humidity
      }
      let day2 = {
        date: res.data.list[16].dt_txt,
        icon: res.data.list[16].weather[0].icon,
        temp: res.data.list[16].main.temp,
        humidity: res.data.list[16].main.humidity
      }
      let day3 = {
        date: res.data.list[24].dt_txt,
        icon: res.data.list[24].weather[0].icon,
        temp: res.data.list[24].main.temp,
        humidity: res.data.list[24].main.humidity
      }
      let day4 = {
        date: res.data.list[32].dt_txt,
        icon: res.data.list[32].weather[0].icon,
        temp: res.data.list[32].main.temp,
        humidity: res.data.list[32].main.humidity
    }
  let day5 = {
        date: res.data.list[39].dt_txt,
        icon: res.data.list[39].weather[0].icon,
        temp: res.data.list[39].main.temp,
        humidity: res.data.list[39].main.humidity
      }
      WeatherDays.push(day1, day2, day3, day4, day5)
      console.log(WeatherDays);

      WeatherDays.forEach(day => {
        document.getElementById("allfivedays").innerHTML +=`
        <div class="card">
  <div class="card-content">
  <div class="card-image">
  <img src="http://openweathermap.org/img/wn/${day.icon}@4x.png">
    <div class="content">
      <p> temp:${day.temp}°F</p>
      <p> Humidity:${day.humidity}</p>
      </div>
    </div>
    </div>
  </div>
`
      
      })
    })
  })
})