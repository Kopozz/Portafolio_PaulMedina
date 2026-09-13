(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("menu-button");
    const mobileNav = document.getElementById("mobile-nav");
    const toast = document.getElementById("toast");
    const year = document.getElementById("year");

    const projects = {
        botica: {
            code: "KZ–P01",
            category: "PWA · Comercio electrónico · Salud",
            title: "Botica Vida y Salud",
            status: "En producción",
            live: true,
            description: "Sistema farmacéutico para gestionar inventario, ventas y disponibilidad incluso cuando la conexión no es estable.",
            role: "Diseño y desarrollo",
            platform: "Web · PWA",
            focus: "Inventario y venta",
            deliverables: ["Control FEFO", "Operación sin conexión", "Ventas en tiempo real"],
            problem: "La operación necesita controlar productos, fechas de vencimiento y ventas sin depender siempre de una conexión estable.",
            solution: "Una PWA enfocada en inventario farmacéutico, rotación FEFO y continuidad de trabajo sin conexión, con información sincronizada al recuperar la conexión.",
            url: "https://www.boticavidaysalud.com/",
            images: [
                { src: "assets/projects/botica-vida-salud.webp", alt: "Interfaz del sistema Botica Vida y Salud" }
            ]
        },
        evelyn: {
            code: "KZ–P02",
            category: "Web corporativa · ISP",
            title: "Web Evelyn SAC",
            status: "En desarrollo",
            live: false,
            description: "Experiencia comercial para presentar servicios de fibra óptica, televisión y telefonía desde una navegación clara.",
            role: "Diseño y desarrollo web",
            platform: "Web adaptable",
            focus: "Oferta y conversión",
            deliverables: ["Planes de internet", "Cobertura de servicios", "Contacto comercial"],
            problem: "Los servicios y planes debían entenderse rápidamente desde celular, sin obligar al visitante a solicitar información básica por separado.",
            solution: "Una web comercial que organiza la oferta por categorías, prioriza los planes y conecta cada intención con un canal directo de consulta.",
            url: "https://evelynsac-web.vercel.app/",
            images: [
                { src: "assets/projects/evelyn-sac-web.webp", alt: "Página principal del sitio corporativo Evelyn SAC" }
            ]
        },
        inventario: {
            code: "KZ–P03",
            category: "Sistema web · Inventario",
            title: "Inventario Evelyn SAC",
            status: "En desarrollo",
            live: false,
            description: "Herramienta interna para controlar stock, movimientos y trazabilidad de materiales de telecomunicaciones.",
            role: "Producto y desarrollo",
            platform: "Sistema web",
            focus: "Control operativo",
            deliverables: ["Panel de control", "Movimientos de stock", "Reportes"],
            problem: "La operación requiere saber qué materiales existen, dónde se encuentran y cómo cambian a lo largo del trabajo diario.",
            solution: "Un panel centraliza existencias, entradas, salidas, estados y reportes para reducir la dispersión de información operativa.",
            url: "https://inventario-evelyn-sac.onrender.com",
            images: [
                { src: "assets/projects/inventario-evelyn.webp", alt: "Panel del sistema de inventario Evelyn SAC" }
            ]
        },
        axon: {
            code: "KZ–P04",
            category: "Aplicación móvil · Operaciones",
            title: "Axon Móvil",
            status: "En mantenimiento",
            live: false,
            description: "Interfaz móvil oscura para consultar tareas, estados operativos y actividad reciente desde un solo panel.",
            role: "Diseño de interfaz móvil",
            platform: "Aplicación móvil",
            focus: "Estado del sistema",
            deliverables: ["Panel móvil", "Estados operativos", "Navegación por tareas"],
            problem: "La información técnica debía consultarse de forma rápida en una pantalla pequeña, manteniendo jerarquía y legibilidad.",
            solution: "Una interfaz móvil organizada por estados, alertas y tareas, con navegación persistente y contraste preparado para uso prolongado.",
            url: "",
            images: [
                { src: "assets/projects/axon-mobile.webp", alt: "Interfaz de la aplicación Axon Móvil" }
            ]
        },
        cognito: {
            code: "KZ–P05",
            category: "React Native · Aprendizaje",
            title: "Cognito Móvil",
            status: "Demostración privada",
            live: false,
            description: "Trivia gamificada con progresión, logros, modo sin conexión y una interfaz pensada para sesiones rápidas de aprendizaje.",
            role: "Diseño y desarrollo móvil",
            platform: "React Native",
            focus: "Aprendizaje gamificado",
            deliverables: ["Trivia sin conexión", "Sistema de logros", "Progresión y recompensas"],
            problem: "La experiencia debía mantener el interés y permitir avanzar incluso cuando el usuario no dispone de conexión.",
            solution: "Una aplicación de preguntas con dificultad progresiva, recompensas, logros y persistencia local para continuar jugando sin conexión.",
            url: "",
            images: [
                { src: "assets/projects/cognito-mobile.webp", alt: "Presentación de Cognito Móvil" },
                { src: "assets/cognito_1.jpg", alt: "Pantalla de logros de Cognito Móvil" },
                { src: "assets/cognito_2.jpg", alt: "Pantalla de Cognito Móvil" },
                { src: "assets/cognito_3.jpg", alt: "Pantalla de juego de Cognito Móvil" },
                { src: "assets/cognito_4.jpg", alt: "Pantalla de progreso de Cognito Móvil" },
                { src: "assets/cognito_5.jpg", alt: "Pantalla adicional de Cognito Móvil" }
            ]
        }
    };

    let selectedProject = "botica";
    let toastTimer;
    let projectSwitchTimer;
    let typewriterTimer;
    let typewriterRun = 0;

    function translate(value) {
        return window.KzalyI18n?.t(value) || value;
    }

    function updateHeader() {
        header?.classList.toggle("scrolled", window.scrollY > 18);
    }

    function closeMenu() {
        if (!menuButton || !mobileNav) return;
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        mobileNav.hidden = true;
        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {
        if (!menuButton || !mobileNav) return;
        const opening = mobileNav.hidden;
        mobileNav.hidden = !opening;
        menuButton.classList.toggle("active", opening);
        menuButton.setAttribute("aria-expanded", String(opening));
        menuButton.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
        document.body.classList.toggle("menu-open", opening);
    }

    function showToast(message) {
        if (!toast) return;
        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("show");
        toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
    }

    async function copyEmail(button) {
        const email = button.dataset.email;
        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
        } catch {
            const input = document.createElement("input");
            input.value = email;
            input.setAttribute("readonly", "");
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            input.remove();
        }

        showToast(translate("Correo copiado"));
    }

    function initReveal() {
        const elements = document.querySelectorAll(".reveal");

        if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -45px" });

        elements.forEach((element) => observer.observe(element));
    }

    function initTypewriter() {
        const element = document.querySelector("[data-typewriter]");
        if (!element) return;

        const words = Array.from(window.KzalyI18n?.words || ["sitios web que venden."])
            .filter((word) => typeof word === "string" && word.length > 0);
        window.clearTimeout(typewriterTimer);
        const run = ++typewriterRun;
        if (!words.length) return;
        if (words.length === 1) {
            element.textContent = words[0];
            return;
        }

        let wordIndex = 0;
        let characters = Array.from(words[wordIndex]);
        let characterIndex = characters.length;
        let phase = "pause";

        function tick() {
            if (run !== typewriterRun) return;

            if (phase === "pause") {
                phase = "deleting";
                typewriterTimer = window.setTimeout(tick, 40);
                return;
            }

            if (phase === "deleting") {
                characterIndex = Math.max(0, characterIndex - 1);
                element.textContent = characters.slice(0, characterIndex).join("");

                if (characterIndex > 0) {
                    typewriterTimer = window.setTimeout(tick, 38);
                    return;
                }

                wordIndex = (wordIndex + 1) % words.length;
                characters = Array.from(words[wordIndex]);
                phase = "typing";
                typewriterTimer = window.setTimeout(tick, 260);
                return;
            }

            characterIndex = Math.min(characters.length, characterIndex + 1);
            element.textContent = characters.slice(0, characterIndex).join("");

            if (characterIndex < characters.length) {
                typewriterTimer = window.setTimeout(tick, 64);
                return;
            }

            phase = "pause";
            typewriterTimer = window.setTimeout(tick, 1800);
        }

        element.textContent = words[0];
        typewriterTimer = window.setTimeout(tick, 1400);
    }

    function initTilt() {
        const zone = document.querySelector("[data-tilt-zone]");
        const item = zone?.querySelector(".machine-frame");
        const canTilt = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion.matches;
        if (!zone || !item || !canTilt) return;

        let frameRequest;

        zone.addEventListener("pointermove", (event) => {
            const rect = zone.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            window.cancelAnimationFrame(frameRequest);
            frameRequest = window.requestAnimationFrame(() => {
                item.style.setProperty("--tilt-x", `${(-y * 3.5).toFixed(2)}deg`);
                item.style.setProperty("--tilt-y", `${(x * 4.5).toFixed(2)}deg`);
            });
        }, { passive: true });

        zone.addEventListener("pointerleave", () => {
            item.style.setProperty("--tilt-x", "0deg");
            item.style.setProperty("--tilt-y", "0deg");
        });
    }

    function initTechParticles() {
        const canvas = document.getElementById("tech-particles");
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        let particles = [];
        let animationFrame;
        let width = 0;
        let height = 0;
        let pixelRatio = 1;

        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.13,
                vy: (Math.random() - 0.5) * 0.13,
                radius: Math.random() > 0.82 ? 1.6 : 0.85,
                pulse: Math.random() * Math.PI * 2
            };
        }

        function resize() {
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            const amount = Math.max(24, Math.min(58, Math.round((width * height) / 24000)));
            particles = Array.from({ length: amount }, createParticle);
        }

        function draw(advance = true) {
            context.clearRect(0, 0, width, height);

            particles.forEach((particle, index) => {
                if (advance) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.pulse += 0.012;
                    if (particle.x < -10) particle.x = width + 10;
                    if (particle.x > width + 10) particle.x = -10;
                    if (particle.y < -10) particle.y = height + 10;
                    if (particle.y > height + 10) particle.y = -10;
                }

                for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
                    const next = particles[nextIndex];
                    const dx = particle.x - next.x;
                    const dy = particle.y - next.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance > 155) continue;
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(next.x, next.y);
                    context.strokeStyle = `rgba(72, 174, 244, ${0.11 * (1 - distance / 155)})`;
                    context.lineWidth = 0.65;
                    context.stroke();
                }

                const glow = 0.35 + Math.sin(particle.pulse) * 0.13;
                context.beginPath();
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                context.fillStyle = `rgba(88, 188, 255, ${glow})`;
                context.fill();
            });
        }

        function animate() {
            draw(true);
            animationFrame = window.requestAnimationFrame(animate);
        }

        resize();
        if (prefersReducedMotion.matches) draw(false);
        else animate();

        window.addEventListener("resize", resize, { passive: true });
        document.addEventListener("visibilitychange", () => {
            if (prefersReducedMotion.matches) return;
            window.cancelAnimationFrame(animationFrame);
            if (!document.hidden) animate();
        });
    }

    function replaceList(element, values) {
        if (!element) return;
        element.replaceChildren(...values.map((value) => {
            const item = document.createElement("li");
            item.textContent = value;
            return item;
        }));
    }

    function updateProject(projectId, moveFocus) {
        const project = projects[projectId];
        const image = document.getElementById("project-image");
        if (!project || !image) return;

        selectedProject = projectId;
        document.querySelectorAll(".project-tab").forEach((tab) => {
            const active = tab.dataset.project === projectId;
            tab.classList.toggle("active", active);
            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
            if (active && moveFocus) tab.focus();
        });

        window.clearTimeout(projectSwitchTimer);
        image.classList.add("switching");
        projectSwitchTimer = window.setTimeout(() => {
            image.src = project.images[0].src;
            image.alt = translate(project.images[0].alt);
            image.classList.remove("switching");
        }, prefersReducedMotion.matches ? 0 : 170);

        document.getElementById("project-code").textContent = project.code;
        document.getElementById("project-category").textContent = translate(project.category);
        document.getElementById("project-title").textContent = project.title;
        document.getElementById("project-description").textContent = translate(project.description);
        document.getElementById("project-role").textContent = translate(project.role);
        document.getElementById("project-platform").textContent = translate(project.platform);
        document.getElementById("project-focus").textContent = translate(project.focus);
        replaceList(document.getElementById("project-deliverables"), project.deliverables.map(translate));

        const status = document.getElementById("project-status");
        status.textContent = translate(project.status);
        status.classList.toggle("status-live", project.live);

        const openCase = document.getElementById("open-case");
        openCase.dataset.openCase = projectId;

        const link = document.getElementById("project-link");
        if (project.url) {
            link.href = project.url;
            link.hidden = false;
        } else {
            link.removeAttribute("href");
            link.hidden = true;
        }
    }

    function renderCaseSpecs(project) {
        const specs = document.getElementById("case-specs");
        if (!specs) return;

        const values = [
            [translate("Rol"), translate(project.role)],
            [translate("Plataforma"), translate(project.platform)],
            [translate("Enfoque"), translate(project.focus)]
        ];

        specs.replaceChildren(...values.map(([label, value]) => {
            const row = document.createElement("div");
            const term = document.createElement("dt");
            const description = document.createElement("dd");
            term.textContent = label;
            description.textContent = value;
            row.append(term, description);
            return row;
        }));
    }

    function renderCaseGallery(project) {
        const mainImage = document.getElementById("case-main-image");
        const thumbs = document.getElementById("case-thumbs");
        if (!mainImage || !thumbs) return;

        mainImage.src = project.images[0].src;
        mainImage.alt = translate(project.images[0].alt);

        thumbs.replaceChildren(...project.images.map((imageData, index) => {
            const button = document.createElement("button");
            const image = document.createElement("img");
            button.type = "button";
            button.className = `case-thumb${index === 0 ? " active" : ""}`;
            button.setAttribute("aria-label", `${translate("Ver imagen")} ${index + 1} · ${project.title}`);
            image.src = imageData.src;
            image.alt = "";
            image.loading = "lazy";
            button.appendChild(image);
            button.addEventListener("click", () => {
                mainImage.src = imageData.src;
                mainImage.alt = translate(imageData.alt);
                thumbs.querySelectorAll(".case-thumb").forEach((thumb) => thumb.classList.remove("active"));
                button.classList.add("active");
            });
            return button;
        }));

        thumbs.hidden = project.images.length < 2;
    }

    function openCaseStudy(projectId) {
        const project = projects[projectId];
        const dialog = document.getElementById("case-dialog");
        if (!project || !dialog) return;

        document.getElementById("case-code").textContent = project.code;
        document.getElementById("case-status").textContent = translate(project.status);
        document.getElementById("case-title").textContent = project.title;
        document.getElementById("case-summary").textContent = translate(project.description);
        document.getElementById("case-problem").textContent = translate(project.problem);
        document.getElementById("case-solution").textContent = translate(project.solution);
        renderCaseSpecs(project);
        renderCaseGallery(project);

        const link = document.getElementById("case-link");
        if (project.url) {
            link.href = project.url;
            link.hidden = false;
        } else {
            link.removeAttribute("href");
            link.hidden = true;
        }

        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        document.body.classList.add("dialog-open");
    }

    function closeCaseStudy() {
        const dialog = document.getElementById("case-dialog");
        if (!dialog) return;
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
        document.body.classList.remove("dialog-open");
    }

    function initProjectArchive() {
        const tabs = Array.from(document.querySelectorAll(".project-tab"));
        if (!tabs.length) return;

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => updateProject(tab.dataset.project, false));
            tab.addEventListener("keydown", (event) => {
                if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
                event.preventDefault();
                const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
                const next = (index + direction + tabs.length) % tabs.length;
                updateProject(tabs[next].dataset.project, true);
            });
        });

        document.getElementById("open-case")?.addEventListener("click", () => openCaseStudy(selectedProject));
        document.querySelector("[data-close-dialog]")?.addEventListener("click", closeCaseStudy);

        const dialog = document.getElementById("case-dialog");
        dialog?.addEventListener("click", (event) => {
            if (event.target === dialog) closeCaseStudy();
        });
        dialog?.addEventListener("close", () => document.body.classList.remove("dialog-open"));
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    menuButton?.addEventListener("click", toggleMenu);
    mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.querySelector(".copy-button")?.addEventListener("click", (event) => copyEmail(event.currentTarget));
    if (year) year.textContent = String(new Date().getFullYear());

    initReveal();
    initTypewriter();
    initTilt();
    initTechParticles();
    initProjectArchive();

    window.addEventListener("kzaly:languagechange", () => {
        initTypewriter();
        updateProject(selectedProject, false);
        const dialog = document.getElementById("case-dialog");
        if (dialog?.open) openCaseStudy(selectedProject);
    });
})();
