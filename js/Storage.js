if (localStorage) {
    document.getElementById("nom").value = localStorage.getItem("nom")
    document.getElementById("prenom").value = localStorage.getItem("prenom")
    if (sessionStorage && sessionStorage.reservation !== undefined) {
        document.getElementById("reservationList").innerText = "Vélo réservé à la station " + sessionStorage.reservation + " par " +
            localStorage.getItem("prenom") + " " + localStorage.getItem("nom")
        let timer = JSON.parse(sessionStorage.getItem("timer"))
        document.getElementById("timeLeft").innerText = "Temps restant : " + timer[0] + " min " + timer[1] + "s"
        let compteur = new Compteur({
            min: timer[0],
            sec: timer[1]
        })
        compteur.start()

        document.querySelector(".btn-primary").addEventListener("click", (e) => {
            compteur.reset()
        })
    }
}

