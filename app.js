/* ----------------------------------------------------------
   WebApp — app.js v13.0 Command Center / CyberOps HUD
---------------------------------------------------------- */

const state = {
    perfMode: false,
    animations: true,
    parallax: true,
    glow: true,
    cyberOps: false,
    stealthMode: false,
    lastScroll: 0,
    lastFrameTime: performance.now(),
    fps: 0,
    lastMouse: { x: 0, y: 0 },
    hudVisible: true
};

/* ----------------------------------------------------------
   Cache DOM
---------------------------------------------------------- */
const dom = {
    body: document.body,
    logConsole: document.getElementById("log-console"),
    header: document.querySelector("header"),
    buttons: () => document.querySelectorAll("button"),
    fpsDisplay: document.getElementById("fps-display"),
    scrollSpeedDisplay: document.getElementById("scroll-speed-display"),
    hud: document.getElementById("hud-overlay"),
    hudStatus: document.getElementById("hud-status"),
    cyberStatus: document.getElementById("cyber-status"),
    stealthStatus: document.getElementById("stealth-status"),
    perfStatus: document.getElementById("perf-status"),
    sidePanel: document.getElementById("command-panel")
};

/* ----------------------------------------------------------
   Log sécurisé
---------------------------------------------------------- */
function log(message) {
    if (!dom.logConsole) return;
    try {
        const line = document.createElement("div");
        const time = new Date().toLocaleTimeString();
        line.textContent = `[${time}] ${message}`;
        dom.logConsole.appendChild(line);
        dom.logConsole.scrollTop = dom.logConsole.scrollHeight;
    } catch (e) {
        console.warn("Log error:", e);
    }
}

/* ----------------------------------------------------------
   DOMContentLoaded + intro
---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    dom.body.style.opacity = "0";
    dom.body.style.transition = "opacity 1.2s ease";

    requestAnimationFrame(() => {
        dom.body.style.opacity = "1";
        orchestratedIntro();
        initCommandCenter();
        initHUD();
        updateStats();
        log("WebApp initialisée (v13.0 Command Center / CyberOps HUD).");
    });
});

function orchestratedIntro() {
    if (dom.header) {
        dom.header.style.transform = "translateY(-40px)";
        dom.header.style.opacity = "0";

        setTimeout(() => {
            dom.header.style.transition = "all 1s ease";
            dom.header.style.transform = "translateY(0)";
            dom.header.style.opacity = "1";
        }, 200);
    }

    dom.buttons().forEach((btn, i) => {
        btn.style.transform = "translateY(40px)";
        btn.style.opacity = "0";

        setTimeout(() => {
            btn.style.transition = "all 0.9s ease";
            btn.style.transform = "translateY(0)";
            btn.style.opacity = "1";
        }, 300 + i * 100);
    });

    if (dom.sidePanel) {
        dom.sidePanel.style.transform = "translateX(40px)";
        dom.sidePanel.style.opacity = "0";

        setTimeout(() => {
            dom.sidePanel.style.transition = "all 0.8s ease";
            dom.sidePanel.style.transform = "translateX(0)";
            dom.sidePanel.style.opacity = "1";
        }, 450);
    }
}

/* ----------------------------------------------------------
   HUD tactique
---------------------------------------------------------- */
function initHUD() {
    if (!dom.hud) return;
    dom.hud.style.opacity = "0";
    dom.hud.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
        dom.hud.style.opacity = "1";
        if (dom.hudStatus) dom.hudStatus.textContent = "ONLINE";
    }, 500);
}

function updateHUD() {
    if (!dom.hud) return;

    if (dom.cyberStatus) dom.cyberStatus.textContent = state.cyberOps ? "ACTIVE" : "IDLE";
    if (dom.stealthStatus) dom.stealthStatus.textContent = state.stealthMode ? "ENGAGED" : "OFF";
    if (dom.perfStatus) dom.perfStatus.textContent = state.perfMode ? "ON" : "OFF";
}

/* ----------------------------------------------------------
   Stats (FPS + vitesse scroll)
---------------------------------------------------------- */
function updateStats() {
    try {
        const now = performance.now();
        const delta = now - state.lastFrameTime;
        state.fps = Math.round(1000 / (delta || 1));
        state.lastFrameTime = now;

        if (dom.fpsDisplay) dom.fpsDisplay.textContent = state.fps;

        if (dom.scrollSpeedDisplay) {
            const speed = Math.abs(window.scrollY - state.lastScroll);
            dom.scrollSpeedDisplay.textContent = speed.toFixed(0);
            state.lastScroll = window.scrollY;
        }
    } catch (e) {
        console.warn("Stats error:", e);
    }

    updateHUD();
    requestAnimationFrame(updateStats);
}

/* ----------------------------------------------------------
   Effets de scroll (parallax + header dynamique)
---------------------------------------------------------- */
window.addEventListener("scroll", () => {
    try {
        const scrollY = window.scrollY;

        if (state.parallax && !state.stealthMode) {
            dom.body.style.backgroundPositionY = `-${scrollY * 0.15}px`;
        }

        if (dom.header) {
            dom.header.style.backdropFilter = `blur(${Math.min(14 + scrollY / 40, 30)}px)`;
            dom.header.style.opacity = `${Math.max(0.85, 1 - scrollY / 800)}`;
        }

        if (state.animations && !state.stealthMode) {
            const speed = Math.abs(scrollY - state.lastScroll);
            dom.buttons().forEach(btn => {
                btn.style.transform = `scale(${1 + speed / 2200})`;
            });
        }

        state.lastScroll = scrollY;
    } catch (e) {
        console.warn("Scroll error:", e);
    }
});

