import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

changes = 0

# =========================================================
# FIX 1: Skills Section Header (gradient-text -> brutalist)
# =========================================================
old_skills_header = '<h2 data-i18n="sec_skills_title" class="text-5xl sm:text-6xl font-black text-white">HABILIDADES & <span class="gradient-text">TOOLS</span></h2>'
new_skills_header = '<h2 data-i18n="sec_skills_title" class="text-4xl sm:text-5xl md:text-6xl font-black brutalist-title tracking-tight">HABILIDADES & TOOLS</h2>'
if old_skills_header in text:
    text = text.replace(old_skills_header, new_skills_header)
    changes += 1
    print("[OK] Skills header -> brutalist")
else:
    print("[SKIP] Skills header already patched or not found")

# =========================================================
# FIX 2: Experience Section Header (italic -> brutalist)
# =========================================================
old_exp_header = '<h2 data-i18n="sec_experience_title" class="text-5xl font-black text-white italic">EXPERIENCIA</h2>'
new_exp_header = '<h2 data-i18n="sec_experience_title" class="text-4xl sm:text-5xl md:text-6xl font-black brutalist-title tracking-tight">EXPERIENCIA</h2>'
if old_exp_header in text:
    text = text.replace(old_exp_header, new_exp_header)
    changes += 1
    print("[OK] Experience header -> brutalist")
else:
    print("[SKIP] Experience header already patched or not found")

# =========================================================
# FIX 3: Replace the ORIGINAL renderBlog function definition
#         with the Playground version DIRECTLY in place.
#         This fixes the hoisting issue.
# =========================================================
old_renderBlog = """        function renderBlog(lang) {
            const container = document.getElementById('blog-container');
            if (!container) return;
            
            // Skeleton Loader State
            container.innerHTML = Array(3).fill(`
                <div class="glass-card rounded-[32px] overflow-hidden">
                    <div class="h-48 bg-dark-800 animate-pulse relative overflow-hidden">
                        <div class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                    </div>
                    <div class="p-8">
                        <div class="w-24 h-4 rounded-full bg-dark-700 animate-pulse mb-4"></div>
                        <div class="w-full h-6 rounded-full bg-dark-800 animate-pulse mb-2"></div>
                        <div class="w-2/3 h-6 rounded-full bg-dark-800 animate-pulse mb-4"></div>
                        <div class="w-full h-2 rounded-full bg-dark-700 animate-pulse"></div>
                    </div>
                </div>
            `).join('');

            // Simulated CMS Fetch
            setTimeout(() => {
                container.innerHTML = blogData.map(post => `
                    <div class="glass-card group rounded-[32px] overflow-hidden hover:border-${post.color}/30 transition-all duration-500 cursor-pointer p-1">
                        <div class="rounded-[28px] overflow-hidden bg-dark-900 border border-white/5 h-full relative">
                            <div class="absolute top-0 right-0 w-32 h-32 bg-${post.color}/20 rounded-full blur-[50px] group-hover:bg-${post.color}/40 transition-colors"></div>
                            
                            <div class="h-48 relative overflow-hidden flex items-center justify-center border-b border-white/5 bg-dark-950">
                                <i class="fas fa-flask text-5xl text-${post.color}/20 group-hover:scale-110 transition-transform duration-700"></i>
                            </div>
                            
                            <div class="p-8 relative z-10">
                                <span class="text-[10px] font-bold text-${post.color} tracking-widest uppercase mb-3 block">${post.category[lang] || post.category.es}</span>
                                <h3 class="text-xl font-bold text-white mb-6 group-hover:text-${post.color} transition-colors line-clamp-2">${post.title[lang] || post.title.es}</h3>
                                
                                <div class="flex items-center gap-3">
                                    <div class="flex-1 h-1.5 bg-dark-950 rounded-full overflow-hidden border border-white/5">
                                        <div class="h-full bg-${post.color} rounded-full relative overflow-hidden" style="width: ${post.progress}%">
                                            <div class="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                    <span class="text-xs font-bold text-gray-500 font-mono">${post.progress}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }, 1500);
        }"""

