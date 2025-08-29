// quiz.js
window.onload = function() {
    // Draw the line y = 2x + 5 on the canvas (without showing the equation)
    const canvas = document.getElementById('lineGraph');
    const ctx = canvas.getContext('2d');

    // Draw only centered axes (no numbers, no bottom x-axis)
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // x-axis (centered)
    ctx.moveTo(40, 150); ctx.lineTo(360, 150);
    // y-axis (centered)
    ctx.moveTo(200, 40); ctx.lineTo(200, 260);
    ctx.stroke();

    // Draw small tick marks only (no numbers)
    for (let i = -10; i <= 10; i++) {
        // X axis ticks
        let [tx, ty] = toCanvasCoords(i, 0);
        ctx.beginPath();
        ctx.moveTo(tx, 146); ctx.lineTo(tx, 154);
        ctx.stroke();
        // Y axis ticks
        [tx, ty] = toCanvasCoords(0, i);
        ctx.beginPath();
        ctx.moveTo(196, ty); ctx.lineTo(204, ty);
        ctx.stroke();
    }
    // Label axes
    ctx.font = '14px Arial';
    ctx.fillStyle = '#444';
    ctx.fillText('x', 355, 140);
    ctx.fillText('y', 210, 50);
    
    // Center axes at (0,0) in the middle
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // x-axis
    ctx.moveTo(40, 150); ctx.lineTo(360, 150);
    // y-axis
    ctx.moveTo(200, 40); ctx.lineTo(200, 260);
    ctx.stroke();
    
    // Draw small tick marks only (no numbers)
    for (let i = -10; i <= 10; i++) {
        // X axis ticks
        let [tx, ty] = toCanvasCoords(i, 0);
        ctx.beginPath();
        ctx.moveTo(tx, 146); ctx.lineTo(tx, 154);
        ctx.stroke();
        // Y axis ticks
        [tx, ty] = toCanvasCoords(0, i);
        ctx.beginPath();
        ctx.moveTo(196, ty); ctx.lineTo(204, ty);
        ctx.stroke();
    }
    // Label axes
    ctx.font = '14px Arial';
    ctx.fillStyle = '#444';
    ctx.fillText('x', 355, 140);
    ctx.fillText('y', 210, 50);

    // Coordinate system: x from -10 to 10, y from -10 to 10
    // Canvas: x: 40 to 360 (width 320), y: 40 to 260 (height 220, inverted)
    function toCanvasCoords(x, y) {
        // x: -10 to 10 -> 40 to 360
        // y: -10 to 10 -> 260 to 40 (invert y)
        const cx = 40 + ((x + 10) / 20) * 320;
        const cy = 260 - ((y + 10) / 20) * 220;
        return [cx, cy];
    }

    // Find two points on y = 2x + 5 within x in [-10, 10]
    let x1 = -10, x2 = 10;
    let y1 = 2 * x1 + 5;
    let y2 = 2 * x2 + 5;
    // Clip y to [-10, 10] if needed
    if (y1 < -10) {
        y1 = -10;
        x1 = (y1 - 5) / 2;
    } else if (y1 > 10) {
        y1 = 10;
        x1 = (y1 - 5) / 2;
    }
    if (y2 < -10) {
        y2 = -10;
        x2 = (y2 - 5) / 2;
    } else if (y2 > 10) {
        y2 = 10;
        x2 = (y2 - 5) / 2;
    }
    const [cx1, cy1] = toCanvasCoords(x1, y1);
    const [cx2, cy2] = toCanvasCoords(x2, y2);


    // Draw the line
    ctx.strokeStyle = '#0074D9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx1, cy1);
    ctx.lineTo(cx2, cy2);
    ctx.stroke();

    // Draw arrows at both ends
    function drawArrow(ctx, fromX, fromY, toX, toY, size = 12) {
        const angle = Math.atan2(toY - fromY, toX - fromX);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - size * Math.cos(angle - Math.PI / 7), toY - size * Math.sin(angle - Math.PI / 7));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - size * Math.cos(angle + Math.PI / 7), toY - size * Math.sin(angle + Math.PI / 7));
        ctx.strokeStyle = '#0074D9';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
    drawArrow(ctx, cx2, cy2, cx1, cy1); // Arrow at (cx1, cy1)
    drawArrow(ctx, cx1, cy1, cx2, cy2); // Arrow at (cx2, cy2)

    // Quiz logic
    const form = document.getElementById('quizForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const solutionBox = document.getElementById('solutionBox');

    submitBtn.onclick = function() {
        const answer = form.q1.value;
        if (!answer) {
            resultBox.textContent = 'Please select an answer.';
            resultBox.classList.remove('hidden');
            solutionBox.classList.add('hidden');
            return;
        }
        if (answer === 'positive') {
            resultBox.textContent = 'Correct!';
            resultBox.style.color = 'green';
        } else {
            resultBox.textContent = 'Incorrect.';
            resultBox.style.color = 'red';
        }
        resultBox.classList.remove('hidden');
        solutionBox.classList.remove('hidden');
        submitBtn.disabled = true;
    };
};
