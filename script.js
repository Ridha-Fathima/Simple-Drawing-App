const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let startX, startY;
let isDrawing = false;
let shape = 'line';


const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
const offscreenCtx = offscreenCanvas.getContext('2d');


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function setShape(selectedShape) {
    shape = selectedShape;
}

function startDrawing(e) {
    isDrawing = true;
    [startX, startY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    const [endX, endY] = [e.offsetX, e.offsetY];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);
    ctx.beginPath();
    if (shape === 'line') {
        drawLine(startX, startY, endX, endY);
    } else if (shape === 'rectangle') {
        drawRectangle(startX, startY, endX - startX, endY - startY);
    } else if (shape === 'circle') {
        drawCircle(startX, startY, Math.hypot(endX - startX, endY - startY));
    }
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    offscreenCtx.drawImage(canvas, 0, 0);
    ctx.beginPath();
}

function drawLine(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRectangle(x, y, width, height) {
    ctx.rect(x, y, width, height);
    ctx.stroke();
}

function drawCircle(x, y, radius) {
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
}
