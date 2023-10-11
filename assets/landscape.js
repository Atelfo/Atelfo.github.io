const canvas = document.getElementById('landscape');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blockSize = 40;

let time = 0;

function createDiamondClipAndBorder() {
    ctx.save();  // Save the current context state

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const halfWidth = Math.min(centerX, centerY);  // Size of the diamond

    // Transformations for tilting and rotating the diamond
    ctx.translate(centerX, centerY);
    ctx.rotate(-Math.PI / 6);  // Rotate 30 degrees to the left
    ctx.scale(1, 0.866);  // Tilt 30 degrees away
    ctx.translate(-centerX, -centerY);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - halfWidth);  // Top point
    ctx.lineTo(centerX + halfWidth, centerY);  // Right point
    ctx.lineTo(centerX, centerY + halfWidth);  // Bottom point
    ctx.lineTo(centerX - halfWidth, centerY);  // Left point
    ctx.closePath();
    
    ctx.lineWidth = 5;  // Border width
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.clip();  // Use this shape as a clipping region
}

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    createDiamondClipAndBorder();
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    // Draw horizontal wavy lines
    for (let y = 0; y < canvas.height; y += blockSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
            const wave = Math.sin((x + time) * 0.05) * 10;
            ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
    }

    // Draw vertical wavy lines
    for (let x = 0; x < canvas.width; x += blockSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y++) {
            const wave = Math.sin((y + time) * 0.05) * 10;
            ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
    }

    draw3DArrows();

    ctx.restore();  // Restore the context to its state before clipping and transformations
    time += 2;
    requestAnimationFrame(draw);
}

function drawArrow(startX, startY, endX, endY) {
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowLength = 30;

    const narrowerAngle = Math.PI / 8;  
    const newEndX = endX - arrowLength * 0.5 * Math.cos(angle);
    const newEndY = endY - arrowLength * 0.5 * Math.sin(angle);
    
    // Arrowhead
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - arrowLength * Math.cos(angle + narrowerAngle), 
               endY - arrowLength * Math.sin(angle + narrowerAngle));
    ctx.lineTo(endX - arrowLength * Math.cos(angle - narrowerAngle), 
               endY - arrowLength * Math.sin(angle - narrowerAngle));
    ctx.closePath();
    
    ctx.fillStyle = 'black';
    ctx.fill();

    // Shaft
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(newEndX, newEndY);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function draw3DArrows() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const length = 180;  // Arrow length

    // Y-axis arrow: Adjusted based on your code
    drawArrow(centerX, centerY, centerX + length * Math.cos(Math.PI/6 + Math.PI/5), centerY - length * Math.sin(Math.PI/6 + Math.PI/12) * 1.155); 

    // X-axis arrow: Made to appear horizontal
    drawArrow(centerX, centerY, centerX + length * Math.cos(Math.PI / 6), centerY - length * Math.sin(-Math.PI / 6) * 1.155);

    // Z-axis arrow: Adjusted based on your code
    drawArrow(centerX, centerY, centerX + length * Math.cos(5*Math.PI/6 + Math.PI/12), centerY - length * Math.sin(5*Math.PI/6 + Math.PI/6) * 1.155);
}



draw();