new_renderBlog = """        function renderBlog(lang) {
            const container = document.getElementById('blog-container');
            if (!container) return;
            
            const playgroundItems = [
                { 
                    title: { es: "Particle Engine Config", en: "Particle Engine Config", pt: "Config. Motor Partículas", fr: "Config. Moteur Particules", de: "Partikel Engine Konfig", ko: "파티클 엔진 설정" },
                    category: { es: "WebGL / Canvas", en: "WebGL / Canvas", pt: "WebGL / Canvas", fr: "WebGL / Canvas", de: "WebGL / Canvas", ko: "WebGL / Canvas" },
                    color: "cyan-500",
                    progress: 100,
                    icon: "fa-project-diagram"
                },
                { 
                    title: { es: "A* Pathfinding Visual", en: "A* Pathfinding Visual", pt: "Visualizador A*", fr: "Visualiseur A*", de: "A* Pfadsuche", ko: "A* 경로탐색" },
                    category: { es: "Algoritmos", en: "Algorithms", pt: "Algoritmos", fr: "Algorithmes", de: "Algorithmen", ko: "알고리즘" },
                    color: "red-500",
                    progress: 85,
                    icon: "fa-route"
                },
                { 
                    title: { es: "Neural Net Playground", en: "Neural Net Playground", pt: "Playground Rede Neural", fr: "Terrain de Jeu Réseau", de: "Neuronales Netz", ko: "신경망 플레이그라운드" },
                    category: { es: "Machine Learning", en: "Machine Learning", pt: "Machine Learning", fr: "Machine Learning", de: "Machine Learning", ko: "머신러닝" },
                    color: "zinc-500",
                    progress: 60,
                    icon: "fa-network-wired"
                }
            ];
            
            container.innerHTML = playgroundItems.map(post => `
                <div class="bg-[#07070a]/80 group overflow-hidden hover:border-${post.color}/50 transition-all duration-500 cursor-pointer border border-white/5">
                    <div class="h-full relative block">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-${post.color}/5 blur-[50px] group-hover:bg-${post.color}/20 transition-colors"></div>
                        
                        <div class="h-40 relative overflow-hidden flex items-center justify-center border-b border-white/5 bg-[#07070a]">
                            <i class="fas ${post.icon} text-5xl text-gray-800 group-hover:text-${post.color} transition-colors duration-700"></i>
                        </div>
                        
                        <div class="p-6 relative z-10 bg-[#07070a]">
                            <span class="text-[9px] font-bold text-${post.color} tracking-widest uppercase mb-2 block font-mono">${post.category[lang] || post.category.es}</span>
                            <h3 class="text-lg font-bold text-white mb-6 group-hover:text-${post.color} transition-colors">${post.title[lang] || post.title.es}</h3>
                            
                            <div class="flex items-center gap-3">
                                <div class="flex-1 h-1 bg-dark-950 overflow-hidden border border-white/5">
                                    <div class="h-full bg-${post.color} relative overflow-hidden" style="width: ${post.progress}%"></div>
                                </div>
                                <span class="text-[10px] font-bold text-gray-500 font-mono">${post.progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }"""

if old_renderBlog in text:
    text = text.replace(old_renderBlog, new_renderBlog)
    changes += 1
    print("[OK] renderBlog -> Playground replacement (in-place)")
else:
    print("[SKIP] renderBlog not found (check formatting)")

