const apiKey = "a0b0212973a34604a4f165031252303";

    function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      const result = document.getElementById("weatherResult");
      result.innerHTML = ""; // clear previous result

      if (!city) {
        alert("Please enter a city name.");
        return;
      }

      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            result.innerHTML = `<p style="color:red;">${data.error.message}</p>`;
          } else {
            const weather = data.current;
            const location = data.location;
            const aqi = weather.air_quality;

            result.innerHTML = `
              <div style="animation: fadeIn 1s ease-in-out;">
                <h3>${location.name}, ${location.country}</h3>
                <p><strong>Temperature:</strong> ${weather.temp_c} °C</p>
                <p><strong>Condition:</strong> ${weather.condition.text}</p>
                <p><strong>Humidity:</strong> ${weather.humidity}%</p>
                <p><strong>Wind:</strong> ${weather.wind_kph} km/h</p>
                <p><strong>Air Quality Index (PM2.5):</strong> ${aqi.pm2_5.toFixed(2)}</p>
              </div>
            `;
          }
        })
        .catch(error => {
          result.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
    }