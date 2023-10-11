const landscapecanvas = document.getElementById('landscapecanvas');
const landscapectx = landscapecanvas.getContext('2d');
landscapecanvas.width = window.innerWidth;
landscapecanvas.height = window.innerHeight;

const blockSize = 40;

let time = 0;

function createDiamondClipAndBorder() {
    landscapectx.save();  // Save the current context state

    const centerX = landscapecanvas.width / 2;
    const centerY = landscapecanvas.height / 2;
    const halfWidth = Math.min(centerX, centerY);  // Size of the diamond

    // Transformations for tilting and rotating the diamond
    landscapectx.translate(centerX, centerY);
    landscapectx.rotate(-Math.PI / 6);  // Rotate 30 degrees to the left
    landscapectx.scale(1, 0.866);  // Tilt 30 degrees away
    landscapectx.translate(-centerX, -centerY);

    landscapectx.beginPath();
    landscapectx.moveTo(centerX, centerY - halfWidth);  // Top point
    landscapectx.lineTo(centerX + halfWidth, centerY);  // Right point
    landscapectx.lineTo(centerX, centerY + halfWidth);  // Bottom point
    landscapectx.lineTo(centerX - halfWidth, centerY);  // Left point
    landscapectx.closePath();
    
    landscapectx.lineWidth = 5;  // Border width
    landscapectx.strokeStyle = 'black';
    landscapectx.stroke();

    landscapectx.clip();  // Use this shape as a clipping region
}

function draw() {
    landscapectx.fillStyle = 'white';
    landscapectx.fillRect(0, 0, landscapecanvas.width, landscapecanvas.height);
    
    createDiamondClipAndBorder();
    
    landscapectx.strokeStyle = 'black';
    landscapectx.lineWidth = 2;

    // Draw horizontal wavy lines
    for (let y = 0; y < landscapecanvas.height; y += blockSize) {
        landscapectx.beginPath();
        for (let x = 0; x < landscapecanvas.width; x++) {
            const wave = Math.sin((x + time) * 0.05) * 10;
            landscapectx.lineTo(x, y + wave);
        }
        landscapectx.stroke();
    }

    // Draw vertical wavy lines
    for (let x = 0; x < landscapecanvas.width; x += blockSize) {
        landscapectx.beginPath();
        for (let y = 0; y < landscapecanvas.height; y++) {
            const wave = Math.sin((y + time) * 0.05) * 10;
            landscapectx.lineTo(x + wave, y);
        }
        landscapectx.stroke();
    }

    draw3DArrows();

    landscapectx.restore();  // Restore the context to its state before clipping and transformations
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
    landscapectx.beginPath();
    landscapectx.moveTo(endX, endY);
    landscapectx.lineTo(endX - arrowLength * Math.cos(angle + narrowerAngle), 
               endY - arrowLength * Math.sin(angle + narrowerAngle));
    landscapectx.lineTo(endX - arrowLength * Math.cos(angle - narrowerAngle), 
               endY - arrowLength * Math.sin(angle - narrowerAngle));
    landscapectx.closePath();
    
    landscapectx.fillStyle = 'black';
    landscapectx.fill();

    // Shaft
    landscapectx.beginPath();
    landscapectx.moveTo(startX, startY);
    landscapectx.lineTo(newEndX, newEndY);
    landscapectx.lineWidth = 5;
    landscapectx.strokeStyle = 'black';
    landscapectx.stroke();
}

function draw3DArrows() {
    const centerX = landscapecanvas.width / 2;
    const centerY = landscapecanvas.height / 2;
    const length = 180;  // Arrow length

    // Y-axis arrow: Adjusted based on your code
    drawArrow(centerX, centerY, centerX + length * Math.cos(Math.PI/6 + Math.PI/5), centerY - length * Math.sin(Math.PI/6 + Math.PI/12) * 1.155); 

    // X-axis arrow: Made to appear horizontal
    drawArrow(centerX, centerY, centerX + length * Math.cos(Math.PI / 6), centerY - length * Math.sin(-Math.PI / 6) * 1.155);

    // Z-axis arrow: Adjusted based on your code
    drawArrow(centerX, centerY, centerX + length * Math.cos(5*Math.PI/6 + Math.PI/12), centerY - length * Math.sin(5*Math.PI/6 + Math.PI/6) * 1.155);
}



draw();
