/**
 * Déclaration de l'object type booking
 * @type {{name: string, lastname: string, stationName: string}}
 */
let booking = {
    name: '',
    lastname: '',
    stationName: ''
}


let compteur = new Compteur
//A l'envoi du formulaire
document.getElementById("reservation").addEventListener("submit", e => {
    let nameStation = document.getElementById("nameStation")
    e.preventDefault()
    //cas d'exception pour gérer les stations ouvertes, fermées, sans vélos.
    if (!nameStation.value) {
        alert("Une station doit être sélectionnée")
    } else if (document.getElementById("status").value === "Fermé")
        alert("La station n'est pas ouverte")
    else if (/[0]\//.test(document.getElementById("place").innerText))
        alert("Il n'y a plus de vélos disponibles dans cette station")
    else {
        //Affichage du canvas
        let canvas = new Canvas(document.querySelector("#canvas"), {})
        document.getElementById("showCanvas").style.display = "block"
        //On vide le canvas dans tous les cas pour prévenir de données persistantes.
        document.querySelector(".btn-danger").addEventListener("click", () => {
            canvas.clear()
        })
        document.querySelector(".close").addEventListener("click", () => {
            canvas.clear()
        })
        document.getElementById("showCanvas").addEventListener("click", (e) => {
            if (e.target.classList.contains("modal")) {
                canvas.clear()
            }
        })
    }

    /**
     * Après validation du canvas et du form
     */
    document.querySelector(".btn-primary").addEventListener("click", (e) => {
        sessionStorage.clear()
        localStorage.clear()
        compteur.reset()
        booking.lastname = document.getElementById("nom").value
        booking.name = document.getElementById("prenom").value
        booking.stationName = document.getElementById("nameStation").value
        sessionStorage.setItem("reservation", booking.stationName)
        localStorage.setItem("nom", booking.name)
        localStorage.setItem("prenom", booking.lastname)
        let reservationList = document.getElementById("reservationList")
        let bookingSuccess = document.getElementById("bookingSuccess")

        compteur.start()
        reservationList.innerText = "Vélo réservé à la station " + booking.stationName + " par " +
            booking.name + " " + booking.lastname
        bookingSuccess.classList.remove("d-none")
        document.getElementById("showCanvas").style.display = "none"
        window.scrollTo(0,document.body.scrollHeight);
    })

})
