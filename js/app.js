let map = L.map('map').setView([45.75, 4.85], 16)

L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(map)

//Récupération de la liste des résultats
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=353be56585eb3eb2d6d5e7352c4bafd5449f2e0c", (results) => {
    results = JSON.parse(results)
    // console.log(results)
    results.forEach((result) => {
        let marker = L.marker([result.position.lat, result.position.lng]).addTo(map)

        //Evènements sur les markers
        marker.addEventListener("click", (e) => {
            console.log(result)
            //état de la station
            console.log("État de la station: " + result.status)

            //Nombre de vélos
            console.log("Capacité totale de vélos: " + result.available_bike_stands)

            //Nombre de vélos disponible
            console.log("Nombre de vélos disponible: " + result.available_bikes)
        })


    })
})
