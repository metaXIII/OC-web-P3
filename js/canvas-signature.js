/**
 * Class qui permet le dessin dans la page HTML
 */
class Canvas {
    /**
     *
     * @param {Object} canvas element
     * @param {Object} [options.xClick] tableau des coordonnées x de départ
     * @param {Object} [options.yClick] tableau des coordonnées y de départ
     * @param {Object} [options.clickDrag] tableau des coordonnées pendant le déplacement
     * @param {boolean} [options.draw] boolean pour savoir si on dessine ou non
     *
     */
    constructor(canvas, options = {}) {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
        this.context.strokeStyle = "blue"
        this.context.lineJoin = "round"
        this.context.lineWidth = 5
        this.options = Object.assign({}, {
            xClick: [],
            yClick: [],
            clickDrag: [],
            draw: false
        }, options)

        /**
         * Au click de la souris, on lance le dessin et on garde les coordonnées initiales des x et y
         */
        canvas.addEventListener("mousedown", (e) => {
            this.options.draw = true
            this.keep(e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top)
            this.draw()
        })


        /**
         * Au déplacement de la souris, on regarde si on doit dessiner (uniquement) pour sauvegarder le parcours
         */
        canvas.addEventListener("mousemove", (e) => {
            if (this.options.draw) {
                this.keep(e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top, 1)
                this.draw()
            }
        })

        /**
         * Au relachement du click, on arrête le dessin
         */
        canvas.addEventListener("mouseup", (e) => {
            this.options.draw = false
        })

        /**
         * Lorsque la souris sors de l'écran, on arrête le dessin
         */
        canvas.addEventListener("mouseleave", (e) => {
            this.options.draw = false
        })


        /**
         * Evenemement touchstart pour tactile
         */
        canvas.addEventListener("touchstart", e => {
            e.preventDefault()
            this.options.draw = true
            this.keep(e.touches[0].clientX - this.canvas.getBoundingClientRect().left, e.touches[0].clientY - this.canvas.getBoundingClientRect().top)
            this.draw()
        })

        /**
         * Doigt relevé
         */
        canvas.addEventListener("touchend", e => {
            e.preventDefault()
            this.options.draw = false
        })

        /**
         * Déplacement du doigt
         */
        canvas.addEventListener("touchmove", e => {
            e.preventDefault()
            if (this.options.draw) {
                this.keep(e.touches[0].clientX - this.canvas.getBoundingClientRect().left, e.touches[0].clientY - this.canvas.getBoundingClientRect().top, 1)
                this.draw()
            }
        })
    }

    /**
     * Vidage du canvas
     */
    clear() {
        document.getElementById("showCanvas").style.display = "none"
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height) // Clears the canvas
    }

    /**
     * @param x horizontal
     * @param y vertical
     * @param drag previous or not
     */
    keep(x, y, drag) {
        this.options.xClick.push(x)
        this.options.yClick.push(y)
        this.options.clickDrag.push(drag)
    }

    /**
     * dessin
     */
    draw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height) // Clears the canvas
        for (let i = 0; i < this.options.xClick.length; i++) {
            this.context.beginPath()
            if (this.options.clickDrag[i] && i) {
                this.context.moveTo(this.options.xClick[i - 1], this.options.yClick[i - 1])
            } else {
                this.context.moveTo(this.options.xClick[i] - 1, this.options.yClick[i])
            }
            this.context.lineTo(this.options.xClick[i], this.options.yClick[i])
            this.context.closePath()
            this.context.stroke()
        }
    }


}

