// quiz.js
window.onload = function() {
    // --- Question 1: Line segment (2,6) to (3,9) ---
    (function() {
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
    })();

    // --- Question 2: y = 5x - 7 ---
    (function() {
        const lineCanvas = document.getElementById('lineGraph');
        if (lineCanvas) {
            const ctx = lineCanvas.getContext('2d');
            drawAxesAndTicks(ctx, toCanvasCoords);
            // Find two points on y = 5x - 7 within x in [-10, 10]
            let x1 = -10, x2 = 10;
            let y1 = 5 * x1 - 7;
            let y2 = 5 * x2 - 7;
            // Clip y to [-10, 10] if needed
            if (y1 < -10) { y1 = -10; x1 = (y1 + 7) / 5; }
            else if (y1 > 10) { y1 = 10; x1 = (y1 + 7) / 5; }
            if (y2 < -10) { y2 = -10; x2 = (y2 + 7) / 5; }
            else if (y2 > 10) { y2 = 10; x2 = (y2 + 7) / 5; }
            const [cx1, cy1] = toCanvasCoords(x1, y1);
            const [cx2, cy2] = toCanvasCoords(x2, y2);
            ctx.strokeStyle = '#0074D9';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx1, cy1);
            ctx.lineTo(cx2, cy2);
            ctx.stroke();
            drawArrow(ctx, cx2, cy2, cx1, cy1);
            drawArrow(ctx, cx1, cy1, cx2, cy2);
        }
    })();

    // --- Question 3: Draggable dot axes ---
    (function() {
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
    })();
    // --- Question 1: Line segment (2,6) to (3,9) ---
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

    // --- Question 2: y = 5x - 7 ---
    const lineCanvas = document.getElementById('lineGraph');
    if (lineCanvas) {
        const ctx = lineCanvas.getContext('2d');
        drawAxesAndTicks(ctx, toCanvasCoords);
        // Find two points on y = 5x - 7 within x in [-10, 10]
        let x1 = -10, x2 = 10;
        let y1 = 5 * x1 - 7;
        let y2 = 5 * x2 - 7;
        // Clip y to [-10, 10] if needed
        if (y1 < -10) { y1 = -10; x1 = (y1 + 7) / 5; }
        else if (y1 > 10) { y1 = 10; x1 = (y1 + 7) / 5; }
        if (y2 < -10) { y2 = -10; x2 = (y2 + 7) / 5; }
        else if (y2 > 10) { y2 = 10; x2 = (y2 + 7) / 5; }
        const [cx1, cy1] = toCanvasCoords(x1, y1);
        const [cx2, cy2] = toCanvasCoords(x2, y2);
        ctx.strokeStyle = '#0074D9';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx1, cy1);
        ctx.lineTo(cx2, cy2);
        ctx.stroke();
        drawArrow(ctx, cx2, cy2, cx1, cy1);
        drawArrow(ctx, cx1, cy1, cx2, cy2);
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


    // Quiz logic (multi-question)
    const submitBtn = document.getElementById('submitBtn');
    const gradeBox = document.getElementById('gradeBox');
    submitBtn.onclick = function() {
        let total = 5;
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
        // Question 4: yes/no (2,9) on y=3x+4
        const answer4 = document.querySelector('input[name="q4"]:checked');
        const resultBox4 = document.getElementById('resultBox4');
        const solutionBox4 = document.getElementById('solutionBox4');
        if (answer4 && answer4.value === 'no') {
            correct++;
            resultBox4.textContent = 'Correct!';
            resultBox4.style.color = 'green';
        } else {
            resultBox4.textContent = 'Incorrect.';
            resultBox4.style.color = 'red';
        }
        resultBox4.classList.remove('hidden');
        solutionBox4.classList.remove('hidden');
        // Question 5: slope input (accept 1/13 or 0.0769)
        const input5 = document.getElementById('q5input');
        const resultBox5 = document.getElementById('resultBox5');
        const solutionBox5 = document.getElementById('solutionBox5');
        let val5 = input5 ? input5.value.trim() : '';
        let correct5 = false;
        if (val5) {
            // Accept 1/13, 1 : 13, 0.0769, 0.077, .0769, .077
            if (val5 === '1/13' || val5 === '1 : 13') correct5 = true;
            else {
                let num = null;
                if (/^\d+\s*\/\s*\d+$/.test(val5)) {
                    // Fraction
                    let parts = val5.split('/');
                    num = parseFloat(parts[0]) / parseFloat(parts[1]);
                } else {
                    num = parseFloat(val5);
                }
                if (Math.abs(num - (1/13)) < 0.001) correct5 = true;
            }
        }
        if (correct5) {
            correct++;
            resultBox5.textContent = 'Correct!';
            resultBox5.style.color = 'green';
        } else {
            resultBox5.textContent = 'Incorrect.';
            resultBox5.style.color = 'red';
        }
        resultBox5.classList.remove('hidden');
        solutionBox5.classList.remove('hidden');
        submitBtn.disabled = true;
        // Show overall grade
        gradeBox.textContent = `Score: ${correct} / ${total}`;
        gradeBox.classList.remove('hidden');
    };
};
