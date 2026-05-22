import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. PARALLAX CSS & GOD MODE CSS
css_injections = """
        /* Phase 9 Additions */
        .parallax-target {
            transition: transform 0.1s ease-out;
            will-change: transform;
        }

        body.god-mode {
            /* Override colors to red */
            --tw-bg-opacity: 1;
        }
        
        body.god-mode .bg-\\[\\#FF4400\\] { background-color: #FF0000 !important; }
        body.god-mode .text-\\[\\#FF4400\\] { color: #FF0000 !important; }
        body.god-mode .border-\\[\\#FF4400\\] { border-color: #FF0000 !important; }
        body.god-mode .bg-cyan-500 { background-color: #FF0000 !important; }
        body.god-mode .text-cyan-500 { color: #FF0000 !important; }
        body.god-mode .border-cyan-500 { border-color: #FF0000 !important; }

        body.god-mode::before {
            content: '';
            position: fixed;
            inset: 0;
            background: radial-gradient(circle, transparent 20%, rgba(255,0,0,0.1) 100%);
            border: 4px solid #FF0000;
            pointer-events: none;
            z-index: 9999;
            animation: glitch 0.2s infinite;
        }

        #god-mode-alert {
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #FF0000;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1rem;
            text-align: center;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            text-shadow: 0 0 20px #FF0000;
        }

        body.god-mode #god-mode-alert {
            animation: flashAlert 2s forwards;
        }

        @keyframes flashAlert {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
            50% { opacity: 0; }
            55% { opacity: 1; }
            60% { opacity: 0; }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
"""

if "/* Phase 9 Additions */" not in text:
    text = text.replace("    </style>", css_injections + "\n    </style>")


# 2. Add Parallax class to Hero Text and About PM Logo
text = text.replace(
    '''<span class="block text-7xl sm:text-8xl md:text-[9.5rem] text-white cinematic-reveal"''',
    '''<span id="hero-title-main" class="block text-7xl sm:text-8xl md:text-[9.5rem] text-white cinematic-reveal parallax-target"'''
)
text = text.replace(
    '''<span class="text-4xl sm:text-6xl md:text-[5rem] text-gray-400 tracking-normal font-bold"''',
    '''<span id="hero-title-sub" class="text-4xl sm:text-6xl md:text-[5rem] text-gray-400 tracking-normal font-bold parallax-target"'''
)

text = text.replace(
    '''<div class="relative z-10 w-full h-full bg-transparent flex items-center justify-center">
                                <span class="text-3xl font-black text-[#FF4400] tracking-tighter">PM</span>
                            </div>''',
    '''<div id="about-logo-pm" class="relative z-10 w-full h-full bg-transparent flex items-center justify-center parallax-target">
                                <span class="text-3xl font-black text-[#FF4400] tracking-tighter">PM</span>
                            </div>'''
)

# 3. Add God Mode Alert to Body
if "id=\"god-mode-alert\"" not in text:
    text = text.replace('''<div class="noise z-50"></div>''', '''<div class="noise z-50"></div>
    <div id="god-mode-alert">SECURITY OVERRIDE</div>''')


# 4. Javascript logic for Parallax and Easter Egg
js_injections = """
        // --- PHASE 9: ADVANCED INTERACTIVITY ---
        
        // 1. Mouse Parallax
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            const heroMain = document.getElementById('hero-title-main');
            const heroSub = document.getElementById('hero-title-sub');
            const aboutLogo = document.getElementById('about-logo-pm');

            if(heroMain) heroMain.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            if(heroSub) heroSub.style.transform = `perspective(1000px) rotateY(${xAxis * 1.5}deg) rotateX(${yAxis * 1.5}deg)`;
            if(aboutLogo) aboutLogo.style.transform = `perspective(500px) rotateY(${-xAxis * 2}deg) rotateX(${-yAxis * 2}deg)`;
        });

        // 2. Easter Egg (kopoz)
        const easterEggCode = ['k', 'o', 'p', 'o', 'z'];
        let easterEggIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            // Ignore if typing in terminal or input
            if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key.toLowerCase() === easterEggCode[easterEggIndex]) {
                easterEggIndex++;
                if (easterEggIndex === easterEggCode.length) {
                    activateGodMode();
                    easterEggIndex = 0;
                }
            } else {
                easterEggIndex = 0;
            }
        });

        function activateGodMode() {
            if(document.body.classList.contains('god-mode')) return;
            document.body.classList.add('god-mode');
            
            // Alarm Sound
            if (!sound.muted && sound.ctx) {
                if (sound.ctx.state === 'suspended') sound.ctx.resume();
                const osc = sound.ctx.createOscillator();
                const osc2 = sound.ctx.createOscillator();
                const gain = sound.ctx.createGain();
                
                osc.type = 'sawtooth';
                osc2.type = 'square';
                osc.frequency.setValueAtTime(300, sound.ctx.currentTime);
                osc2.frequency.setValueAtTime(305, sound.ctx.currentTime);
                
                // Siren modulation
                osc.frequency.linearRampToValueAtTime(600, sound.ctx.currentTime + 0.5);
                osc.frequency.linearRampToValueAtTime(300, sound.ctx.currentTime + 1.0);
                osc.frequency.linearRampToValueAtTime(600, sound.ctx.currentTime + 1.5);
                osc.frequency.linearRampToValueAtTime(300, sound.ctx.currentTime + 2.0);
                
                gain.gain.setValueAtTime(0.1, sound.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, sound.ctx.currentTime + 2.5);
                
                osc.connect(gain);
                osc2.connect(gain);
                gain.connect(sound.ctx.destination);
                osc.start();
                osc2.start();
                osc.stop(sound.ctx.currentTime + 2.5);
                osc2.stop(sound.ctx.currentTime + 2.5);
            }
            console.log("%c SECURITY OVERRIDE ACCEPTED. WELCOME, CREATOR. ", "background: red; color: white; font-size: 20px; font-weight: bold;");
        }
        // ---------------------------------------
"""

if "PHASE 9: ADVANCED INTERACTIVITY" not in text:
    # Inject right before the end of the script tag
    text = text.replace("    </script>", js_injections + "\n    </script>")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Phase 9 Parallax & Easter Egg Patched.")