# =========================================================
# FIX 4: Remove the dead Playground override at the bottom
#         of the JS since we already replaced the function.
# =========================================================
old_override = """        // 5. Override Blog render with Playground logic
        const playgroundData = [
            { 
                title: { es: "Particle Engine Config", en: "Particle Engine Config" },
                category: { es: "WebGL / Canvas", en: "WebGL / Canvas" },
                color: "cyan-500",
                progress: 100,
                icon: "fa-project-diagram"
            },
            { 
                title: { es: "A* Pathfinding Vis", en: "A* Pathfinding Vis" },
                category: { es: "Algorithms", en: "Algorithms" },
                color: "red-500",
                progress: 85,
                icon: "fa-route"
            },
            { 
                title: { es: "Neural Net Playground", en: "Neural Net Playground" },
                category: { es: "Machine Learning", en: "Machine Learning" },
                color: "zinc-500",
                progress: 60,
                icon: "fa-network-wired"
            }
        ];

        // Override the old renderBlog function dynamically
        window.renderBlog = function(lang) {
            const container = document.getElementById('blog-container');
            if (!container) return;
            
            container.innerHTML = playgroundData.map(post => `
                <div class="bg-[#07070a]/50 group rounded-none overflow-hidden hover:border-${post.color}/50 transition-all duration-500 cursor-pointer p-1 border border-white/5">
                    <div class="h-full relative block">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-${post.color}/5 rounded-none blur-[50px] group-hover:bg-${post.color}/20 transition-colors"></div>
                        
                        <div class="h-40 relative overflow-hidden flex items-center justify-center border-b border-white/5 bg-[#07070a]">
                            <i class="fas ${post.icon} text-5xl text-gray-800 group-hover:text-${post.color} transition-colors duration-700"></i>
                        </div>
                        
                        <div class="p-6 relative z-10 bg-[#07070a]">
                            <span class="text-[9px] font-bold text-${post.color} tracking-widest uppercase mb-2 block font-mono">${post.category[lang] || post.category.es}</span>
                            <h3 class="text-lg font-bold text-white mb-6 group-hover:text-${post.color} transition-colors drop-shadow-md">${post.title[lang] || post.title.es}</h3>
                            
                            <div class="flex items-center gap-3">
                                <div class="flex-1 h-1 bg-dark-950 overflow-hidden border border-white/5">
                                    <div class="h-full bg-${post.color} relative overflow-hidden" style="width: ${post.progress}%"></div>
                                </div>
                                <span class="text-[10px] font-bold text-gray-500 font-mono">${post.progress}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        };"""

if old_override in text:
    text = text.replace(old_override, "        // Playground now integrated directly into renderBlog")
    changes += 1
    print("[OK] Removed dead Playground override")
else:
    print("[SKIP] Dead override not found")

# =========================================================
# FIX 5: Experience timeline cards -> industrial style
# =========================================================
old_exp_card = '<div class="glass p-8 rounded-3xl mb-12 hover:border-white/20 transition-all border border-white/5">'
new_exp_card = '<div class="bg-[#07070a]/80 p-8 mb-12 border border-white/5 hover:border-[#FF4400]/30 transition-all backdrop-blur-md">'
if old_exp_card in text:
    text = text.replace(old_exp_card, new_exp_card)
    changes += 1
    print("[OK] Experience card -> industrial")
else:
    print("[SKIP] Experience card already patched")

# =========================================================
# FIX 6: Methodologies cards -> industrial style
# =========================================================
old_meth_card = '<div class="glass p-6 rounded-2xl group hover:border-white/20 transition-all">'
new_meth_card = '<div class="bg-[#07070a]/80 p-6 border border-white/5 group hover:border-[#FF4400]/30 transition-all">'
if old_meth_card in text:
    text = text.replace(old_meth_card, new_meth_card)
    changes += 1
    print("[OK] Methodology cards -> industrial")
else:
    print("[SKIP] Methodology cards already patched")

# =========================================================
# FIX 7: Tech Graph container -> industrial style
# =========================================================
old_tech_container = '<div class="glass rounded-3xl p-8 mb-20 border-white/5 relative overflow-hidden group">'
new_tech_container = '<div class="bg-[#07070a]/80 p-8 mb-20 border border-white/5 relative overflow-hidden group">'
if old_tech_container in text:
    text = text.replace(old_tech_container, new_tech_container)
    changes += 1
    print("[OK] Tech graph container -> industrial")
else:
    print("[SKIP] Tech graph already patched")

old_tech_glow = '<div class="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/5 pointer-events-none"></div>'
new_tech_glow = '<div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#FF4400]/3 pointer-events-none"></div>'
if old_tech_glow in text:
    text = text.replace(old_tech_glow, new_tech_glow)
    changes += 1
    print("[OK] Tech graph glow -> industrial")

# =========================================================
# FIX 8: Tech Graph nodes — glass to industrial
# =========================================================
old_node = '<div class="glass flex items-center justify-center rounded-full border border-white/5 group-hover:bg-white/5 transition-all duration-500"'
new_node = '<div class="bg-[#07070a] flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#FF4400]/40 transition-all duration-500"'
if old_node in text:
    text = text.replace(old_node, new_node)
    changes += 1
    print("[OK] Tech graph nodes -> industrial")

# =========================================================
# FIX 9: Enhance Easter egg with SpeechSynthesis voice
# =========================================================
old_god_mode = """        function activateGodMode() {
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
        }"""

