import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace greeting
old_greeting = '''<div class="flex gap-3 max-w-[90%] self-start animate-fade-in-up">
                            <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex shrink-0 items-center justify-center border border-white/5 mt-1"><i class="fas fa-robot text-cyan-500 text-xs"></i></div>
                            <div class="bg-dark-800 p-4 rounded-2xl rounded-tl-none border border-white/5 text-gray-300 font-mono text-xs leading-relaxed shadow-lg">${data.greeting}</div>
                        </div>'''

new_greeting = '''<div class="flex gap-3 max-w-[90%] self-start animate-fade-in-up">
                            <div class="w-8 h-8 rounded-none bg-[#07070a] flex shrink-0 items-center justify-center border border-[#FF4400]/30 mt-1"><i class="fas fa-terminal text-[#FF4400] text-[10px]"></i></div>
                            <div class="bg-transparent p-3 rounded-none border-l-2 border-cyan-500 text-cyan-400 font-mono text-[11px] leading-relaxed">${data.greeting}</div>
                        </div>'''

text = text.replace(old_greeting, new_greeting)

# Replace options
old_options = '''<button onclick="handleChatOption('${key}')" class="w-full text-left p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all text-gray-300 text-xs flex justify-between items-center group">
                    <span>${data[key].q}</span>
                    <i class="fas fa-arrow-right text-[10px] text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300"></i>
                </button>'''

new_options = '''<button onclick="handleChatOption('${key}')" class="w-full text-left p-2 rounded-none bg-transparent hover:bg-[#07070a]/50 border border-white/10 hover:border-cyan-500/50 transition-all text-gray-400 hover:text-cyan-400 text-[10px] uppercase tracking-widest flex justify-between items-center group">
                    <span>${data[key].q}</span>
                    <i class="fas fa-chevron-right text-[10px] text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300"></i>
                </button>'''

text = text.replace(old_options, new_options)

# Replace user msg
old_user = '''<div class="self-end max-w-[85%] bg-cyan-500/20 text-white p-3 rounded-2xl rounded-tr-none border border-cyan-500/20 text-xs shadow-lg animate-fade-in-up mb-2">
                    ${data[key].q}
                </div>'''

new_user = '''<div class="self-end max-w-[85%] bg-[#1a1a24] text-gray-300 p-3 rounded-none border border-white/10 text-[11px] shadow-lg animate-fade-in-up mb-2">
                    ${data[key].q}
                </div>'''

text = text.replace(old_user, new_user)

# Replace typing msg
old_type = '''<div id="${typingId}" class="flex gap-3 self-start max-w-[85%] animate-fade-in-up">
                        <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex shrink-0 items-center justify-center border border-white/5 mt-1"><i class="fas fa-ellipsis-h text-cyan-500 text-xs animate-pulse"></i></div>
                    </div>'''
new_type = '''<div id="${typingId}" class="flex gap-3 self-start max-w-[85%] animate-fade-in-up">
                        <div class="w-8 h-8 rounded-none bg-[#07070a] flex shrink-0 items-center justify-center border border-[#FF4400]/30 mt-1"><i class="fas fa-terminal text-[#FF4400] text-[10px] animate-pulse"></i></div>
                    </div>'''

text = text.replace(old_type, new_type)

# Replace final ai msg
old_final = '''<div class="flex gap-3 self-start max-w-[85%] animate-fade-in-up">
                        <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex shrink-0 items-center justify-center border border-white/5 mt-1"><i class="fas fa-robot text-cyan-500 text-xs"></i></div>
                        <div class="bg-dark-800 p-4 rounded-2xl rounded-tl-none border border-white/5 text-gray-300 font-mono text-xs leading-relaxed shadow-lg">${data[key].a}</div>
                    </div>'''

new_final = '''<div class="flex gap-3 self-start max-w-[85%] animate-fade-in-up">
                        <div class="w-8 h-8 rounded-none bg-[#07070a] flex shrink-0 items-center justify-center border border-[#FF4400]/30 mt-1"><i class="fas fa-terminal text-[#FF4400] text-[10px]"></i></div>
                        <div class="bg-transparent p-3 rounded-none border-l-2 border-cyan-500 text-cyan-400 font-mono text-[11px] leading-relaxed">${data[key].a}</div>
                    </div>'''

text = text.replace(old_final, new_final)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Chatbot patched")
