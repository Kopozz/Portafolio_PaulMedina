(function () {
    "use strict";

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("menu-button");
    const mobileNav = document.getElementById("mobile-nav");
    const toast = document.getElementById("toast");
    const projects = window.KzalyProjects || {};

    const WHATSAPP_NUMBER = "51952449319";
    const WHATSAPP_MESSAGE = "Hola Paul, vi tu portafolio y quiero conversar sobre un proyecto.";
    const SIMILAR_MESSAGE = "Hola Paul, vi el proyecto {project} en tu portafolio y quiero algo similar.";
    // Assembled at runtime so the address is not sitting in the HTML for scrapers.
    const MAIL = ["pauljared96", "gmail.com"];

    let toastTimer;
    let typewriterTimer;
    let typewriterRun = 0;
    let selectedProject = null;

    const t = (value) => window.KzalyI18n?.t(value) || value;
    const lang = () => window.KzalyI18n?.language || "es";
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    // Ambient animation always runs. A reduced-motion preference only removes
    // parallax, tilt and magnetic pull (see the matching CSS block).
    const pullOk = () => !reducedMotion.matches && finePointer.matches;

    /* ---------- Header, progress, scroll spy ---------- */
    const navLinks = Array.from(document.querySelectorAll(".desktop-nav a[data-nav]"));
    const spySections = navLinks.map((link) => document.getElementById(link.dataset.nav)).filter(Boolean);
    const progress = document.querySelector(".scroll-progress");
    const processList = document.querySelector("[data-process]");
    const waFloat = document.getElementById("wa-float");
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contacto");

    let lastScrollY = window.scrollY;
    let scrollTicking = false;

    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;

        header?.classList.toggle("is-scrolled", y > 12);
        const goingDown = y > lastScrollY;
        const menuOpen = menuButton?.classList.contains("active");
        header?.classList.toggle("is-hidden", goingDown && y > 420 && !menuOpen);
        lastScrollY = y;

        progress?.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : "0");

        const marker = y + window.innerHeight * 0.35;
        let current = null;
        spySections.forEach((section) => { if (section.offsetTop <= marker) current = section.id; });
        navLinks.forEach((link) => link.classList.toggle("is-current", link.dataset.nav === current));

        if (processList) {
            const rect = processList.getBoundingClientRect();
            const value = clamp((window.innerHeight * 0.8 - rect.top) / (rect.height + window.innerHeight * 0.25), 0, 1);
            processList.style.setProperty("--progress", value.toFixed(3));
        }

        updateWhatsAppVisibility();
        scrollTicking = false;
    }

    function requestScroll() {
        if (scrollTicking) return;
        scrollTicking = true;
        window.requestAnimationFrame(onScroll);
    }

    /* ---------- Mobile menu ---------- */
    function setMenu(open) {
        if (!menuButton || !mobileNav) return;
        mobileNav.hidden = !open;
        menuButton.classList.toggle("active", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", t(open ? "Cerrar menú" : "Abrir menú"));
        document.body.classList.toggle("no-scroll", open);
        if (open) header?.classList.remove("is-hidden");
    }

    /* ---------- Toast & email ---------- */
    function showToast(message) {
        if (!toast) return;
        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("show");
        toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
    }

    function initMail() {
        const address = MAIL.join("@");
        document.querySelectorAll("[data-mail]").forEach((link) => { link.href = `mailto:${address}`; });
        document.querySelectorAll("[data-mail-text]").forEach((node) => { node.textContent = address; });
        document.querySelectorAll("[data-copy-mail]").forEach((button) => {
            button.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(address);
                } catch {
                    const input = document.createElement("input");
                    input.value = address;
                    input.setAttribute("readonly", "");
                    input.className = "sr-only";
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand("copy");
                    input.remove();
                }
                showToast(t("Correo copiado"));
            });
        });
    }

    /* ---------- WhatsApp ---------- */
    function whatsappUrl(message) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function updateWhatsAppLinks() {
        const url = whatsappUrl(t(WHATSAPP_MESSAGE));
        document.querySelectorAll("[data-wa-link]").forEach((link) => { link.href = url; });
    }

    let contactVisible = false;
    function updateWhatsAppVisibility() {
        if (!waFloat || !hero) return;
        const pastHero = window.scrollY > hero.offsetHeight * 0.55;
        const dialogOpen = document.getElementById("case-dialog")?.open;
        const hide = !pastHero || contactVisible || dialogOpen;
        const wasHidden = waFloat.classList.contains("is-hidden");
        waFloat.classList.toggle("is-hidden", Boolean(hide));
        if (wasHidden && !hide) peekWhatsApp();
    }

    let peeked = false;
    function peekWhatsApp() {
        if (peeked || !waFloat) return;
        peeked = true;
        waFloat.classList.add("is-peek");
        window.setTimeout(() => waFloat.classList.remove("is-peek"), 2600);
    }

    function initWhatsAppFloat() {
        if (!waFloat) return;
        waFloat.classList.add("is-hidden");

        if (contact && "IntersectionObserver" in window) {
            new IntersectionObserver(([entry]) => {
                contactVisible = entry.isIntersecting;
                updateWhatsAppVisibility();
            }, { threshold: 0.15 }).observe(contact);
        }

        const bubble = document.getElementById("wa-bubble");
        let dismissed = false;
        try { dismissed = sessionStorage.getItem("kz-wa-bubble") === "1"; } catch { /* storage unavailable */ }
        if (bubble && !dismissed) {
            window.setTimeout(() => {
                if (waFloat.classList.contains("is-hidden")) return;
                bubble.hidden = false;
                window.setTimeout(() => { bubble.hidden = true; }, 9000);
            }, 9000);
            bubble.querySelector(".wa-bubble-close")?.addEventListener("click", () => {
                bubble.hidden = true;
                try { sessionStorage.setItem("kz-wa-bubble", "1"); } catch { /* storage unavailable */ }
            });
        }
    }

    /* ---------- Intro & reveal ---------- */
    function initIntro() {
        document.querySelectorAll("[data-intro]").forEach((element, index) => {
            element.style.setProperty("--d", `${(0.12 + index * 0.09).toFixed(2)}s`);
        });
        document.querySelectorAll(".hero-title .line > span, .hero-title .line > i").forEach((element) => {
            const line = element.closest(".line");
            if (line) element.style.setProperty("--d", getComputedStyle(line).getPropertyValue("--d"));
        });

        const start = () => root.classList.add("is-loaded");
        const fonts = document.fonts?.ready || Promise.resolve();
        // Plain timers (not requestAnimationFrame) so a tab opened in the background still starts.
        Promise.race([fonts, new Promise((resolve) => window.setTimeout(resolve, 700))]).then(() => window.setTimeout(start, 30));
    }

    function initReveal() {
        const elements = Array.from(document.querySelectorAll(".reveal"));
        elements.forEach((element) => {
            const siblings = Array.from(element.parentElement?.children || []).filter((child) => child.classList.contains("reveal"));
            const index = siblings.indexOf(element);
            if (index > 0) element.style.setProperty("--d", `${Math.min(index * 0.06, 0.42).toFixed(2)}s`);
        });

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("is-in"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-in");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
        elements.forEach((element) => observer.observe(element));
    }

    /* ---------- Typewriter ---------- */
    function typewriterWords() {
        return Array.from(window.KzalyI18n?.words || ["sitios web que venden."]).filter(Boolean);
    }

    // Reserve the height of the tallest phrase so the headline box never changes size.
    function lockTypewriterHeight() {
        const line = document.querySelector(".typewriter-line");
        const element = line?.querySelector("[data-typewriter]");
        if (!line || !element) return;
        const probe = line.cloneNode(true);
        probe.removeAttribute("data-intro");
        probe.setAttribute("aria-hidden", "true");
        Object.assign(probe.style, { position: "absolute", visibility: "hidden", left: "0", top: "0", width: `${line.getBoundingClientRect().width}px`, minHeight: "0", clipPath: "none" });
        line.parentElement.appendChild(probe);
        const text = probe.querySelector("[data-typewriter]");
        let tallest = 0;
        typewriterWords().forEach((word) => {
            text.textContent = word;
            tallest = Math.max(tallest, probe.getBoundingClientRect().height);
        });
        probe.remove();
        if (tallest > 0) line.style.setProperty("--tw-h", `${Math.ceil(tallest)}px`);
    }

    function initTypewriter() {
        const element = document.querySelector("[data-typewriter]");
        if (!element) return;
        const words = typewriterWords();
        window.clearTimeout(typewriterTimer);
        const run = ++typewriterRun;
        element.textContent = words[0];
        lockTypewriterHeight();
        if (words.length < 2) return;

        let wordIndex = 0;
        let characters = Array.from(words[0]);
        let count = characters.length;
        let phase = "pause";

        function tick() {
            if (run !== typewriterRun) return;
            if (phase === "pause") {
                phase = "deleting";
                typewriterTimer = window.setTimeout(tick, 40);
                return;
            }
            if (phase === "deleting") {
                count = Math.max(0, count - 1);
                element.textContent = characters.slice(0, count).join("");
                if (count > 0) {
                    typewriterTimer = window.setTimeout(tick, 32);
                    return;
                }
                wordIndex = (wordIndex + 1) % words.length;
                characters = Array.from(words[wordIndex]);
                phase = "typing";
                typewriterTimer = window.setTimeout(tick, 280);
                return;
            }
            count = Math.min(characters.length, count + 1);
            element.textContent = characters.slice(0, count).join("");
            if (count < characters.length) {
                typewriterTimer = window.setTimeout(tick, 58);
                return;
            }
            phase = "pause";
            typewriterTimer = window.setTimeout(tick, 2000);
        }

        typewriterTimer = window.setTimeout(tick, 2600);
    }

    /* ---------- Hero: tilt of the stage ---------- */
    function initStageTilt() {
        const frame = document.getElementById("stage");
        if (!hero || !frame || !pullOk()) return;
        let request = null;
        let tilt = { x: 0, y: 0 };
        const apply = () => {
            frame.style.setProperty("--rx", `${tilt.x.toFixed(2)}deg`);
            frame.style.setProperty("--ry", `${tilt.y.toFixed(2)}deg`);
            request = null;
        };
        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            tilt = { x: -((event.clientY - rect.top) / rect.height - 0.5) * 7, y: ((event.clientX - rect.left) / rect.width - 0.5) * 9 };
            if (!request) request = window.requestAnimationFrame(apply);
        }, { passive: true });
        hero.addEventListener("pointerleave", () => {
            tilt = { x: 0, y: 0 };
            if (!request) request = window.requestAnimationFrame(apply);
        });
    }

    /* ---------- Hero: design → code → deploy stage ----------
       One clock drives everything: scene switches, the step progress bars and
       the deploy counter. It stops while the hero is off screen or the tab is
       hidden, and CSS animations inside the stage pause with it. */
    function initStage() {
        const frame = document.getElementById("stage");
        if (!frame) return;
        const scenes = Array.from(frame.querySelectorAll(".scene"));
        const steps = Array.from(document.querySelectorAll(".stage-steps button"));
        const durations = [5600, 5600, 5400];
        const pct = frame.querySelector("[data-deploy-pct]");
        const checks = Array.from(frame.querySelectorAll(".dp-checks li"));
        const live = frame.querySelector(".dp-live");
        if (scenes.length !== durations.length) return;

        // Typing timings for the code scene: one character every 24 ms, lines in sequence.
        // Re-run on language change because the terminal line is translated.
        function timeCodeLines() {
            let cursor = 0.25;
            frame.querySelectorAll(".scene-code .cl").forEach((line) => {
                const chars = Math.max(1, Array.from(line.textContent).length);
                const duration = chars * 0.024;
                line.style.setProperty("--n", String(chars));
                line.style.setProperty("--d", `${duration.toFixed(3)}s`);
                line.style.setProperty("--t", `${cursor.toFixed(3)}s`);
                cursor += duration + 0.12;
            });
        }
        timeCodeLines();
        window.addEventListener("kzaly:languagechange", timeCodeLines);

        let index = 0;
        let elapsed = 0;
        let last = null;
        let visible = true;
        let leaveTimer;

        function deployCurve(t) {
            // Fast start, short hold in the middle, smooth finish: reads like a real build.
            if (t < 0.18) return t / 0.18 * 0.34;
            if (t < 0.3) return 0.34 + (t - 0.18) / 0.12 * 0.08;
            if (t < 0.58) return 0.42 + (t - 0.3) / 0.28 * 0.58;
            return 1;
        }

        function renderDeploy(progress) {
            const value = deployCurve(progress);
            frame.style.setProperty("--dp", value.toFixed(3));
            if (pct) pct.textContent = `${Math.round(value * 100)}%`;
            checks.forEach((check, i) => check.classList.toggle("is-done", value >= (i + 1) / checks.length - 0.001));
            live?.classList.toggle("is-on", value >= 1 && progress > 0.62);
        }

        function show(next) {
            const previous = scenes[index];
            index = next;
            elapsed = 0;
            window.clearTimeout(leaveTimer);
            scenes.forEach((scene) => scene.classList.remove("is-leaving"));
            if (previous !== scenes[index]) {
                previous.classList.remove("is-active");
                previous.classList.add("is-leaving");
                leaveTimer = window.setTimeout(() => previous.classList.remove("is-leaving"), 600);
            }
            const scene = scenes[index];
            scene.classList.remove("is-active");
            void scene.offsetWidth;
            scene.classList.add("is-active");
            steps.forEach((step, i) => {
                step.classList.toggle("is-on", i === index);
                step.setAttribute("aria-pressed", String(i === index));
                step.style.setProperty("--p", i < index ? "1" : "0");
            });
            if (index === 2) renderDeploy(0);
        }

        function tick(now) {
            const running = visible && !document.hidden && root.classList.contains("is-loaded");
            frame.classList.toggle("is-paused", !running);
            if (last !== null && running) elapsed += Math.min(now - last, 100);
            last = now;
            const progress = clamp(elapsed / durations[index], 0, 1);
            steps[index]?.style.setProperty("--p", progress.toFixed(4));
            if (index === 2) renderDeploy(progress);
            if (elapsed >= durations[index]) show((index + 1) % scenes.length);
            window.requestAnimationFrame(tick);
        }

        steps.forEach((step, i) => step.addEventListener("click", () => show(i)));

        if ("IntersectionObserver" in window) {
            new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 }).observe(frame);
        }

        show(0);
        window.requestAnimationFrame(tick);
    }

    /* ---------- Counters ---------- */
    function initCounters() {
        const counters = document.querySelectorAll("[data-count]");
        if (!counters.length || !("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                const element = entry.target;
                const end = Number(element.dataset.count);
                const width = String(end).length;
                const startTime = performance.now() + 900;
                function step(now) {
                    const progressValue = clamp((now - startTime) / 1100, 0, 1);
                    const eased = 1 - Math.pow(1 - progressValue, 3);
                    element.textContent = String(Math.round(end * eased)).padStart(width, "0");
                    if (progressValue < 1) window.requestAnimationFrame(step);
                }
                element.textContent = "0".padStart(width, "0");
                window.requestAnimationFrame(step);
            });
        }, { threshold: 0.6 });
        counters.forEach((counter) => observer.observe(counter));
    }

    /* ---------- Magnetic buttons ---------- */
    function initMagnetic() {
        if (!pullOk()) return;
        document.querySelectorAll("[data-magnetic], .wa-button").forEach((element) => {
            element.addEventListener("pointermove", (event) => {
                const rect = element.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                element.style.setProperty("--tx", `${(x * 10).toFixed(1)}px`);
                element.style.setProperty("--ty", `${(y * 8).toFixed(1)}px`);
            });
            element.addEventListener("pointerleave", () => {
                element.style.setProperty("--tx", "0px");
                element.style.setProperty("--ty", "0px");
            });
        });
    }

    /* ---------- Projects: filter ---------- */
    function initFilters() {
        const grid = document.getElementById("project-grid");
        const buttons = Array.from(document.querySelectorAll(".filter[data-filter]"));
        if (!grid || !buttons.length) return;
        const tiles = Array.from(grid.querySelectorAll(".tile"));

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;
                if (grid.dataset.filter === filter) return;
                buttons.forEach((item) => {
                    const active = item === button;
                    item.classList.toggle("is-active", active);
                    item.setAttribute("aria-pressed", String(active));
                });
                grid.dataset.filter = filter;
                let visibleIndex = 0;
                tiles.forEach((tile) => {
                    const show = filter === "all" || tile.dataset.cat === filter;
                    tile.hidden = !show;
                    tile.classList.remove("is-entering");
                    if (!show) return;
                    tile.style.setProperty("--d", `${Math.min(visibleIndex * 0.05, 0.4).toFixed(2)}s`);
                    void tile.offsetWidth;
                    tile.classList.add("is-entering");
                    visibleIndex += 1;
                });
            });
        });
    }

    /* ---------- Projects: images (when provided) ---------- */
    function renderTileImages() {
        document.querySelectorAll(".tile[data-project]").forEach((tile) => {
            const project = projects[tile.dataset.project];
            const media = tile.querySelector(".tile-media");
            if (!project?.image || !media || media.querySelector("img")) return;
            const image = document.createElement("img");
            image.src = project.image;
            image.alt = project.title;
            image.loading = "lazy";
            image.decoding = "async";
            media.prepend(image);
            media.querySelector(".tile-empty")?.remove();
        });
    }

    /* ---------- Case drawer ---------- */
    const dialog = document.getElementById("case-dialog");

    function pick(field) {
        if (!field) return "";
        if (typeof field === "string") return field;
        return field[lang()] ?? field.en ?? field.es ?? "";
    }

    function fillCase(projectId) {
        const project = projects[projectId];
        if (!project || !dialog) return false;

        const set = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
        set("case-code", project.code);
        set("case-title", project.title);
        set("case-summary", pick(project.summary));
        set("case-problem", pick(project.problem));
        set("case-solution", pick(project.solution));
        set("case-role", pick(project.role));
        set("case-platform", pick(project.platform));
        set("case-stack", project.stack);

        const status = document.getElementById("case-status");
        if (status) {
            status.textContent = t(project.status);
            status.classList.toggle("is-live", Boolean(project.live));
        }

        const points = document.getElementById("case-points");
        if (points) {
            points.replaceChildren(...pick(project.points).map((text) => {
                const item = document.createElement("li");
                item.textContent = text;
                return item;
            }));
        }

        const media = dialog.querySelector(".case-media");
        if (media) {
            media.replaceChildren();
            if (project.image) {
                const image = document.createElement("img");
                image.src = project.image;
                image.alt = project.title;
                media.appendChild(image);
            } else {
                const empty = document.createElement("span");
                empty.className = "tile-empty";
                empty.textContent = t("Vista previa en preparación");
                media.appendChild(empty);
            }
        }

        const link = document.getElementById("case-link");
        if (link) {
            if (project.url) { link.href = project.url; link.hidden = false; }
            else { link.removeAttribute("href"); link.hidden = true; }
        }

        const similar = document.getElementById("case-wa");
        if (similar) similar.href = whatsappUrl(t(SIMILAR_MESSAGE).replace("{project}", project.title));
        return true;
    }

    function openCase(projectId) {
        if (!fillCase(projectId)) return;
        selectedProject = projectId;
        dialog.classList.remove("is-closing");
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        dialog.querySelector(".case-panel")?.scrollTo(0, 0);
        document.body.classList.add("no-scroll");
        updateWhatsAppVisibility();
    }

    function closeCase() {
        if (!dialog?.open || dialog.classList.contains("is-closing")) return;
        const finish = () => {
            dialog.classList.remove("is-closing");
            if (typeof dialog.close === "function") dialog.close();
            else dialog.removeAttribute("open");
            document.body.classList.remove("no-scroll");
            selectedProject = null;
            updateWhatsAppVisibility();
        };
        dialog.classList.add("is-closing");
        dialog.addEventListener("animationend", finish, { once: true });
        window.setTimeout(() => { if (dialog.classList.contains("is-closing")) finish(); }, 600);
    }

    function initCases() {
        document.querySelectorAll(".tile[data-project] .tile-hit").forEach((button) => {
            button.addEventListener("click", () => openCase(button.closest(".tile").dataset.project));
        });
        if (!dialog) return;
        dialog.querySelector("[data-close-dialog]")?.addEventListener("click", closeCase);
        dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeCase(); });
        dialog.addEventListener("click", (event) => { if (event.target === dialog) closeCase(); });
    }

    /* ---------- Cookie notice ---------- */
    function initCookieNote() {
        const note = document.getElementById("cookie-note");
        if (!note) return;
        let seen = false;
        try { seen = localStorage.getItem("kz-cookie-ack") === "1"; } catch { /* storage unavailable */ }
        if (seen) return;
        window.setTimeout(() => { note.hidden = false; }, 1800);
        note.querySelector("[data-cookie-ok]")?.addEventListener("click", () => {
            note.hidden = true;
            try { localStorage.setItem("kz-cookie-ack", "1"); } catch { /* storage unavailable */ }
        });
    }

    /* ---------- Footer word ---------- */
    function initFooterWord() {
        const word = document.querySelector(".footer-word");
        if (!word) return;
        const letters = Array.from(word.textContent.trim());
        word.replaceChildren(...letters.map((letter, index) => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.style.transitionDelay = `${index * 0.06}s`;
            return span;
        }));
        if (!("IntersectionObserver" in window)) {
            word.classList.add("is-in");
            return;
        }
        new IntersectionObserver(([entry], observer) => {
            if (!entry.isIntersecting) return;
            word.classList.add("is-in");
            observer.disconnect();
        }, { threshold: 0.3 }).observe(word);
    }

    /* ---------- Boot ---------- */
    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", requestScroll, { passive: true });
    menuButton?.addEventListener("click", () => setMenu(mobileNav?.hidden ?? false));
    mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !mobileNav?.hidden) setMenu(false); });

    const currentYear = String(new Date().getFullYear());
    document.querySelectorAll("#year, [data-year]").forEach((node) => { node.textContent = currentYear; });

    let resizeTimer;
    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(lockTypewriterHeight, 150);
    }, { passive: true });
    document.fonts?.ready.then(lockTypewriterHeight);

    initIntro();
    initReveal();
    initTypewriter();
    initStageTilt();
    initStage();
    initCookieNote();
    initCounters();
    initMagnetic();
    initFilters();
    renderTileImages();
    initCases();
    initFooterWord();
    initMail();
    initWhatsAppFloat();
    updateWhatsAppLinks();
    onScroll();
    window.__kzReady = true;

    window.addEventListener("kzaly:languagechange", () => {
        initTypewriter();
        updateWhatsAppLinks();
        if (selectedProject && dialog?.open) fillCase(selectedProject);
    });
})();
