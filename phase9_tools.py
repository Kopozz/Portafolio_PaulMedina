import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Voice Navigation HTML Icon
voice_html = """
    <!-- Voice Navigation -->
    <button id="voice-btn" onclick="toggleVoice()" onmouseenter="sound.play('hover')" class="fixed bottom-6 left-6 w-12 h-12 rounded-none bg-[#07070a]/90 border border-white/10 z-[50] flex items-center justify-center text-gray-400 hover:text-[#FF4400] hover:border-[#FF4400] transition-colors shadow-[0_5px_20px_rgba(0,0,0,0.5)] hidden md:flex group">
        <i class="fas fa-microphone text-sm"></i>
        <span class="absolute left-full ml-4 whitespace-nowrap bg-[#07070a] px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Voice Nav</span>
    </button>
"""

if "id=\"voice-btn\"" not in text:
    text = text.replace("    <div class=\"relative z-10\">", "    <div class=\"relative z-10\">\n" + voice_html)


# 2. Playground Section Overhaul
old_blog_content = '''<div class="flex justify-between items-end mb-16">
                <div>
                    <span data-i18n="sec_blog_subtitle" class="text-neon-pink text-xs font-bold tracking-[0.3em] uppercase mb-4 block">LABORATORIO & IDEAS</span>
                    <h2 data-i18n="sec_blog_title" class="text-5xl font-black text-white italic">BLOG / LAB</h2>
                </div>
                <div data-i18n="sec_blog_soon" class="hidden md:block glass px-6 py-3 rounded-2xl border-white/5 opacity-50 italic text-sm">Próximamente...</div>
            </div>
            
            <div id="blog-container" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Dynamic Content -->
            </div>'''
new_blog_content = '''<div class="flex justify-between items-end mb-16">
                <div>
                    <span data-i18n="sec_blog_subtitle" class="text-[#FF4400] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">LABORATORIO & IDEAS</span>
                    <h2 data-i18n="sec_blog_title" class="text-4xl sm:text-5xl md:text-6xl font-black brutalist-title tracking-tight mb-8">PLAYGROUND</h2>
                </div>
                <div data-i18n="sec_blog_soon" class="hidden md:block bg-dark-900 border border-white/5 px-6 py-3 rounded-none opacity-50 text-[10px] font-mono tracking-widest uppercase">System Active</div>
            </div>
            
            <div id="blog-container" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Dynamic Content injected via JS -->
            </div>'''
text = text.replace(old_blog_content, new_blog_content)


# 3. JS Voice Logic and Playground Data
js_inject2 = """
        // 4. Voice Navigation Logic
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition;
        let isListening = false;

        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'es-ES'; // Default, could sync with preferred_lang

            recognition.onstart = () => {
                isListening = true;
                const btn = document.getElementById('voice-btn');
                btn.classList.add('border-red-500', 'text-red-500');
                btn.innerHTML = '<i class="fas fa-microphone-slash text-sm"></i><span class="absolute left-full ml-4 whitespace-nowrap bg-red-900/50 text-red-100 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-red-500/50">Listening...</span>';
                sound.play('hover');
            };

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                console.log("Voice Command:", command);
                
                if (command.includes('proyectos') || command.includes('trabajo') || command.includes('projects')) {
                    document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('habilidades') || command.includes('skills')) {
                    document.getElementById('habilidades').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('contacto') || command.includes('contact')) {
                    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('inicio') || command.includes('arriba') || command.includes('home')) {
                    document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('consola') || command.includes('terminal')) {
                    toggleConsole();
                }
            };

            recognition.onend = () => {
                isListening = false;
                const btn = document.getElementById('voice-btn');
                btn.classList.remove('border-red-500', 'text-red-500');
                btn.innerHTML = '<i class="fas fa-microphone text-sm"></i><span class="absolute left-full ml-4 whitespace-nowrap bg-[#07070a] px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Voice Nav</span>';
            };
        } else {
            // Hide button if not supported
            setTimeout(() => {
                const btn = document.getElementById('voice-btn');
                if(btn) btn.style.display = 'none';
            }, 100);
        }

        window.toggleVoice = () => {
            if (!recognition) return;
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        };

        // 5. Override Blog render with Playground logic
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
        };
"""

if "4. Voice Navigation Logic" not in text:
    text = text.replace("// ---------------------------------------", js_inject2 + "\n        // ---------------------------------------")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Phase 9 Voice & Playground Patched.")
