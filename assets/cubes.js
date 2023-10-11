const canvas = document.getElementById('cubecanvas');
const ctx = canvas.getContext('2d');
let size = 1;
let angle = 0;
const growthRate = 1.01; // tweaked for longer zoom duration

ctx.lineWidth = 2;

function drawCube(x, y, size, angle) {
    // let opacity = size / 20 ; // make dots emerge smoothly
    // ctx.globalAlpha = opacity > 1 ? 1 : opacity;

    if (size <= 1) {
        ctx.fillRect(x, y, 1, 1);
        return;
    }

    let offset = 0;
    if (size > 15) {
        offset = (size - 15) / 3;
    }

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const points = [
        { x: x, y: y },
        { x: x + size, y: y },
        { x: x + size, y: y + size },
        { x: x, y: y + size },
        { x: x + offset, y: y + offset },
        { x: x + size + offset, y: y + offset },
        { x: x + size + offset, y: y + size + offset },
        { x: x + offset, y: y + size + offset }
    ];

    for (let p of points) {
        let tempX = p.x - x;
        let tempY = p.y - y;
        p.x = x + tempX * cosA - tempY * sinA;
        p.y = y + tempX * sinA + tempY * cosA;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.closePath();
    ctx.stroke();

    if (size > 15) {
        ctx.beginPath();
        ctx.moveTo(points[4].x, points[4].y);
        ctx.lineTo(points[5].x, points[5].y);
        ctx.lineTo(points[6].x, points[6].y);
        ctx.lineTo(points[7].x, points[7].y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 4].x, points[i + 4].y);
        }
        ctx.stroke();
    }
    ctx.globalAlpha = 1; // reset opacity after drawing
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    size *= growthRate;
    angle += 0.005;

    if (size > canvas.width * 8) { // adjust for proper cube entry
        size = 1;
    }

    for (let x = 0; x < canvas.width + size; x += (size + 2) * 2) {
        for (let y = 0; y < canvas.height + size; y += (size + 2) * 2) {
            drawCube(x, y, size, angle);
        }
    }

    requestAnimationFrame(draw);
}

draw();
