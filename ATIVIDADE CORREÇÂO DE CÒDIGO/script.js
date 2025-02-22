const weatherApiKey = "a7c7aba5e1729ce19517f575740b62c4"; 
const geoApiKey = "26e5e3431b8142eaa746e19ceb16d8a7"; 

function getWeatherByCity() {
    const city = document.getElementById("cityname").value.trim();

    if (city === "") {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }
    const urlClima = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${weatherApiKey}`

    // Chamada para OpenWeatherMap (obter latitude e longitude)
    fetch(urlClima)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cidade não encontrada.");
            }
            return response.json();
        })
        .then(data => {
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Exibe informações sobre o clima
            document.getElementById("nomecidade").innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = data.main.temp;
            document.getElementById("weather").innerText = data.weather[0].description;
            document.getElementById("humidity").innerText = data.main.humidity;
            document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(2);
            document.getElementById("lat").innerText = lat;
            document.getElementById("lon").innerText = lon;
            return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}&language=pt`);
        })
        .then(response => response.json()) // Converte para JSON
        .then(geoData => {
            if (geoData.results && geoData.results.length > 0) { 
                const details = geoData.results[0].components;
                document.getElementById("state").textContent = details.state || "Não disponível";
                document.getElementById("postal-code").textContent = details.postcode || "Não disponível";
                document.getElementById("info-clima").classList.remove("d-none");
            }
            
        })
        .catch(error => {
            alert(error.message);
        });
}