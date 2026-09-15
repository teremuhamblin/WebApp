/* ----------------------------------------------------------
   WebApp — app.js v12.0 Command Center
---------------------------------------------------------- */

let perfMode = false;
let animationsEnabled = true;
let parallaxEnabled = true;
let glowEnabled = true;

let lastScroll = 0;
let lastFrameTime = performance.now();
let fps = 0;

/* ----------------------------------------------------------
   Utilitaires
---------------------------------------------------------- */

function log(message) {
    const logConsole = document.getElementById("log-console");
    if (!logConsole) return;
    const line = document.createElement("div");
    line.textContent = `[LOG] ${message}`;
    logConsole.appendChild(line);
    logConsole.scrollTop = logConsole.scrollHeight;
}

/* ----------------------------------------------------------
   1. Animation d’apparition globale
---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1.2s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
        orchestratedIntro();
        log("WebApp initialisée (v12.0 Command Center).");
    }, 100);
});

/* ----------------------------------------------------------
   2. Orchestration d’entrée
---------------------------------------------------------- */

function orchestratedIntro() {
    const header = document.querySelector("header");
    const btns = document.querySelectorAll("button");

    if (header) {
        header.style.transform = "translateY(-40px)";
        header.style.opacity = "0";

        setTimeout(() => {
            header.style.transition = "all 1s ease";
            header.style.transform = "translateY(0)";
            header.style.opacity = "1";
        }, 200);
    }

    btns.forEach((btn, i) => {
        btn.style.transform = "translateY(40px)";
        btn.style.opacity = "0";

        setTimeout(() => {
            btn.style.transition = "all 0.9s ease";
            btn.style.transform = "translateY(0)";
            btn.style.opacity = "1";
        }, 400 + i * 150);
    });
}

/* ----------------------------------------------------------
   3. FPS & scroll speed (Command Center)
---------------------------------------------------------- */

function updateStats() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    fps = Math.round(1000 / delta);
    lastFrameTime = now;

    const fpsDisplay = document.getElementById("fps-display");
    if (fpsDisplay) fpsDisplay.textContent = fps;

    const scrollSpeedDisplay = document.getElementById("scroll-speed-display");
    if (scrollSpeedDisplay) {
        const speed = Math.abs(window.scrollY - lastScroll);
        scrollSpeedDisplay.textContent = speed.toFixed(0);
        lastScroll = window.scrollY;
    }

    requestAnimationFrame(updateStats);
}
requestAnimationFrame(updateStats);

/* ----------------------------------------------------------
   4. Parallax & glassmorphism dynamique
---------------------------------------------------------- */

window.addEventListener("scroll", () => {
    if (parallaxEnabled) {
        const speed = 0.15;
        document.body.style.backgroundPositionY = `-${window.scrollY * speed}px`;
    }

    const header = document.querySelector("header");
    if (header) {
        const scrollY = window.scrollY;
        header.style.backdropFilter = `blur(${Math.min(14 + scrollY / 40, 30)}px)`;
        header.style.opacity = `${Math.max(0.85, 1 - scrollY / 800)}`;
    }

    if (animationsEnabled) {
        const buttons = document.querySelectorAll("button");
        const speed = Math.abs(window.scrollY - lastScroll);
        buttons.forEach(btn => {
            btn.style.transform = `scale(${1 + speed / 2000})`;
        });
        lastScroll = window.scrollY;
    }
});

/* ----------------------------------------------------------
   5. Glow dynamique sur les boutons
---------------------------------------------------------- */

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (!glowEnabled) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.boxShadow = `
            0 6px 18px rgba(0,0,0,0.25),
            0 0 18px rgba(0, 102, 255, 0.45),
            ${x / 10}px ${y / 10}px 22px rgba(0, 102, 255, 0.35)
        `;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
    });
});

/* ----------------------------------------------------------
   6. Micro‑animations selon mouvement
---------------------------------------------------------- */

let lastX = 0;
let lastY = 0;

window.addEventListener("mousemove", (e) => {
    if (!animationsEnabled) return;

    const dx = Math.abs(e.clientX - lastX);
    const dy = Math.abs(e.clientY - lastY);
    const movement = dx + dy;

    document.body.style.transform = `translateY(${movement / 80}px)`;

    lastX = e.clientX;
    lastY = e.clientY;
});

/* ----------------------------------------------------------
   7. Command Center — contrôles
---------------------------------------------------------- */

const toggleThemeBtn = document.getElementById("toggle-theme");
const togglePerfBtn = document.getElementById("toggle-perf");
const toggleAnimBtn = document.getElementById("toggle-animations");
const toggleParallaxBtn = document.getElementById("toggle-parallax");
const toggleGlowBtn = document.getElementById("toggle-glow");
const perfStatus = document.getElementById("perf-status");

if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        log("Thème basculé.");
    });
}

if (togglePerfBtn) {
    togglePerfBtn.addEventListener("click", () => {
        perfMode = !perfMode;
        if (perfStatus) perfStatus.textContent = perfMode ? "ON" : "OFF";

        if (perfMode) {
            document.body.style.transition = "none";
            document.querySelectorAll("button").forEach(btn => btn.style.transition = "none");
            animationsEnabled = false;
            parallaxEnabled = false;
            glowEnabled = false;
            log("Mode performance ACTIVÉ.");
        } else {
            document.body.style.transition = "opacity 1.2s ease, transform 0.2s ease";
            document.querySelectorAll("button").forEach(btn => btn.style.transition = "all 0.3s ease");
            animationsEnabled = true;
            parallaxEnabled = true;
            glowEnabled = true;
            log("Mode performance DÉSACTIVÉ.");
        }
    });
}

if (toggleAnimBtn) {
    toggleAnimBtn.addEventListener("click", () => {
        animationsEnabled = !animationsEnabled;
        log(`Animations ${animationsEnabled ? "activées" : "désactivées"}.`);
    });
}

if (toggleParallaxBtn) {
    toggleParallaxBtn.addEventListener("click", () => {
        parallaxEnabled = !parallaxEnabled;
        log(`Parallax ${parallaxEnabled ? "activé" : "désactivé"}.`);
    });
}

if (toggleGlowBtn) {
    toggleGlowBtn.addEventListener("click", () => {
        glowEnabled = !glowEnabled;
        log(`Glow dynamique ${glowEnabled ? "activé" : "désactivé"}.`);
    });
}

/* ----------------------------------------------------------
   8. Raccourcis clavier
---------------------------------------------------------- */

window.addEventListener("keydown", (e) => {
    if (e.key === "p") {
        togglePerfBtn && togglePerfBtn.click();
    }
    if (e.key === "t") {
        toggleThemeBtn && toggleThemeBtn.click();
    }
});
