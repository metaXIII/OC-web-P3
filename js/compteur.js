class Compteur {
    /**
     *
     * @param options empty by default
     */
    constructor(options = {}) {
        this.options = Object.assign({}, {
            min: 20,
            sec: 0
        }, options)
        this.count = null
    }

    /**
     * reset timer
     */
    reset() {
        this.options.min = 20
        this.options.sec = 0
        clearInterval(this.count)
        let bookingSuccess = document.getElementById("bookingSuccess")
        bookingSuccess.classList.add("d-none")
    }

    /**
     * DOM element
     */
    timer() {
        if (this.options.sec === 0 && this.options.min === 0) {
            this.reset()
            document.getElementById("reservationContainer").style.display = "none"
            return
        }
        else if (this.options.sec === 0) {
            this.options.sec = 59
            this.options.min--
        }
        else
            this.options.sec--
        document.getElementById("reservationContainer").style.display = "block"
        document.getElementById("timeLeft").innerText = "Temps restant : " + this.options.min + " min " + this.options.sec + "s"
        let time = [this.options.min, this.options.sec]
        sessionStorage.removeItem("timer")
        sessionStorage.setItem("timer", JSON.stringify(time))
    }


    /**
     * lancement du timer
     */
    start() {
        this.count = setInterval(() => {
            this.timer()
        }, 1000)
    }
}
