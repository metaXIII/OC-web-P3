class Canvas {
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

        canvas.addEventListener("mousedown", (e) => {
            this.options.draw = true
            this.keep(e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top)
            this.draw()
        })


        canvas.addEventListener("mousemove", (e) => {
            if (this.options.draw) {
                this.keep(e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top, 1)
                this.draw()
            }
        })

        canvas.addEventListener("mouseup", (e) => {
            this.options.draw = false
        })

        canvas.addEventListener("mouseleave", (e) => {
            this.options.draw = false
        })


        canvas.addEventListener("touchstart", e => {
            e.preventDefault()
            this.options.draw = true
            this.keep(e.touches[0].clientX - this.canvas.getBoundingClientRect().left, e.touches[0].clientY - this.canvas.getBoundingClientRect().top)
            this.draw()
        })

        canvas.addEventListener("touchend", e => {
            e.preventDefault()
            this.options.draw = false
        })

        canvas.addEventListener("touchmove", e => {
            e.preventDefault()
            if (this.options.draw) {
                this.keep(e.touches[0].clientX - this.canvas.getBoundingClientRect().left, e.touches[0].clientY - this.canvas.getBoundingClientRect().top, 1)
                this.draw()
            }
        })
    }

    clear() {
        document.getElementById("showCanvas").style.display = "none"
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height) // Clears the canvas
    }

    keep(x, y, drag) {
        this.options.xClick.push(x)
        this.options.yClick.push(y)
        this.options.clickDrag.push(drag)
    }

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

