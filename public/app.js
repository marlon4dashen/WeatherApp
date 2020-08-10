
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description');
    let temperatureDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            key = '90e6e4bf7bdbd2502d7a5a77d79424a4';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(api)
            .then(response => {

                return response.json();

            })
            .then(data => {
                const {temp} = data.main;
                const summary = data.weather[0].description;
                const location = data.name;
                icon = data.weather[0].icon;

                let celsius = Math.round((temp - 273.15) * 100) / 100;
                let farenheit = Math.round((celsius * (9 / 5) + 32) * 100) / 100 ;

                temperatureDegree.textContent = celsius;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = location;
                

                var str_icon = `./src/${icon}.png`;
                document.getElementById("img").src = str_icon;
                
                degreeSection.addEventListener('click', () => {

                    if(temperatureSpan.textContent === "C"){
                        temperatureDegree.textContent = farenheit;
                        temperatureSpan.textContent = "F";
                    }else{
                        temperatureDegree.textContent = celsius;
                        temperatureSpan.textContent = "C";
                    }
                })
            });
        });


    }

});



