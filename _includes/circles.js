<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Circle Animation</title>
<style>
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        background-color: #fff;
    }
    canvas {
        border: 5px solid #000;
    }
</style>
</head>
<body>
<canvas id="canvas" width="480" height="480"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Circle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';  // half-transparent black
        ctx.fill();
        ctx.lineWidth = 3;  // thick border
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
        }
    }
}

const circles = [];

for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 40 + 10;  // bigger circles
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    circles.push(new Circle(x, y, radius, dx, dy));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].move();
        circles[i].draw();
    }
    requestAnimationFrame(animate);
}

animate();
</script>
</body>
</html>