new_god_mode = """        function activateGodMode() {
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

            // JARVIS-style voice announcement using SpeechSynthesis
            if ('speechSynthesis' in window) {
                const synth = window.speechSynthesis;
                
                // First message - immediate
                const msg1 = new SpeechSynthesisUtterance('Security override detected.');
                msg1.rate = 0.9;
                msg1.pitch = 0.6;
                msg1.volume = 0.8;
                msg1.lang = 'en-US';
                
                // Try to find a robotic voice
                const voices = synth.getVoices();
                const preferredVoice = voices.find(v => v.name.includes('Google UK English Male')) 
                    || voices.find(v => v.name.includes('Daniel'))
                    || voices.find(v => v.name.includes('Male'))
                    || voices.find(v => v.lang === 'en-US');
                if (preferredVoice) {
                    msg1.voice = preferredVoice;
                }
                
                synth.speak(msg1);
                
                // Second message - after delay
                setTimeout(() => {
                    const msg2 = new SpeechSynthesisUtterance('Welcome back, Creator. All systems are now under your direct control. Protocol Kopoz is active.');
                    msg2.rate = 0.85;
                    msg2.pitch = 0.5;
                    msg2.volume = 0.9;
                    msg2.lang = 'en-US';
                    if (preferredVoice) msg2.voice = preferredVoice;
                    synth.speak(msg2);
                }, 2000);
            }
            
            console.log("%c SECURITY OVERRIDE ACCEPTED. WELCOME, CREATOR. ", "background: red; color: white; font-size: 20px; font-weight: bold;");
            console.log("%c Protocol KOPOZ is now active. All systems under direct control. ", "background: #222; color: #FF0000; font-size: 14px;");
        }"""

if old_god_mode in text:
    text = text.replace(old_god_mode, new_god_mode)
    changes += 1
    print("[OK] Easter egg -> SpeechSynthesis JARVIS voice")
else:
    print("[SKIP] Easter egg not found") 

# =========================================================
# FIX 10: Contact section subtitle -> industrial
# =========================================================
old_contact_sub = '<span data-i18n="sec_contact_subtitle" class="text-neon-pink text-xs font-bold tracking-[0.3em] uppercase mb-4 block">'
new_contact_sub = '<span data-i18n="sec_contact_subtitle" class="text-[#FF4400] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">'
if old_contact_sub in text:
    text = text.replace(old_contact_sub, new_contact_sub)
    changes += 1
    print("[OK] Contact subtitle -> industrial orange")

# =========================================================
# FIX 11: Footer KOPOZ gradient text -> industrial
# =========================================================
old_footer_logo = '<span class="gradient-text">KOPOZ</span>'
new_footer_logo = '<span class="text-[#FF4400] font-black">KOPOZ</span>'
if old_footer_logo in text:
    text = text.replace(old_footer_logo, new_footer_logo)
    changes += 1
    print("[OK] Footer KOPOZ -> industrial orange")

# =========================================================
# FIX 12: Footer heart -> industrial
# =========================================================
old_heart = '<i class="fas fa-heart text-neon-pink ml-1"></i>'
new_heart = '<i class="fas fa-heart text-[#FF4400] ml-1"></i>'
if old_heart in text:
    text = text.replace(old_heart, new_heart)
    changes += 1
    print("[OK] Footer heart -> industrial orange")

# =========================================================
# FIX 13: Voice Nav - add explicit permission request
# =========================================================
old_voice_toggle = """        window.toggleVoice = () => {
            if (!recognition) return;
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        };"""

new_voice_toggle = """        window.toggleVoice = async () => {
            if (!recognition) {
                alert('Tu navegador no soporta reconocimiento de voz.');
                return;
            }
            if (isListening) {
                recognition.stop();
            } else {
                try {
                    // Request mic permission explicitly
                    await navigator.mediaDevices.getUserMedia({ audio: true });
                    recognition.start();
                } catch(err) {
                    console.error('Microphone permission denied:', err);
                    alert('Se requiere permiso de micrófono para la navegación por voz.');
                }
            }
        };"""

if old_voice_toggle in text:
    text = text.replace(old_voice_toggle, new_voice_toggle)
    changes += 1
    print("[OK] Voice nav -> explicit permission request")
else:
    print("[SKIP] Voice toggle not found")


with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print(f"\n=== TOTAL CHANGES: {changes} ===")
