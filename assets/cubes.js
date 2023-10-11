const cubecanvas = document.getElementById('cubecanvas');
const cubectx = cubecanvas.getContext('2d');
let size = 1;
let angle = 0;
const growthRate = 1.01; // tweaked for longer zoom duration

cubectx.lineWidth = 2;

function drawCube(x, y, size, angle) {
    // let opacity = size / 20 ; // make dots emerge smoothly
    // cubectx.globalAlpha = opacity > 1 ? 1 : opacity;

    if (size <= 1) {
        cubectx.fillRect(x, y, 1, 1);
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

    cubectx.beginPath();
    cubectx.moveTo(points[0].x, points[0].y);
    cubectx.lineTo(points[1].x, points[1].y);
    cubectx.lineTo(points[2].x, points[2].y);
    cubectx.lineTo(points[3].x, points[3].y);
    cubectx.closePath();
    cubectx.stroke();

    if (size > 15) {
        cubectx.beginPath();
        cubectx.moveTo(points[4].x, points[4].y);
        cubectx.lineTo(points[5].x, points[5].y);
        cubectx.lineTo(points[6].x, points[6].y);
        cubectx.lineTo(points[7].x, points[7].y);
        cubectx.closePath();
        cubectx.stroke();

        cubectx.beginPath();
        for (let i = 0; i < 4; i++) {
            cubectx.moveTo(points[i].x, points[i].y);
            cubectx.lineTo(points[i + 4].x, points[i + 4].y);
        }
        cubectx.stroke();
    }
    cubectx.globalAlpha = 1; // reset opacity after drawing
}

function draw() {
    cubectx.clearRect(0, 0, cubecanvas.width, cubecanvas.height);

    size *= growthRate;
    angle += 0.005;

    if (size > cubecanvas.width * 8) { // adjust for proper cube entry
        size = 1;
    }

    for (let x = 0; x < cubecanvas.width + size; x += (size + 2) * 2) {
        for (let y = 0; y < cubecanvas.height + size; y += (size + 2) * 2) {
            drawCube(x, y, size, angle);
        }
    }

    requestAnimationFrame(draw);
}

draw();
