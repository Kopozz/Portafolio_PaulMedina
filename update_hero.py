import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Inject the new cinematic keyframes at the end of the style block
css_injection = """
        /* Cinematic Valve-style text reveal */
        .cinematic-reveal {
            opacity: 0;
            filter: blur(20px) brightness(0);
            transform: scale(1.02) translateY(10px);
            animation: cinematicReveal 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        @keyframes cinematicReveal {
            0% { opacity: 0; filter: blur(20px) brightness(0); transform: scale(1.02) translateY(10px); letter-spacing: -2px; }
            35% { opacity: 0.8; filter: blur(2px) brightness(1.5); transform: scale(1) translateY(0); letter-spacing: 0px; text-shadow: 0 0 40px rgba(255,255,255,0.8); }
            40% { opacity: 0.3; filter: blur(1px) brightness(0.8); } /* Flicker down */
            45% { opacity: 1; filter: blur(3px) brightness(2); } /* Strike */
            100% { opacity: 1; filter: blur(0) brightness(1); transform: scale(1) translateY(0); letter-spacing: 0px; text-shadow: 0 0 15px rgba(255,255,255,0.1); }
        }
        
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
        }
"""
text = text.replace("</style>", css_injection + "\n    </style>")

# 2. Update background layer (from `<div class="fixed inset-0 overflow-hidden pointer-events-none z-0">` up to `</div>`)
old_bg = """    <!-- Animated Global Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-neon-blue/10 blur-[120px] mix-blend-screen animate-blob"></div>
        <div class="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-neon-purple/10 blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-neon-pink/10 blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
    </div>"""

new_bg = """    <!-- Valve-Inspired Tech Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#07070a]">
        <!-- Tech Grid -->
        <div class="absolute inset-0 opacity-[0.06]" 
             style="background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px);">
        </div>
        <!-- Deep Vignette -->
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070a_85%)]"></div>
        <!-- Subtle Scanline Overlay -->
        <div class="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style="background: repeating-linear-gradient(transparent 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%); background-size: 100% 4px;"></div>
    </div>"""

text = text.replace(old_bg, new_bg)

# 3. Update Hero elements 
old_hero = """            <div class="mb-12 animate-reveal flex flex-col sm:flex-row justify-center items-center gap-4" style="animation-delay: 0.2s">
                <span data-i18n="hero_badge" class="glass px-6 py-2 rounded-full text-[10px] font-bold text-gray-400 border-white/5 uppercase tracking-[0.4em]">
                    Ingeniero de Sistemas
                </span>
                <span id="daily-status-badge" class="glass px-4 py-2 rounded-full text-[10px] font-bold text-white border-white/5 uppercase tracking-widest flex items-center gap-2 transition-all duration-300 hover:border-neon-green cursor-default">
                    <span class="w-2 h-2 rounded-full bg-neon-green animate-pulse" id="status-dot"></span>
                    <span data-i18n="status_available" id="status-text">Disponible para Proyectos</span>
                </span>
            </div>
            
            <h1 class="text-7xl sm:text-8xl md:text-9xl font-black mb-12 tracking-tighter leading-none animate-reveal" style="animation-delay: 0.4s">
                <span class="text-white">PAUL JARED</span><br>
                <span class="gradient-text italic">MEDINA ARANDA</span>
            </h1>
            
            <p data-i18n="hero_desc" class="text-lg sm:text-xl text-gray-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed animate-reveal" style="animation-delay: 0.6s">
                Diseñando el futuro a través de <span class="text-white">IA</span>, <span class="text-white">Automatización</span> y arquitectura de sistemas de alto rendimiento.
            </p>"""

new_hero = """            <div class="mb-14 flex flex-col sm:flex-row justify-center items-center gap-4" style="opacity: 0; animation: fadeInUp 1s ease-out 1.2s forwards;">
                <span data-i18n="hero_badge" class="px-6 py-2 text-[10px] font-bold text-gray-400 border border-white/10 bg-dark-900/50 uppercase tracking-[0.4em] shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                    Ingeniero de Sistemas
                </span>
                <span id="daily-status-badge" class="px-4 py-2 border border-white/5 bg-dark-900/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] uppercase flex items-center gap-3 transition-all duration-300 hover:border-[#FF4400]/50 cursor-default group/status backdrop-blur-md" style="box-shadow: inset 0 0 15px rgba(255,68,0,0.05);">
                    <span class="text-[#FF4400] text-[9px] font-mono tracking-[0.3em] font-bold pr-3 border-r border-white/10 group-hover/status:text-white transition-colors">SYS</span>
                    <span class="w-1.5 h-1.5 bg-[#FF4400] animate-pulse rounded-sm" id="status-dot" style="box-shadow: 0 0 8px #FF4400;"></span>
                    <span data-i18n="status_available" id="status-text" class="text-[9px] font-bold text-gray-400 tracking-[0.2em]">Online</span>
                </span>
            </div>
            
            <h1 class="font-black mb-10 tracking-tighter leading-none relative group pointer-events-auto">
                <span class="block text-7xl sm:text-8xl md:text-[9.5rem] text-white cinematic-reveal" style="text-shadow: 0 0 30px rgba(255,255,255,0.05); letter-spacing: -2px;">
                    PAUL JARED
                </span>
                <div class="flex items-center justify-center mt-3 cinematic-reveal" style="animation-delay: 0.15s;">
                    <!-- Industrial Orange Accent -->
                    <div class="w-1.5 h-12 sm:h-16 bg-[#FF4400] mr-4 sm:mr-6 animate-pulse" style="animation-duration: 4s; box-shadow: 0 0 15px rgba(255,68,0,0.4);"></div>
                    <span class="text-4xl sm:text-6xl md:text-[5rem] text-gray-400 tracking-normal font-bold" style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">
                        MEDINA ARANDA
                    </span>
                </div>
            </h1>
            
            <p data-i18n="hero_desc" class="text-xs sm:text-sm text-gray-500 mb-16 max-w-2xl mx-auto font-mono tracking-widest leading-loose cinematic-reveal uppercase" style="animation-delay: 0.4s;">
                Diseñando el futuro a través de <span class="text-gray-300 font-bold">IA</span>, <span class="text-gray-300 font-bold">Automatización</span> <br class="hidden sm:block">y arquitectura de sistemas de alto rendimiento.
            </p>"""

text = text.replace(old_hero, new_hero)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Tech Valve updates applied.")
