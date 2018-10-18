let map = L.map('map').setView([45.75, 4.85], 16)

L.tileLayer('//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
}).addTo(map)

//Récupération de la liste des résultats
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=353be56585eb3eb2d6d5e7352c4bafd5449f2e0c", (results) => {
    results = JSON.parse(results)
    results.forEach((result) => {
        let latlng = [result.position.lat, result.position.lng]
        let marker = null
        if (result.available_bikes && result.status === "OPEN")
            marker = L.marker(latlng).addTo(map)
        else if (!result.available_bikes && result.status === "OPEN")
            marker = L.marker(latlng, {icon: redIcon}).addTo(map)
        else
            marker = L.marker(latlng, {icon: blackIcon}).addTo(map)

        //Evènements sur les markers
        marker.addEventListener("click", (e) => {
            let nameStation = result.name
            nameStation = nameStation.replace(/[#0-9\s\-]+/, '')
            let address = result.address
            let status = result.status
            let total = result.available_bike_stands
            let place = result.available_bikes

            //traitement avant de les ajouter au DOM
            if (status === "OPEN")
                status = "Ouvert"
            else
                status = "Fermé"
            document.getElementById("nameStation").value = nameStation
            document.getElementById("address").value = address
            document.getElementById("status").value = status
            document.getElementById("place").innerHTML = place + "/" + total + "<span class='bold'>&nbsp;vélos disponibles</span>"

        })

    })
})
