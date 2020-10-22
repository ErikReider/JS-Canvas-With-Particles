class Particles {

    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {Number} numberOfParticles 
     * @param {Number} particleRadius 
     * @param {String} particleColor 
     */
    constructor(canvas, numberOfParticles, particleRadius, particleColor, particleSpeedY, particleSpeedX) {
        let radius = particleRadius;
        let color = particleColor;

        window.addEventListener("resize", () => {
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
        });

        let raf = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;

        let context = canvas.getContext("2d");
        let particleList = [];

        for (let index = 0; index < numberOfParticles; index++) {
            particleList.push(new Particle(radius, color, context, canvas, particleSpeedY, particleSpeedX));
        }

        let fps = 60;
        let then = performance.now();
        let interval = 1000 / fps;
        let delta;

        let refresh = () => {
            raf(refresh);
            let now = performance.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);

                context.clearRect(0, 0, canvas.width, canvas.height);
                particleList.forEach(element => {
                    element.update();
                });
            }
        };
        raf(refresh);

    }

}

class Particle {
    /**
     * @param {Number} radius 
     * @param {*} color 
     * @param {CanvasRenderingContext2D} context 
     * @param {HTMLCanvasElement} canvas
     * @param {Number} speedY
     * @param {Number} speedX
     */
    constructor(radius, color, context, canvas, speedY, speedX) {
        let randomDouble = (getRandomInt(6, 10) / 10);
        this.radius = radius * randomDouble;
        this.color = color;
        this.context = context;
        this.canvas = canvas;
        this.speedY = speedY / randomDouble;
        this.speedX = speedX * randomDouble * (Math.random() * 2 | 0 || -1) / 2;
        this.y = Math.random() * canvas.height;
        this.x = Math.random() * canvas.width;

        this.update = () => {
            context.fillStyle = color;
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
            this.y = this.y + this.speedY;
            this.x = this.x + this.speedX;
            if (this.y + this.radius <= 0) {
                this.y = canvas.height + this.radius;
                this.x = Math.random() * canvas.width;
            }
        };
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}