/**@type {HTMLCanvasElement} */
let canvas;
/**@type {CanvasRenderingContext2D} */
let context;

onload = function () {
    canvas = this.document.getElementById("canvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    new Particles(canvas, 15, 80, "rgba(255, 255, 255, 0.5)", -1, 1);
};