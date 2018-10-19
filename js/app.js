let booking = {
    name: '',
    lastname: '',
    email: '',
    signature: '',
    stationName: '',
    adress: '',
}

let deroule = document.getElementById("deroule")
let menuDeroule = document.getElementById("menu-deroule")
//A l'envoi du formulaire
document.getElementById("reservation").addEventListener("submit", e => {
    e.preventDefault()
    let nom = document.getElementById("nom").value
    let prenom = document.getElementById("prenom").value
    let email = document.getElementById("email").value
    let nameStation = document.getElementById("nameStation").value
    let adress = document.getElementById("address").value
    let status = document.getElementById("status").value
    let signature = document.getElementById("canvas")
    let imgSignature = signature.toDataURL("img/png")

    console.log(nameStation)
    let nameLI = document.createElement("li")
    let prenomLI = document.createElement("li")
    let emailLI = document.createElement("li")
    let nameStationLI = document.createElement("li")
    let adressLI = document.createElement("li")
    let signatureLI = document.createElement("li")
    let imgSignatureIMG = document.createElement("img")

    nameLI.innerText = "nom : " + nom
    prenomLI.innerText = "prénom" + prenom
    emailLI.innerText = "votre mail" + email
    nameStationLI.innerText = "Votre station réservée : " + nameStation
    adressLI.innerText = "l'adresse de la station : " + adress
    imgSignatureIMG.setAttribute("src", imgSignature)

    //Add some css rules
    nameLI.classList.add("list-group-item")
    prenomLI.classList.add("list-group-item")
    emailLI.classList.add("list-group-item")
    nameStationLI.classList.add("list-group-item")
    adressLI.classList.add("list-group-item")
    signatureLI.classList.add("list-group-item")
    while (menuDeroule.firstChild) {
        menuDeroule.removeChild(menuDeroule.firstChild)
    }
    menuDeroule.classList.add("list-group")
    menuDeroule.appendChild(nameLI)
    menuDeroule.appendChild(prenomLI)
    menuDeroule.appendChild(emailLI)
    menuDeroule.appendChild(nameStationLI)
    menuDeroule.appendChild(adressLI)
    signatureLI.appendChild(imgSignatureIMG)
    menuDeroule.appendChild(signatureLI)
    deroule.innerText = "Vous avez une réservation en cours"
})


deroule.addEventListener("mousemove", () => {
    menuDeroule.style.display = "initial"
})
deroule.addEventListener("mouseout", () => {
    menuDeroule.style.display = "none"
})

//
// <li>Nom : LEHCHIBI</li>
// <li>Prénom : GAEL</li>
// <li>Nom de la station : GAMBETTA / GARIBALDI (FAR)</li>
// <li>Cours Gambette - Prolongement rue Rachais</li>
// <li>Signature :
// <img src="" alt="" id="output">
//     </li>


//Récupération des données du formulaire
