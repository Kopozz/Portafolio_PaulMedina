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
    const motionOk = () => !reducedMotion.matches;

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
        Promise.race([fonts, new Promise((resolve) => window.setTimeout(resolve, 700))]).then(() => window.requestAnimationFrame(start));
    }

    function initReveal() {
        const elements = Array.from(document.querySelectorAll(".reveal"));
        elements.forEach((element) => {
            const siblings = Array.from(element.parentElement?.children || []).filter((child) => child.classList.contains("reveal"));
            const index = siblings.indexOf(element);
            if (index > 0) element.style.setProperty("--d", `${Math.min(index * 0.06, 0.42).toFixed(2)}s`);
        });

        if (!motionOk() || !("IntersectionObserver" in window)) {
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
    function initTypewriter() {
        const element = document.querySelector("[data-typewriter]");
        if (!element) return;
        const words = Array.from(window.KzalyI18n?.words || ["sitios web que venden."]).filter(Boolean);
        window.clearTimeout(typewriterTimer);
        const run = ++typewriterRun;
        element.textContent = words[0];
        if (words.length < 2 || !motionOk()) return;

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

    /* ---------- Hero: cursor light + mark tilt ---------- */
    function initHeroPointer() {
        const field = document.querySelector(".hero-field");
        const frame = document.querySelector(".mark-frame");
        if (!hero || !field || !finePointer.matches || !motionOk()) return;

        const target = { x: hero.offsetWidth * 0.72, y: hero.offsetHeight * 0.38 };
        const current = { ...target };
        let tilt = { x: 0, y: 0 };
        let frameId = null;

        function loop() {
            current.x += (target.x - current.x) * 0.12;
            current.y += (target.y - current.y) * 0.12;
            field.style.setProperty("--mx", `${current.x.toFixed(1)}px`);
            field.style.setProperty("--my", `${current.y.toFixed(1)}px`);
            if (frame) {
                frame.style.setProperty("--rx", `${tilt.x.toFixed(2)}deg`);
                frame.style.setProperty("--ry", `${tilt.y.toFixed(2)}deg`);
            }
            const settled = Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5;
            frameId = settled ? null : window.requestAnimationFrame(loop);
        }

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();
            target.x = event.clientX - rect.left;
            target.y = event.clientY - rect.top;
            const nx = target.x / rect.width - 0.5;
            const ny = target.y / rect.height - 0.5;
            tilt = { x: -ny * 9, y: nx * 12 };
            if (!frameId) frameId = window.requestAnimationFrame(loop);
        }, { passive: true });

        hero.addEventListener("pointerleave", () => {
            tilt = { x: 0, y: 0 };
            if (!frameId) frameId = window.requestAnimationFrame(loop);
        });
    }

    function initMarkSteps() {
        const steps = Array.from(document.querySelectorAll(".mark-steps li"));
        if (steps.length < 2 || !motionOk()) return;
        let index = 0;
        window.setInterval(() => {
            if (document.hidden) return;
            steps[index].classList.remove("is-on");
            index = (index + 1) % steps.length;
            void steps[index].offsetWidth;
            steps[index].classList.add("is-on");
        }, 2400);
    }

    /* ---------- Counters ---------- */
    function initCounters() {
        const counters = document.querySelectorAll("[data-count]");
        if (!counters.length || !motionOk() || !("IntersectionObserver" in window)) return;
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
        if (!finePointer.matches || !motionOk()) return;
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
                    if (!show || !motionOk()) return;
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
        if (!motionOk()) return finish();
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
        if (!("IntersectionObserver" in window) || !motionOk()) {
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

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    initIntro();
    initReveal();
    initTypewriter();
    initHeroPointer();
    initMarkSteps();
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
