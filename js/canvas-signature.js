class Canvas {
    constructor(canvas, options = {}) {
        this.canvas = canvas
        // this.toResize = true
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
        // this.widthListener()

        canvas.addEventListener("mousedown", (e) => {
            this.options.draw = true
            this.keep(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop)
            this.draw()
        })


        canvas.addEventListener("mousemove", (e) => {
            if (this.options.draw) {
                this.keep(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, 1)
                this.draw()
            }
        })

        canvas.addEventListener("mouseup", (e) => {
            this.options.draw = false
        })

        canvas.addEventListener("mouseleave", (e) => {
            this.options.draw = false
        })
    }

    keep(x, y, drag) {
        this.options.xClick.push(x)
        this.options.yClick.push(y)
        this.options.clickDrag.push(drag)
    }

    draw() {
        this.context.clearRect(0, 0, this.context.canvas.offsetWidth, this.context.canvas.offsetHeight) // Clears the canvas
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

    // widthListener() {
    //     window.addEventListener("resize", (e) => {
    //         let width = e.target.innerWidth
    //         let resize = this.toResize
    //         if (width >= 998 && resize) {
    //             this.canvas.setAttribute("width", "1200")
    //         } else if ((width <= 998 && 768) && resize) {
    //             this.canvas.setAttribute("width", "600")
    //         }
    //     })
    // }
}

window.addEventListener('load', () => {
    new Canvas(document.querySelector("#canvas"), {})

    document.getElementById("reservation").addEventListener("submit", e => {
        let signature = document.getElementById("canvas")
        let imgSignature = signature.toDataURL("img/png")
        document.getElementById("output").setAttribute("src", imgSignature)
        e.preventDefault()
    })
})
