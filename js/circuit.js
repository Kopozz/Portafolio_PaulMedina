/*
 * Circuit background: PCB-style traces with energy pulses travelling along them.
 * When a pulse reaches the end of a trace the node lights up and, sometimes,
 * types a short code fragment. Traces brighten near the cursor and pulses
 * speed up with scroll velocity, so the background follows the page.
 * Static traces are rendered once to an offscreen canvas; each frame only
 * draws pulses, so the loop stays cheap. It stops while the tab is hidden.
 */
(function () {
    "use strict";

    const canvas = document.getElementById("circuit-bg");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const SNIPPETS = [
        "deploy()", "git push", "build --prod", "200 OK", "fetch('/api')", "SELECT * FROM ventas",
        "npm run build", "<section>", "const kz = true", "ssl: valid", "cache: hit", "await sync()",
        "POST /pedidos", "ping 12 ms", "cdn: edge", "export default", "if (online)", "{ ok: 1 }"
    ];
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

    let width = 0;
    let height = 0;
    let ratio = 1;
    let cell = 26;
    let traces = [];
    let pulses = [];
    let flashes = [];
    let labels = [];
    let staticLayer = null;
    let brightLayer = null;
    let pointer = null;
    let lastTime = null;
    let frame = null;
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    let font = "500 11px 'IBM Plex Mono', Consolas, monospace";

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (list) => list[Math.floor(Math.random() * list.length)];

    function makeLayer() {
        const layer = document.createElement("canvas");
        layer.width = Math.round(width * ratio);
        layer.height = Math.round(height * ratio);
        const layerCtx = layer.getContext("2d");
        layerCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
        return { layer, layerCtx };
    }

    function generate() {
        const cols = Math.ceil(width / cell) + 1;
        const rows = Math.ceil(height / cell) + 1;
        const taken = new Uint8Array(cols * rows);
        const isFree = (c, r) => c >= 0 && r >= 0 && c < cols && r < rows && !taken[r * cols + c];
        const target = Math.round(Math.min(110, Math.max(26, (width * height) / 15000)));
        traces = [];

        for (let attempt = 0; attempt < target * 6 && traces.length < target; attempt += 1) {
            let c = Math.floor(Math.random() * cols);
            let r = Math.floor(Math.random() * rows);
            if (!isFree(c, r)) continue;
            let dir = Math.random() < 0.72 ? pick([0, 2, 4, 6]) : pick([1, 3, 5, 7]);
            const cells = [[c, r]];
            taken[r * cols + c] = 1;
            const maxLength = Math.floor(rand(6, 30));
            let run = Math.floor(rand(2, 8));

            while (cells.length < maxLength) {
                if (run <= 0) {
                    dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
                    run = Math.floor(rand(2, 8));
                }
                const [dc, dr] = DIRS[dir];
                const nc = c + dc;
                const nr = r + dr;
                // Diagonals must not cut through an existing trace corner.
                if (!isFree(nc, nr) || (dc && dr && (!isFree(c + dc, r) || !isFree(c, r + dr)))) break;
                c = nc;
                r = nr;
                taken[r * cols + c] = 1;
                cells.push([c, r]);
                run -= 1;
            }

            if (cells.length < 5) continue;

            // Collapse straight runs into corner points and pre-compute lengths.
            const points = [cells[0]];
            for (let i = 1; i < cells.length - 1; i += 1) {
                const [ax, ay] = cells[i - 1];
                const [bx, by] = cells[i];
                const [cx, cy] = cells[i + 1];
                if (bx - ax !== cx - bx || by - ay !== cy - by) points.push(cells[i]);
            }
            points.push(cells[cells.length - 1]);
            const px = points.map(([pc, pr]) => [pc * cell + 0.5, pr * cell + 0.5]);
            const lengths = [0];
            for (let i = 1; i < px.length; i += 1) {
                lengths.push(lengths[i - 1] + Math.hypot(px[i][0] - px[i - 1][0], px[i][1] - px[i - 1][1]));
            }
            traces.push({ points: px, lengths, total: lengths[lengths.length - 1] });
        }
    }

    function drawTraces(target, stroke, node, lineWidth) {
        target.lineWidth = lineWidth;
        target.lineJoin = "miter";
        target.strokeStyle = stroke;
        traces.forEach(({ points }) => {
            target.beginPath();
            target.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i += 1) target.lineTo(points[i][0], points[i][1]);
            target.stroke();
        });
        target.fillStyle = node;
        target.strokeStyle = node;
        traces.forEach(({ points }) => {
            const [sx, sy] = points[0];
            target.fillRect(sx - 1.5, sy - 1.5, 3, 3);
            const [ex, ey] = points[points.length - 1];
            target.beginPath();
            target.arc(ex, ey, 2.4, 0, Math.PI * 2);
            target.stroke();
        });
    }

    function renderLayers() {
        const base = makeLayer();
        drawTraces(base.layerCtx, "rgba(120, 160, 230, 0.075)", "rgba(140, 180, 255, 0.16)", 1);
        staticLayer = base.layer;
        const bright = makeLayer();
        drawTraces(bright.layerCtx, "rgba(52, 185, 255, 0.5)", "rgba(120, 210, 255, 0.85)", 1.2);
        brightLayer = bright.layer;
    }

    function resize() {
        // A tab opened in the background can report a 0×0 viewport; wait for a real size.
        if (!window.innerWidth || !window.innerHeight) return;
        ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        cell = width < 700 ? 22 : 26;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        generate();
        renderLayers();
        pulses = [];
        flashes = [];
        labels = [];
    }

    function pointAt(trace, distance) {
        const { points, lengths } = trace;
        const d = Math.max(0, Math.min(trace.total, distance));
        let i = 1;
        while (i < lengths.length - 1 && lengths[i] < d) i += 1;
        const span = lengths[i] - lengths[i - 1] || 1;
        const k = (d - lengths[i - 1]) / span;
        return [
            points[i - 1][0] + (points[i][0] - points[i - 1][0]) * k,
            points[i - 1][1] + (points[i][1] - points[i - 1][1]) * k
        ];
    }

    function spawnPulse() {
        if (!traces.length) return;
        const trace = pick(traces);
        const roll = Math.random();
        pulses.push({
            trace,
            distance: 0,
            reverse: Math.random() < 0.5,
            speed: rand(70, 150),
            tail: rand(36, 90),
            color: roll < 0.12 ? "246, 247, 249" : roll < 0.55 ? "52, 185, 255" : "10, 108, 255"
        });
    }

    function finishPulse(pulse) {
        const end = pulse.reverse ? pulse.trace.points[0] : pulse.trace.points[pulse.trace.points.length - 1];
        flashes.push({ x: end[0], y: end[1], life: 0, color: pulse.color });
        if (labels.length >= (width < 700 ? 3 : 6) || Math.random() > 0.32) return;
        const x = end[0] + 8;
        const y = end[1] - 7;
        // Keep fragments apart so two never type over each other.
        if (labels.some((label) => Math.abs(label.y - y) < 22 && Math.abs(label.x - x) < 180)) return;
        const text = pick(SNIPPETS);
        ctx.font = font;
        const textWidth = ctx.measureText(text).width;
        labels.push({ x: Math.max(8, Math.min(x, width - textWidth - 12)), y, text, life: 0 });
    }

    function drawPulse(pulse) {
        const head = pulse.distance;
        const steps = 7;
        let previous = null;
        for (let i = steps; i >= 0; i -= 1) {
            const along = head - (pulse.tail * i) / steps;
            const d = pulse.reverse ? pulse.trace.total - along : along;
            const point = pointAt(pulse.trace, d);
            if (previous && along > 0) {
                ctx.strokeStyle = `rgba(${pulse.color}, ${(0.85 * (1 - i / steps)).toFixed(3)})`;
                ctx.beginPath();
                ctx.moveTo(previous[0], previous[1]);
                ctx.lineTo(point[0], point[1]);
                ctx.stroke();
            }
            previous = point;
        }
        if (previous) {
            ctx.fillStyle = `rgba(${pulse.color}, 0.16)`;
            ctx.beginPath();
            ctx.arc(previous[0], previous[1], 5.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(${pulse.color}, 1)`;
            ctx.fillRect(previous[0] - 1.5, previous[1] - 1.5, 3, 3);
        }
    }

    function step(now) {
        frame = null;
        if (document.hidden) return;
        const dt = lastTime === null ? 16 : Math.min(now - lastTime, 64);
        lastTime = now;

        // Scroll makes the current flow faster for a moment.
        scrollBoost *= 0.92;
        const speedFactor = 1 + Math.min(scrollBoost, 3);
        const wanted = Math.round(traces.length * 0.32 * (1 + Math.min(scrollBoost, 2) * 0.5));
        if (pulses.length < wanted && Math.random() < 0.18 * speedFactor) spawnPulse();

        if (!width || !height || !staticLayer) {
            frame = window.requestAnimationFrame(step);
            return;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(staticLayer, 0, 0, width, height);

        if (pointer && brightLayer) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, 170, 0, Math.PI * 2);
            ctx.clip();
            ctx.globalAlpha = 0.55;
            ctx.drawImage(brightLayer, 0, 0, width, height);
            ctx.restore();
        }

        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        pulses = pulses.filter((pulse) => {
            pulse.distance += (pulse.speed * speedFactor * dt) / 1000;
            if (pulse.distance - pulse.tail >= pulse.trace.total) {
                finishPulse(pulse);
                return false;
            }
            drawPulse(pulse);
            return true;
        });

        flashes = flashes.filter((flash) => {
            flash.life += dt;
            const k = flash.life / 700;
            if (k >= 1) return false;
            ctx.strokeStyle = `rgba(${flash.color}, ${(0.8 * (1 - k)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(flash.x, flash.y, 2.5 + k * 9, 0, Math.PI * 2);
            ctx.stroke();
            return true;
        });

        ctx.font = font;
        ctx.textBaseline = "middle";
        labels = labels.filter((label) => {
            label.life += dt;
            const typed = Math.min(label.text.length, Math.floor(label.life / 45));
            const fadeOut = label.life > 2600 ? 1 - (label.life - 2600) / 700 : 1;
            if (fadeOut <= 0) return false;
            ctx.fillStyle = `rgba(150, 190, 255, ${(0.55 * fadeOut).toFixed(3)})`;
            ctx.fillText(label.text.slice(0, typed) + (typed < label.text.length ? "▌" : ""), label.x, label.y);
            return true;
        });

        frame = window.requestAnimationFrame(step);
    }

    function start() {
        if (frame === null && !document.hidden) {
            lastTime = null;
            frame = window.requestAnimationFrame(step);
        }
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        // Phones change height when the address bar hides; only rebuild on real layout changes.
        resizeTimer = window.setTimeout(() => {
            if (window.innerWidth !== width || Math.abs(window.innerHeight - height) > 140) resize();
        }, 200);
    }, { passive: true });

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        scrollBoost += Math.abs(y - lastScrollY) * 0.012;
        lastScrollY = y;
    }, { passive: true });

    if (finePointer) {
        window.addEventListener("pointermove", (event) => { pointer = { x: event.clientX, y: event.clientY }; }, { passive: true });
        document.addEventListener("pointerleave", () => { pointer = null; });
    }

    document.addEventListener("visibilitychange", start);
    document.fonts?.ready.then(() => { font = "500 11px 'IBM Plex Mono', Consolas, monospace"; });

    resize();
    for (let i = 0; i < Math.round(traces.length * 0.2); i += 1) {
        spawnPulse();
        const pulse = pulses[pulses.length - 1];
        if (pulse) pulse.distance = Math.random() * pulse.trace.total;
    }
    start();
})();
