import os

target = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"
insert1 = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\insert1.html"
insert2 = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\insert2.html"

with open(target, 'r', encoding='utf-8') as f:
    text = f.read()

with open(insert1, 'r', encoding='utf-8') as f:
    part1 = f.read()

with open(insert2, 'r', encoding='utf-8') as f:
    part2 = f.read()

marker = "        <!-- Background Effects -->"
marker_end = "            // Draw connecting lines with standard SVG lines"

if marker in text and marker_end in text:
    before = text.split(marker)[0] + marker + "\n"
    after = "\n" + marker_end + text.split(marker_end)[1]
    
    new_text = before + part1 + "\n" + part2 + after
    
    with open(target, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print("Restore successful!")
else:
    print("Markers not found!")
