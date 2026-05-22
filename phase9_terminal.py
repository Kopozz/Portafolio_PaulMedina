import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. HTML Console Injection
console_html = """
    <!-- Developer Console -->
    <div id="dev-console" class="fixed top-0 left-0 right-0 h-[45vh] bg-[#07070a]/95 backdrop-blur-xl border-b-2 border-[#FF4400] shadow-[0_10px_50px_rgba(255,68,0,0.1)] z-[10000] transform -translate-y-full transition-transform duration-300 font-mono flex flex-col">
        <div class="h-6 bg-[#FF4400] flex items-center justify-between px-4 text-black text-[10px] font-bold tracking-widest uppercase cursor-default">
            <span>TERMINAL ROOT@PAUL_JARED</span>
            <button onclick="toggleConsole()" class="hover:text-white transition-colors">X</button>
        </div>
        
        <div id="console-output" class="flex-1 overflow-y-auto p-4 text-[11px] text-gray-300 leading-relaxed font-mono flex flex-col gap-2">
            <div><span class="text-cyan-500">Antigravity OS v9.0.1</span> (x86_64)</div>
            <div>Welcome to the Developer Console. Type <span class="text-yellow-500">'help'</span> for a list of commands.</div>
            <div class="h-2"></div>
        </div>
        
        <div class="h-10 border-t border-white/10 flex items-center px-4 bg-black/50">
            <span class="text-[#FF4400] mr-2 text-xs font-bold">$&gt;</span>
            <input type="text" id="console-input" class="w-full bg-transparent outline-none text-white text-xs font-mono" placeholder="Type command..." autocomplete="off" spellcheck="false">
        </div>
    </div>
"""

# Inject after body open
if "id=\"dev-console\"" not in text:
    text = text.replace("<div class=\"noise z-50\"></div>", "<div class=\"noise z-50\"></div>\n" + console_html)


# 2. JS Console Logic
js_injections = """
        // 3. Developer Console Logic
        const devConsole = document.getElementById('dev-console');
        const consoleInput = document.getElementById('console-input');
        const consoleOutput = document.getElementById('console-output');
        let consoleOpen = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                toggleConsole();
            }
        });

        function toggleConsole() {
            consoleOpen = !consoleOpen;
            if (consoleOpen) {
                devConsole.style.transform = 'translateY(0)';
                setTimeout(() => consoleInput.focus(), 300);
                sound.play('click');
            } else {
                devConsole.style.transform = 'translateY(-100%)';
                consoleInput.blur();
                sound.play('click');
            }
        }

        consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = consoleInput.value.trim().toLowerCase();
                if (!cmd) return;
                
                // Echo command
                printConsole(`<span class="text-[#FF4400]">$&gt;</span> ${cmd}`);
                consoleInput.value = '';
                
                processCommand(cmd);
            }
        });

        function printConsole(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            consoleOutput.appendChild(div);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }

        function processCommand(cmd) {
            const args = cmd.split(' ');
            const mainCmd = args[0];

            switch(mainCmd) {
                case 'help':
                    printConsole(`
                        <span class="text-yellow-500">Available commands:</span><br>
                        <span class="text-cyan-400">help</span>      - Show this message<br>
                        <span class="text-cyan-400">clear</span>     - Clear console output<br>
                        <span class="text-cyan-400">whoami</span>    - Display creator identifier<br>
                        <span class="text-cyan-400">status</span>    - Display system metrics<br>
                        <span class="text-cyan-400">projects</span>  - Launch projects module<br>
                        <span class="text-cyan-400">contact</span>   - Initialize commlink<br>
                        <span class="text-cyan-400">exit</span>      - Close console
                    `);
                    break;
                case 'clear':
                    consoleOutput.innerHTML = '<div><span class="text-cyan-500">Antigravity OS v9.0.1</span> (x86_64)</div><div>Console cleared.</div><div class="h-2"></div>';
                    break;
                case 'whoami':
                    printConsole('<span class="text-green-500">root@PAUL_JARED_MEDINA_ARANDA ~ Software Engineer</span>');
                    break;
                case 'status':
                    printConsole(`
                        CPU: [||||||||||] 100% (High Performance)<br>
                        MEM: 64TB / 64TB Allocated<br>
                        SYS: OVERRIDE_MODE_READY<br>
                        <span class="text-green-500">ALL SYSTEMS NOMINAL.</span>
                    `);
                    break;
                case 'projects':
                    printConsole('Navigating to projects sector...');
                    setTimeout(() => {
                        window.location.href = '#proyectos';
                        toggleConsole();
                    }, 500);
                    break;
                case 'contact':
                    printConsole('Initializing secure email payload...');
                    setTimeout(() => {
                        copyEmail();
                        printConsole('<span class="text-green-500">Payload copied to clipboard.</span>');
                    }, 500);
                    break;
                case 'exit':
                    toggleConsole();
                    break;
                default:
                    printConsole(`<span class="text-red-500">ERR: command not found: ${mainCmd}</span>`);
            }
            sound.play('click');
        }
"""

if "3. Developer Console Logic" not in text:
    text = text.replace("// ---------------------------------------", js_injections + "\n        // ---------------------------------------")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Phase 9 Terminal Patched.")
