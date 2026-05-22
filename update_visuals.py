import os

html_path = r"c:\Users\User\OneDrive\Desktop\PORTAFOLIO PAUL MEDINA\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update .bento-grid CSS to prevent clipping
text = text.replace(
    ".bento-grid {\n            display: grid;\n            grid-template-columns: repeat(1, 1fr);\n            gap: 1.5rem;\n            grid-auto-flow: dense;\n        }",
    ".bento-grid {\n            display: grid;\n            grid-template-columns: repeat(1, 1fr);\n            grid-auto-rows: minMax(250px, auto);\n            gap: 1.5rem;\n            grid-auto-flow: dense;\n        }"
)

# 2. Append Custom Project Hover Animations before </style>
custom_css = """
        /* Custom Project Hover Animations */
        .hover-pulse:hover i { animation: pulse 1s infinite alternate; }
        .hover-pulse:hover { border-color: rgba(0, 255, 136, 0.4); box-shadow: 0 0 30px rgba(0, 255, 136, 0.15); }

        .hover-glint { position: relative; }
        .hover-glint::before { 
            content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent, rgba(255,255,255,0.08) 50%, transparent); 
            transform: translateX(-100%) skewX(-15deg); transition: transform 0.6s ease; z-index: 10; pointer-events: none;
        }
        .hover-glint:hover::before { transform: translateX(100%) skewX(-15deg); }
        .hover-glint:hover { box-shadow: 0 0 30px rgba(0, 212, 255, 0.15); }

        .hover-flow { position: relative; }
        .hover-flow::after {
            content: ''; position: absolute; inset: 0; 
            background: repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(168, 85, 247, 0.08) 10px, rgba(168, 85, 247, 0.08) 11px);
            background-size: 100% 200%; clear: both; animation: flowData 4s linear infinite; opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .hover-flow:hover::after { opacity: 1; }
        .hover-flow:hover { box-shadow: 0 0 30px rgba(168, 85, 247, 0.15); }
        @keyframes flowData { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }

        .hover-glitch:hover i {
            animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
            color: rgba(236, 72, 153, 1) !important;
            text-shadow: 2px 0 blue, -2px 0 red;
        }
        .hover-glitch:hover { box-shadow: 0 0 30px rgba(236, 72, 153, 0.15); }
        @keyframes glitch {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
        }

        .hover-tilt { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hover-tilt:hover { transform: perspective(1000px) rotateX(3deg) rotateY(-3deg) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0, 212, 255, 0.15); z-index: 20; }
"""
text = text.replace("</style>", custom_css + "\n    </style>")

# 3. Update projectData properties
text = text.replace('icon: "fa-prescription-bottle-medical",', 'iconClass: "fas fa-prescription-bottle-medical",\n                hoverClass: "hover-pulse",')
text = text.replace('icon: "fa-building",', 'iconClass: "fas fa-building",\n                hoverClass: "hover-glint",')
text = text.replace('icon: "fa-boxes-stacked",', 'iconClass: "fas fa-boxes-stacked",\n                hoverClass: "hover-flow",')
text = text.replace('icon: "fa-microchip",', 'iconClass: "fas fa-microchip",\n                hoverClass: "hover-glitch",')
text = text.replace('icon: "fa-android",', 'iconClass: "fab fa-android",\n                hoverClass: "hover-tilt",')

# 4. Update renderProjects HTML mapping
text = text.replace('<i class="fas ${data.icon} ${data.size', '<i class="${data.iconClass} ${data.size')
text = text.replace('class="glass-card group rounded-3xl overflow-hidden cursor-pointer bento-${data.size}"', 'class="glass-card group rounded-3xl overflow-hidden cursor-pointer bento-${data.size} ${data.hoverClass}"')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Updates applied successfully.")