/* ----------------------------------------------------------
   Glow dynamique
---------------------------------------------------------- */
dom.buttons().forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        if (!state.glow || state.stealthMode) return;

        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.boxShadow = `
            0 6px 18px rgba(0,0,0,0.25),
            0 0 18px rgba(0, 255, 160, 0.45),
            ${x / 10}px ${y / 10}px 22px rgba(0, 255, 160, 0.35)
        `;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
    });
});

/* ----------------------------------------------------------
   Micro-animations souris
---------------------------------------------------------- */
window.addEventListener("mousemove", (e) => {
    if (!state.animations || state.stealthMode) return;

    const dx = Math.abs(e.clientX - state.lastMouse.x);
    const dy = Math.abs(e.clientY - state.lastMouse.y);
    const movement = dx + dy;

    dom.body.style.transform = `translateY(${movement / 80}px)`;

    state.lastMouse.x = e.clientX;
    state.lastMouse.y = e.clientY;
});

/* ----------------------------------------------------------
   Command Center (toggles + CyberOps + Stealth)
---------------------------------------------------------- */
function initCommandCenter() {
    const toggleTheme = document.getElementById("toggle-theme");
    const togglePerf = document.getElementById("toggle-perf");
    const toggleAnim = document.getElementById("toggle-animations");
    const toggleParallax = document.getElementById("toggle-parallax");
    const toggleGlow = document.getElementById("toggle-glow");
    const toggleHUD = document.getElementById("toggle-hud");
    const toggleCyber = document.getElementById("toggle-cyberops");
    const toggleStealth = document.getElementById("toggle-stealth");

    if (toggleTheme) {
        toggleTheme.addEventListener("click", () => {
            dom.body.classList.toggle("dark-mode");
            log("Thème basculé.");
        });
    }

    if (togglePerf) {
        togglePerf.addEventListener("click", () => {
            state.perfMode = !state.perfMode;
            if (dom.perfStatus) dom.perfStatus.textContent = state.perfMode ? "ON" : "OFF";

            if (state.perfMode) {
                disableTransitions();
                disableEffects();
                log("Mode performance ACTIVÉ.");
            } else {
                enableTransitions();
                enableEffects();
                log("Mode performance DÉSACTIVÉ.");
            }
        });
    }

    if (toggleAnim) {
        toggleAnim.addEventListener("click", () => {
            state.animations = !state.animations;
            log(`Animations ${state.animations ? "activées" : "désactivées"}.`);
        });
    }

    if (toggleParallax) {
        toggleParallax.addEventListener("click", () => {
            state.parallax = !state.parallax;
            log(`Parallax ${state.parallax ? "activé" : "désactivé"}.`);
        });
    }

    if (toggleGlow) {
        toggleGlow.addEventListener("click", () => {
            state.glow = !state.glow;
            log(`Glow dynamique ${state.glow ? "activé" : "désactivé"}.`);
        });
    }

    if (toggleHUD && dom.hud) {
        toggleHUD.addEventListener("click", () => {
            state.hudVisible = !state.hudVisible;
            dom.hud.style.opacity = state.hudVisible ? "1" : "0";
            if (dom.hudStatus) dom.hudStatus.textContent = state.hudVisible ? "ONLINE" : "OFFLINE";
            log(`HUD ${state.hudVisible ? "affiché" : "masqué"}.`);
        });
    }

    if (toggleCyber) {
        toggleCyber.addEventListener("click", () => {
            state.cyberOps = !state.cyberOps;
            dom.body.classList.toggle("cyber-mode", state.cyberOps);
            log(`CyberOps ${state.cyberOps ? "ACTIVÉ" : "DÉSACTIVÉ"}.`);
            updateHUD();
        });
    }

    if (toggleStealth) {
        toggleStealth.addEventListener("click", () => {
            state.stealthMode = !state.stealthMode;
            dom.body.classList.toggle("stealth-mode", state.stealthMode);

            if (state.stealthMode) {
                state.animations = false;
                state.parallax = false;
                state.glow = false;
                log("Mode furtif ENGAGÉ (animations minimales, parallax OFF, glow OFF).");
            } else {
                state.animations = true;
                state.parallax = true;
                state.glow = true;
                log("Mode furtif DÉSACTIVÉ.");
            }

            updateHUD();
        });
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "p" && togglePerf) togglePerf.click();
        if (e.key === "t" && toggleTheme) toggleTheme.click();
        if (e.key === "h" && toggleHUD) toggleHUD.click();
        if (e.key === "c" && toggleCyber) toggleCyber.click();
        if (e.key === "s" && toggleStealth) toggleStealth.click();
    });
}

/* ----------------------------------------------------------
   Utilitaires
---------------------------------------------------------- */
function disableTransitions() {
    dom.body.style.transition = "none";
    dom.buttons().forEach(btn => btn.style.transition = "none";
}

function enableTransitions() {
    dom.body.style.transition = "opacity 1.2s ease, transform 0.2s ease";
    dom.buttons().forEach(btn => btn.style.transition = "all 0.3s ease");
}

function disableEffects() {
    state.animations = false;
    state.parallax = false;
    state.glow = false;
}

function enableEffects() {
    if (!state.stealthMode) {
        state.animations = true;
        state.parallax = true;
        state.glow = true;
    }
}
