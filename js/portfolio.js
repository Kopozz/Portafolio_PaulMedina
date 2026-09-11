(function () {
    "use strict";

    const header = document.getElementById("site-header");
    const menuButton = document.getElementById("menu-button");
    const mobileNav = document.getElementById("mobile-nav");
    const toast = document.getElementById("toast");
    const year = document.getElementById("year");

    function updateHeader() {
        if (header) header.classList.toggle("scrolled", window.scrollY > 18);
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
        toast.textContent = message;
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2400);
    }

    async function copyEmail(button) {
        const email = button.dataset.email;
        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
            showToast("Correo copiado");
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
            showToast("Correo copiado");
        }
    }

    function initReveal() {
        const elements = document.querySelectorAll(".reveal");

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -50px" });

        elements.forEach((element) => observer.observe(element));
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    menuButton?.addEventListener("click", toggleMenu);
    mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.querySelector(".copy-button")?.addEventListener("click", (event) => copyEmail(event.currentTarget));
    year.textContent = String(new Date().getFullYear());
    initReveal();
})();
