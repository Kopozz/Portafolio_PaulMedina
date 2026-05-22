import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Navbar PJ Logo
old_nav_logo = '''<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-green p-0.5">
                        <div class="w-full h-full rounded-xl bg-dark-950 flex items-center justify-center font-black text-white text-xs">PJ</div>
                    </div>'''
new_nav_logo = '''<div class="w-10 h-10 rounded-none bg-[#07070a] border border-[#FF4400] flex items-center justify-center relative overflow-hidden">
                        <div class="absolute inset-0 bg-[#FF4400]/10"></div>
                        <div class="relative z-10 w-full h-full flex items-center justify-center font-black text-[#FF4400] text-xs">PJ</div>
                    </div>'''
text = text.replace(old_nav_logo, new_nav_logo)

# 2. Navbar Contact Button
old_nav_contact = '''<a href="#contacto" onmouseenter="sound.play('hover')" onclick="sound.play('click')" data-i18n="nav_contact" class="px-8 py-2.5 ml-4 text-sm font-bold bg-white text-dark-950 rounded-full hover:bg-cyan-500 hover:text-dark-950 transition-all active:scale-95 shadow-lg shadow-white/5">'''
new_nav_contact = '''<a href="#contacto" onmouseenter="sound.play('hover')" onclick="sound.play('click')" data-i18n="nav_contact" class="px-8 py-2.5 ml-4 text-[11px] uppercase tracking-widest font-bold bg-transparent text-white border border-[#FF4400] hover:bg-[#FF4400] hover:text-white transition-all active:scale-95 shadow-none rounded-none flex items-center justify-center">'''
text = text.replace(old_nav_contact, new_nav_contact)

# 3. Sound Toggle
old_sound = '''<button onclick="toggleSound()" onmouseenter="sound.play('hover')" class="w-10 h-10 flex items-center justify-center rounded-xl glass hover:text-cyan-500 transition-all active:scale-95 mr-4 ml-2">'''
new_sound = '''<button onclick="toggleSound()" onmouseenter="sound.play('hover')" class="w-10 h-10 flex items-center justify-center rounded-none bg-[#07070a] border border-white/10 hover:border-cyan-500 hover:text-cyan-500 transition-all active:scale-95 mr-4 ml-2">'''
text = text.replace(old_sound, new_sound)

# 4. Language Switcher (Button & Dropdown)
old_lang_btn = '''<button class="flex items-center gap-2 glass px-4 py-2 rounded-full border-white/5 hover:bg-white/5 transition-all">'''
new_lang_btn = '''<button class="flex items-center gap-2 bg-[#07070a] px-4 py-2 border border-white/10 hover:border-cyan-500 rounded-none transition-all">'''
text = text.replace(old_lang_btn, new_lang_btn)

old_lang_dropdown = '''<div class="absolute right-0 mt-2 w-40 glass rounded-2xl border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] py-2 overflow-hidden backdrop-blur-3xl">'''
new_lang_dropdown = '''<div class="absolute right-0 mt-2 w-40 bg-[#07070a] rounded-none border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60] py-2 overflow-hidden">'''
text = text.replace(old_lang_dropdown, new_lang_dropdown)

# 5. About Container
old_about_container = '''<div class="glass-card rounded-[40px] p-12 md:p-20 relative overflow-hidden border-white/5">'''
new_about_container = '''<div class="bg-[#07070a]/90 rounded-none p-12 md:p-20 relative overflow-hidden border border-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.8)]">'''
text = text.replace(old_about_container, new_about_container)

old_about_blur = '''<div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>'''
new_about_blur = '''<div class="absolute top-0 right-0 w-64 h-64 bg-[#FF4400]/5 rounded-none blur-[100px]"></div>'''
text = text.replace(old_about_blur, new_about_blur)

# 6. PM Logo
old_pm_logo = '''<div class="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-green p-0.5">
                            <div class="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center">
                                <span class="text-2xl font-black gradient-text">PM</span>
                            </div>
                        </div>'''
new_pm_logo = '''<div class="w-20 h-20 mb-8 rounded-none bg-[#07070a] border-l-2 border-[#FF4400] overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(255,68,0,0.1)]">
                            <div class="relative z-10 w-full h-full bg-transparent flex items-center justify-center">
                                <span class="text-3xl font-black text-[#FF4400] tracking-tighter">PM</span>
                            </div>
                        </div>'''
text = text.replace(old_pm_logo, new_pm_logo)

# 7. About Title
old_about_title = '''<h2 data-i18n="sec_about_title" class="text-4xl font-black text-white mb-6">SOBRE MÍ</h2>'''
new_about_title = '''<h2 data-i18n="sec_about_title" class="text-4xl sm:text-5xl md:text-6xl font-black brutalist-title tracking-tight mb-8">SOBRE MÍ</h2>'''
text = text.replace(old_about_title, new_about_title)

# 8. About Stats
old_about_stats = '''<div class="glass p-6 rounded-3xl border-white/5 text-center group hover:scale-105 transition-transform duration-300">
                        <div class="text-3xl font-black text-white mb-1 group-hover:text-cyan-500 transition-colors">${s.value}</div>
                        <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">${s.label[lang] || s.label.es}</div>
                    </div>'''
new_about_stats = '''<div class="bg-[#07070a]/80 p-6 rounded-none border border-white/5 text-center group hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-b from-[#FF4400]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div class="text-3xl font-black text-white mb-1 group-hover:text-[#FF4400] transition-colors relative z-10">${s.value}</div>
                        <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">${s.label[lang] || s.label.es}</div>
                    </div>'''
text = text.replace(old_about_stats, new_about_stats)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Navbar and About patched")
