import os
import re

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Redefine Global .glass and .glass-card CSS in the <style> block
text = text.replace(
    ".glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }",
    ".glass { background: rgba(7, 7, 10, 0.8); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.05); }"
)

text = text.replace(
    ".glass-card { background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 8px 32px 0 rgba(0,0,0,0.3); }",
    ".glass-card { background: rgba(7, 7, 10, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 10px 40px 0 rgba(0,0,0,0.8); }"
)

# 2. Add .brutalist-title CSS class
css_brutalist = """
        /* Brutalist Title */
        .brutalist-title {
            color: #ffffff;
            font-weight: 900;
            position: relative;
            padding-left: 1.5rem;
            text-transform: uppercase;
        }
        .brutalist-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.1em;
            bottom: 0.1em;
            width: 0.4rem;
            background-color: #FF4400;
            box-shadow: 0 0 15px rgba(255, 68, 0, 0.4);
        }
"""
text = text.replace("/* Theme Colors */", css_brutalist + "\n        /* Theme Colors */")

# 3. Apply Brutalist Headers (Removing gradient-text and inserting the class)
# We will regex replace the h2 section titles
text = re.sub(
    r'<h2 data-i18n="([^"]+)" class="([^"]+)">\s*([\w\sÁÉÍÓÚáéíóúÑñ]+)\s*<span class="gradient-text italic">([^<]+)</span>\s*</h2>',
    r'<h2 data-i18n="\1" class="text-4xl sm:text-5xl md:text-6xl font-black brutalist-title tracking-tight mb-8">\3 \4</h2>',
    text
)

# Handling headers that might not have the gradient text specifically inside a span but match the pattern
text = text.replace('class="text-neon-blue text-xs font-bold tracking-[0.3em] uppercase mb-4 block"', 'class="text-gray-500 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 block border-b border-white/10 pb-2 inline-block"')
text = text.replace('text-neon-green text-xs font-bold', 'text-gray-500 text-[10px] font-mono')
text = text.replace('text-neon-purple text-xs font-bold', 'text-gray-500 text-[10px] font-mono')

# 4. Refactor projectData, methodologiesData, etc., colors
# Map: neon-green -> orange-500, neon-blue -> cyan-500, neon-purple -> zinc-500, neon-pink -> red-500
text = text.replace('"neon-green"', '"orange-500"')
text = text.replace('"neon-blue"', '"cyan-500"')
text = text.replace('"neon-purple"', '"zinc-500"')
text = text.replace('"neon-pink"', '"red-500"')

# Update specific hex colors in Tailwind arbitrary classes if any
text = text.replace('text-neon-blue', 'text-cyan-500')
text = text.replace('text-neon-green', 'text-orange-500')
text = text.replace('text-neon-purple', 'text-zinc-500')
text = text.replace('bg-neon-blue', 'bg-cyan-500')
text = text.replace('bg-neon-green', 'bg-orange-500')
text = text.replace('bg-neon-purple', 'bg-zinc-500')
text = text.replace('border-neon-blue', 'border-cyan-500')
text = text.replace('border-neon-green', 'border-orange-500')

# 5. Overhaul Chatbot UI
# Button
text = text.replace(
    'id="chatbot-toggle" class="fixed bottom-6 right-6 w-14 h-14 rounded-full glass bg-neon-blue/20 border-neon-blue/50 flex items-center justify-center text-white hover:bg-neon-blue/40 transition-all z-50 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-110"',
    'id="chatbot-toggle" class="fixed bottom-6 right-6 w-14 h-14 rounded-none bg-[#07070a] border-2 border-[#FF4400]/50 flex items-center justify-center text-[#FF4400] hover:bg-[#FF4400]/10 transition-all z-50 shadow-[0_0_20px_rgba(255,68,0,0.2)] hover:scale-105"'
)
# Window
text = text.replace(
    'id="chatbot-window" class="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[450px] glass-card rounded-3xl border border-white/10 hidden flex-col overflow-hidden z-[150] shadow-2xl transition-all duration-300 origin-bottom-right opacity-0 scale-95"',
    'id="chatbot-window" class="fixed bottom-24 right-6 w-[340px] sm:w-[380px] h-[450px] bg-[#07070a] rounded-none border border-white/10 hidden flex-col overflow-hidden z-[150] shadow-[0_0_40px_rgba(0,0,0,0.9)] transition-all duration-300 origin-bottom-right opacity-0 scale-95 font-mono relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(transparent_0%,rgba(0,0,0,0.2)_50%,transparent_100%)] before:bg-[length:100%_4px] before:pointer-events-none"'
)
# Header
text = text.replace(
    '<div class="bg-dark-900/80 p-4 border-b border-white/5 flex justify-between items-center shrink-0">',
    '<div class="bg-dark-950 p-4 border-b border-[#FF4400]/30 flex justify-between items-center shrink-0 relative z-10">'
)
text = text.replace(
    '<div class="w-10 h-10 rounded-full bg-neon-blue/10 flex items-center justify-center border border-neon-blue/30">',
    '<div class="w-10 h-10 rounded-none bg-dark-900 flex items-center justify-center border border-[#FF4400]/30">'
)
text = text.replace('text-neon-blue', 'text-[#FF4400]')  # General fallback
text = text.replace(
    '<span class="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-950 animate-pulse"></span>',
    '<span class="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-500 rounded-none border border-dark-950 animate-pulse"></span>'
)
# Chat Messages styling in JS string literals
text = text.replace(
    '''<div class="self-end max-w-[85%] bg-neon-blue/20 text-white p-3 rounded-2xl rounded-tr-none border border-neon-blue/20 text-xs shadow-lg animate-fade-in-up mb-2">''',
    '''<div class="self-end max-w-[85%] bg-[#1a1a24] text-gray-300 p-3 rounded-none border border-white/10 text-[11px] shadow-lg animate-fade-in-up mb-2">'''
)
text = text.replace(
    '''<div class="w-8 h-8 rounded-full bg-neon-blue/20 flex shrink-0 items-center justify-center border border-white/5 mt-1">''',
    '''<div class="w-8 h-8 rounded-none bg-dark-900 flex shrink-0 items-center justify-center border border-[#FF4400]/30 mt-1">'''
)
text = text.replace(
    '''<div class="bg-dark-800 p-4 rounded-2xl rounded-tl-none border border-white/5 text-gray-300 font-mono text-xs leading-relaxed shadow-lg">${data[key].a}</div>''',
    '''<div class="bg-transparent p-4 rounded-none border-l-2 border-cyan-500 text-cyan-400 font-mono text-[11px] leading-relaxed shadow-none">${data[key].a}</div>'''
)

# Render Options styling in JS
text = text.replace(
    '''<button onclick="handleOptionClick('${key}')" class="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-neon-blue/20 border border-white/5 hover:border-neon-blue/40 transition-all text-xs text-gray-300 hover:text-white group">''',
    '''<button onclick="handleOptionClick('${key}')" class="w-full text-left p-2 rounded-none bg-transparent hover:bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-[11px] text-gray-400 hover:text-cyan-400 group uppercase tracking-widest">'''
)
text = text.replace(
    '''<i class="fas fa-chevron-right text-[10px] text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"></i>''',
    '''<i class="fas fa-chevron-right text-[10px] text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1"></i>'''
)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Phase 8 portfolio aesthetic expansion completed.")
