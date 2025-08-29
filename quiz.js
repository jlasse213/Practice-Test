// quiz.js
window.onload = function() {
    // --- Question 3: Line segment (2,6) to (3,9) ---
    const segmentCanvas = document.getElementById('segmentGraph');
    if (segmentCanvas) {
        const segCtx = segmentCanvas.getContext('2d');
        drawAxesAndTicks(segCtx, toCanvasCoords);
        // Draw the segment
        const [sx1, sy1] = toCanvasCoords(2, 6);
        const [sx2, sy2] = toCanvasCoords(3, 9);
        segCtx.strokeStyle = '#2ECC40';
        segCtx.lineWidth = 3;
        segCtx.beginPath();
        segCtx.moveTo(sx1, sy1);
        segCtx.lineTo(sx2, sy2);
        segCtx.stroke();
        // Draw points
        segCtx.fillStyle = '#FF4136';
        segCtx.beginPath();
        segCtx.arc(sx1, sy1, 6, 0, 2 * Math.PI);
        segCtx.fill();
        segCtx.beginPath();
        segCtx.arc(sx2, sy2, 6, 0, 2 * Math.PI);
        segCtx.fill();
    }
    // Draw axes and ticks for a given context and coordinate function
    function drawAxesAndTicks(ctx, toCanvasCoords) {
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // x-axis (centered)
        ctx.moveTo(40, 150); ctx.lineTo(360, 150);
        // y-axis (centered)
        ctx.moveTo(200, 40); ctx.lineTo(200, 260);
        ctx.stroke();
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
        ctx.font = '14px Arial';
        ctx.fillStyle = '#444';
        ctx.fillText('x', 355, 140);
        ctx.fillText('y', 210, 50);
    }
    // --- Question 2: Draggable dot setup ---
    const dotCanvas = document.getElementById('dotGraph');
    let dot = { x: 0, y: 0 };
    let dragging = false;
    if (dotCanvas) {
        const dotCtx = dotCanvas.getContext('2d');
        drawAxesAndTicks(dotCtx, toCanvasCoords);
        function drawDot() {
            dotCtx.clearRect(0, 0, dotCanvas.width, dotCanvas.height);
            drawAxesAndTicks(dotCtx, toCanvasCoords);
            const [cx, cy] = toCanvasCoords(dot.x, dot.y);
            dotCtx.beginPath();
            dotCtx.arc(cx, cy, 9, 0, 2 * Math.PI);
            dotCtx.fillStyle = '#FF851B';
            dotCtx.fill();
            dotCtx.strokeStyle = '#333';
            dotCtx.lineWidth = 2;
            dotCtx.stroke();
        }
        drawDot();
        function getMousePos(evt) {
            const rect = dotCanvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        function getTouchPos(evt) {
            const rect = dotCanvas.getBoundingClientRect();
            const touch = evt.touches[0];
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        }
        function canvasToGraphCoords(cx, cy) {
            const x = ((cx - 40) / 320) * 20 - 10;
            const y = -((cy - 150) / 110) * 10;
            return { x, y };
        }
        function isOnDot(mx, my) {
            const [cx, cy] = toCanvasCoords(dot.x, dot.y);
            return Math.hypot(mx - cx, my - cy) < 15;
        }
        dotCanvas.addEventListener('mousedown', function(e) {
            const pos = getMousePos(e);
            if (isOnDot(pos.x, pos.y)) dragging = true;
        });
        dotCanvas.addEventListener('mousemove', function(e) {
            if (dragging) {
                const pos = getMousePos(e);
                const g = canvasToGraphCoords(pos.x, pos.y);
                dot.x = Math.max(-10, Math.min(10, g.x));
                dot.y = Math.max(-10, Math.min(10, g.y));
                drawDot();
            }
        });
        dotCanvas.addEventListener('mouseup', function() { dragging = false; });
        dotCanvas.addEventListener('mouseleave', function() { dragging = false; });
        // Touch events for mobile
        dotCanvas.addEventListener('touchstart', function(e) {
            const pos = getTouchPos(e);
            if (isOnDot(pos.x, pos.y)) dragging = true;
        });
        dotCanvas.addEventListener('touchmove', function(e) {
            if (dragging) {
                const pos = getTouchPos(e);
                const g = canvasToGraphCoords(pos.x, pos.y);
                dot.x = Math.max(-10, Math.min(10, g.x));
                dot.y = Math.max(-10, Math.min(10, g.y));
                drawDot();
            }
            e.preventDefault();
        }, { passive: false });
        dotCanvas.addEventListener('touchend', function() { dragging = false; });
        // Expose dot for grading
        window.getDotPosition = function() { return { x: dot.x, y: dot.y }; };
    }

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

    // Quiz logic (multi-question)
    const submitBtn = document.getElementById('submitBtn');
    const gradeBox = document.getElementById('gradeBox');
    submitBtn.onclick = function() {
        let total = 3;
        let correct = 0;
        // Question 1
        const answer1 = document.querySelector('input[name="q1"]:checked');
        const resultBox1 = document.getElementById('resultBox1');
        const solutionBox1 = document.getElementById('solutionBox1');
        if (answer1 && answer1.value === 'positive') {
            correct++;
            resultBox1.textContent = 'Correct!';
            resultBox1.style.color = 'green';
        } else {
            resultBox1.textContent = 'Incorrect.';
            resultBox1.style.color = 'red';
        }
        resultBox1.classList.remove('hidden');
        solutionBox1.classList.remove('hidden');
        // Question 2: check dot position
        const resultBox2 = document.getElementById('resultBox2');
        const solutionBox2 = document.getElementById('solutionBox2');
        let dotPos = window.getDotPosition ? window.getDotPosition() : {x: null, y: null};
        if (dotPos && Math.abs(dotPos.x - 2) < 0.5 && Math.abs(dotPos.y + 7) < 0.5) {
            correct++;
            resultBox2.textContent = 'Correct!';
            resultBox2.style.color = 'green';
        } else {
            resultBox2.textContent = 'Incorrect.';
            resultBox2.style.color = 'red';
        }
        resultBox2.classList.remove('hidden');
        solutionBox2.classList.remove('hidden');
        // Question 3: slope multiple choice
        const answer3 = document.querySelector('input[name="q3"]:checked');
        const resultBox3 = document.getElementById('resultBox3');
        const solutionBox3 = document.getElementById('solutionBox3');
        if (answer3 && answer3.value === '3/1') {
            correct++;
            resultBox3.textContent = 'Correct!';
            resultBox3.style.color = 'green';
        } else {
            resultBox3.textContent = 'Incorrect.';
            resultBox3.style.color = 'red';
        }
        resultBox3.classList.remove('hidden');
        solutionBox3.classList.remove('hidden');
        submitBtn.disabled = true;
        // Show overall grade
        gradeBox.textContent = `Score: ${correct} / ${total}`;
        gradeBox.classList.remove('hidden');
    };
};
