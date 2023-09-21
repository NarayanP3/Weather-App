if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        
        console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        const weather_con = async () => {
            const apikey = '7d627e3aa95ec0fa58c9be0600daa791';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
            const response = await fetch(url);
        
            if (response.status !== 200 ){
                throw new error('error occurred');
            }
        
            const data = await response.json();

            const para1 = document.querySelector('.city');

            const days_in_Week = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const currentDate = new Date();

           const getdayOfWeek = currentDate.getDay();

           const date = currentDate.getDate();
           const getmonth = currentDate.getMonth();

           const temp_min = Math.round(data.main.temp_min);
           const temp_max = Math.round(data.main.temp_max);
           const temp = Math.round(data.main.temp);
           const feels_like = Math.round(data.main.feels_like);

            para1.innerHTML = `<p>${data.name}</p>
                              <p>${days_in_Week[getdayOfWeek]}, ${date} ${months[getmonth]}</p>
                              <p class="temp">${temp}&deg;</p>
                              <p>${temp_min}&deg;/${temp_max}&deg; Feels like ${feels_like}&deg;</p>
                              <p>${data.weather[0].main}</p>`;

            const para2 = document.querySelector('.props');

            function degreesToCardinal(deg) {
              const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
            
              deg %= 360;
              if (deg < 0) deg += 360;
            
              const index = Math.round(deg / 45);
              return directions[index];
            };
            
            const deg = degreesToCardinal(data.wind.deg);

            para2.innerHTML = `<p> &nbsp;&nbsp;&nbsp; Humidity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.main.humidity}% &nbsp;&nbsp;&nbsp;</p>
                              <p> &nbsp;&nbsp;&nbsp; Pressure  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.main.pressure} mb &nbsp;&nbsp;&nbsp;</p>
                              <p> &nbsp;&nbsp;&nbsp; Wind Speed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.wind.speed} kph &nbsp;&nbsp;&nbsp;</p>
                              <p> &nbsp;&nbsp;&nbsp; Wind Direction &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${deg} &nbsp;&nbsp;&nbsp;</p>
                              <p> &nbsp;&nbsp;&nbsp; Precipitation </p>
                              <p> &nbsp;&nbsp;&nbsp; Visibility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.visibility / 1000} km &nbsp;&nbsp;&nbsp;</p>
                              <p> &nbsp;&nbsp;&nbsp; UV Index</p>`
        
            return data;
        } 
        
        weather_con()
            .then(data => console.log(data))
            .catch(error => console.log(error.message));
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    );
  }
